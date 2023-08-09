<?php

namespace App\Controller\CMS;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CommentCaMarcheController extends AbstractController
{
    #[Route('/comment-ca-marche', name: 'app_comment_ca_marche')]
    public function index(): Response
    {
        return $this->render('cms/comment_ca_marche/index.html.twig', [
            'controller_name' => 'CommentCaMarcheController',
        ]);
    }
}
