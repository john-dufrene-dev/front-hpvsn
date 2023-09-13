<?php

namespace App\Controller\Account;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MyAdsController extends AbstractController
{
    #[Route('/mon-compte/mes-annonces', name: 'app_my_ads')]
    public function index(): Response
    {
        return $this->render('account/my_ads/index.html.twig', [
            'controller_name' => 'MyAdsController',
        ]);
    }
}
