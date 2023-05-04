<?php

namespace App\Security;

use App\Security\User;
use DateTimeImmutable;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class UserProvider implements UserProviderInterface
{
    public function __construct(
        private HttpClientInterface $client,
        private ParameterBagInterface $param,
        private UrlGeneratorInterface $urlGenerator,
    ) {
    }

    public function loadUserByIdentifier($identifier): UserInterface
    {
    }

    public function refreshUser(UserInterface $user): UserInterface
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Invalid user class "%s".', get_class($user)));
        }

        $date = new DateTimeImmutable();
        $timestamp = $date->getTimestamp();
        $refresh_token = $user->getJson()['refresh_token'];
        $expire_in = $user->getJson()['expired_at'] - $timestamp;

        if (60 > $expire_in) {

            $response = $this->client->request('POST', $this->param->get('admin_url') . '/api/auth/refresh_token', [
                // 'verify_peer' => false,
                // 'verify_host' => false,
                'headers' => [
                    'X-AUTH-TOKEN' => $this->param->get('x_auth_token'),
                    'X-AUTH-IDENTIFIER' => $this->param->get('x_auth_identifier'),
                ],
                'json' => [
                    'check_refresh_token' => $refresh_token,
                ],
            ]);

            $status = $response->getStatusCode();

            if (200 !== $status) {
                throw new UserNotFoundException();
            }

            $user->setJson($response->toArray());
            return $user;
        }

        return $user;
    }

    public function supportsClass(string $class): bool
    {
        return User::class === $class || is_subclass_of($class, User::class);
    }
}
