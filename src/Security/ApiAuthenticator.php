<?php

namespace App\Security;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class ApiAuthenticator extends AbstractAuthenticator
{
    use TargetPathTrait;

    public function __construct(
        private HttpClientInterface $client,
        private ParameterBagInterface $param,
        private UrlGeneratorInterface $urlGenerator,
        private RequestStack $request
    ) {
    }

    public function supports(Request $request): ?bool
    {
        return $request->isMethod('POST')
            && $request->request->has('auth_email')
            && $request->request->has('auth_password')
            && $request->request->has('auth_action');
    }

    public function authenticate(Request $request): Passport
    {
        $email = $this->request->getCurrentRequest()->request->get('auth_email', '');
        $action = $this->request->getCurrentRequest()->request->get('auth_action', '');

        $this->request->getCurrentRequest()->getSession()->set(Security::LAST_USERNAME, $email);

        if ('register' === $action) {
            $passport = new SelfValidatingPassport(
                new UserBadge($email, function ($userIdentifier) {

                    $password = $this->request->getCurrentRequest()->request->get('auth_password', '');

                    $response = $this->client->request('POST', $this->param->get('admin_url') . '/api/auth/register', [
                        'verify_peer' => false,
                        'verify_host' => false,
                        'headers' => [
                            'X-AUTH-TOKEN' => $this->param->get('x_auth_token'),
                            'X-AUTH-IDENTIFIER' => $this->param->get('x_auth_identifier'),
                        ],
                        'json' => [
                            'email' => $userIdentifier,
                            'plainPassword' => $password,
                        ],
                    ]);

                    $status = $response->getStatusCode();

                    if (201 !== $status) {
                        return false;
                    }

                    $user = new User();
                    $user->setToken($userIdentifier);
                    $user->setJson($response->toArray());
                    return $user;
                }),
            );

            return $passport;
        }

        $passport = new SelfValidatingPassport(
            new UserBadge($email, function ($userIdentifier) {

                $password = $this->request->getCurrentRequest()->request->get('auth_password', '');

                $response = $this->client->request('POST', $this->param->get('admin_url') . '/api/auth/login_check', [
                    // 'verify_peer' => false,
                    // 'verify_host' => false,
                    'headers' => [
                        'X-AUTH-TOKEN' => $this->param->get('x_auth_token'),
                        'X-AUTH-IDENTIFIER' => $this->param->get('x_auth_identifier'),
                    ],
                    'json' => [
                        'email' => $userIdentifier,
                        'plainPassword' => $password,
                    ],
                ]);

                $status = $response->getStatusCode();

                if (200 !== $status) {
                    return false;
                }

                $user = new User();
                $user->setToken($userIdentifier);
                $user->setJson($response->toArray());
                return $user;
            }),
        );

        return $passport;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        if ($targetPath = $this->getTargetPath($request->getSession(), $firewallName)) {
            return new RedirectResponse($targetPath);
        }

        return new RedirectResponse($this->urlGenerator->generate('app_profil'));
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        if ($request->hasSession()) {
            $request->getSession()->set(Security::AUTHENTICATION_ERROR, $exception);
        }

        $redirect = $request->request->get('auth_action') === 'register' ? 'app_register' : 'app_login';

        return new RedirectResponse($this->urlGenerator->generate($redirect));
    }
}
