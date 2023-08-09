<?php

namespace App\Controller\CMS;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ServicesController extends AbstractController
{
    #[Route('/les-services', name: 'app_services')]
    public function index(): Response
    {
        return $this->render('cms/services/index.html.twig', [
            'controller_name' => 'ServicesController',
        ]);
    }
}
