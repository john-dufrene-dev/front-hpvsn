<?php

namespace App\Controller\Account;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MyPlanController extends AbstractController
{
    #[Route('/mon-compte/mon-abonnement', name: 'app_my_plan')]
    public function index(): Response
    {
        return $this->render('account/my_plan/index.html.twig', [
            'controller_name' => 'MyPlanController',
        ]);
    }
}
