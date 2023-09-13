<?php

namespace App\Controller\Account;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MyRequestsController extends AbstractController
{
    #[Route('/mon-compte/mes-demandes', name: 'app_my_requests')]
    public function index(): Response
    {
        return $this->render('account/my_requests/index.html.twig', [
            'controller_name' => 'MyRequestsController',
        ]);
    }
}
