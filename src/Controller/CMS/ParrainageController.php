<?php

namespace App\Controller\CMS;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ParrainageController extends AbstractController
{
    #[Route('/parrainage', name: 'app_parrainage')]
    public function index(): Response
    {
        return $this->render('cms/parrainage/index.html.twig', [
            'controller_name' => 'ParrainageController',
        ]);
    }
}
