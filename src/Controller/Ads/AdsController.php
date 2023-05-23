<?php

namespace App\Controller\Ads;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdsController extends AbstractController
{
    #[Route('/annonces', name: 'app_ads')]
    public function index(): Response
    {
        return $this->render('ads/ads/index.html.twig', []);
    }
}
