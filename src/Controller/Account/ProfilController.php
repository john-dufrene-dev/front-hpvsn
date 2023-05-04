<?php

namespace App\Controller\Account;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProfilController extends AbstractController
{
    #[Route('/profil', name: 'app_profil')]
    public function profil(): Response
    {
        if (!$this->getUser()) {
            $this->redirect('app_login');
        }

        return $this->render('account/index.html.twig', []);
    }
}
