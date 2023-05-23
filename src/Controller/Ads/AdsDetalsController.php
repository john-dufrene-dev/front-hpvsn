<?php

namespace App\Controller\Ads;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdsDetalsController extends AbstractController
{
    #[Route('/annonce', name: 'app_ads_detals')]
    public function index(): Response
    {
        return $this->render('ads/ads_detals/index.html.twig', []);
    }
}
