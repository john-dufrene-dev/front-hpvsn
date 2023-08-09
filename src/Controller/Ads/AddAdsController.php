<?php

namespace App\Controller\Ads;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AddAdsController extends AbstractController
{
    #[Route('/annonces/ajouter-annonce', name: 'app_ads_add')]
    public function index(): Response
    {
        return $this->render('ads/add_ads/index.html.twig', [
            'controller_name' => 'AddAdsController',
        ]);
    }
}
