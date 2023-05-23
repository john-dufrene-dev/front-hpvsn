<?php

namespace App\Controller\Ads;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ActualityFeedController extends AbstractController
{
    #[Route('/fil_actualite', name: 'app_actuality_feed')]
    public function index(): Response
    {
        return $this->render('ads/actuality_feed/index.html.twig', []);
    }
}
