<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

use function get_debug_type;
use function json_encode;
use function sprintf;

class UserProvider implements UserProviderInterface
{
    private EntityManagerInterface $em;
    private UserRepository $userRepository;

    public function __construct(EntityManagerInterface $em, UserRepository $userRepository)
    {
        $this->em             = $em;
        $this->userRepository = $userRepository;
    }

    /**
     * @inheritDoc
     */
    public function loadUserByUsername(string $username)
    {
        $user = $this->userRepository->findOneBy(['email' => $username]);

        if (! $user) {
            $user = new User();
            $user->setEmail($username);

            $this->em->persist($user);
            $this->em->flush();
        }

        return $user;
    }

    /**
     * @inheritDoc
     */
    public function refreshUser(UserInterface $user)
    {
        if (! $user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', get_debug_type($user)));
        }

        $refreshedUser = $this->userRepository->find($user->getId());

        if (! $refreshedUser) {
            throw new UsernameNotFoundException('User with id ' . json_encode($user->getId()) . ' not found.');
        }

        return $refreshedUser;
    }

    /**
     * @inheritDoc
     */
    public function supportsClass(string $class)
    {
        return $class === User::class;
    }
}
