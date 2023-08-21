<?php

namespace App\Controller\CMS;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MentionsController extends AbstractController
{
    #[Route('/mentions-legales', name: 'app_mentions')]
    public function index(): Response
    {
        return $this->render('cms/mentions/index.html.twig', [
            'controller_name' => 'MentionsController',
        ]);
    }
}
