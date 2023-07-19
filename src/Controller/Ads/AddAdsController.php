<?php

namespace App\Controller\Ads;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AddAdsController extends AbstractController
{
    #[Route('/ads/add/ads', name: 'app_ads_add_ads')]
    public function index(): Response
    {
        return $this->render('ads/add_ads/index.html.twig', [
            'controller_name' => 'AddAdsController',
        ]);
    }
}
