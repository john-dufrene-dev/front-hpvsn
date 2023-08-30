<?php

namespace App\Controller\Account;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SponsorshipController extends AbstractController
{
    #[Route('/mon-compte/mon-parrainage', name: 'app_sponsorship')]
    public function index(): Response
    {
        return $this->render('account/sponsorship/index.html.twig', []);
    }
}
