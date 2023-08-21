<?php

namespace App\Controller\CMS;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ConditionsController extends AbstractController
{
    #[Route('/cgv', name: 'app_conditions')]
    public function index(): Response
    {
        return $this->render('cms/conditions/index.html.twig', [
            'controller_name' => 'ConditionsController',
        ]);
    }
}
