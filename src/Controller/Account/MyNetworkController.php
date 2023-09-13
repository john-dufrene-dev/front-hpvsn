<?php

namespace App\Controller\Account;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MyNetworkController extends AbstractController
{
    #[Route('/mon-compte/mon-reseau', name: 'app_my_network')]
    public function index(): Response
    {
        return $this->render('account/my_network/index.html.twig', [
            'controller_name' => 'MyNetworkController',
        ]);
    }
}
