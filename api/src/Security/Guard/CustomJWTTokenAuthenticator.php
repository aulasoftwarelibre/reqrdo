<?php

declare(strict_types=1);

namespace App\Security\Guard;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Guard\JWTTokenAuthenticator;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\TokenExtractorInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\User\UserProviderInterface;

use function array_key_exists;

final class CustomJWTTokenAuthenticator extends JWTTokenAuthenticator
{
    private EntityManagerInterface $em;

    /**
     * @inheritDoc
     */
    public function __construct(JWTTokenManagerInterface $jwtManager, EventDispatcherInterface $dispatcher, TokenExtractorInterface $tokenExtractor, EntityManagerInterface $em)
    {
        parent::__construct($jwtManager, $dispatcher, $tokenExtractor);

        $this->em = $em;
    }

    /**
     * @inheritDoc
     */
    protected function loadUser(UserProviderInterface $userProvider, array $payload, $identity)
    {
        try {
            $user =  parent::loadUser($userProvider, $payload, $identity);
        } catch (UsernameNotFoundException $e) {
            if (! array_key_exists('name', $payload) || ! array_key_exists('email', $payload)) {
                throw $e;
            }

            $user = new User();
            $user->setUsername($payload['name']);
            $user->setEmail($payload['email']);

            $this->em->persist($user);
            $this->em->flush();
        }

        return $user;
    }
}
