<?php

declare(strict_types=1);

namespace App\MessageHandler;

use App\Entity\Check;
use App\Entity\CheckInRequest;
use App\Entity\User;
use App\Exception\CheckRequestException;
use App\Repository\CheckRepository;
use App\Repository\RoomRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Throwable;

final class CheckInRequestHandler implements MessageHandlerInterface
{
    private RoomRepository $roomRepository;
    private CheckRepository $checkRepository;
    private TokenStorageInterface $tokenStorage;
    private EntityManagerInterface $em;

    public function __construct(RoomRepository $roomRepository, CheckRepository $checkRepository, TokenStorageInterface $tokenStorage, EntityManagerInterface $em)
    {
        $this->roomRepository  = $roomRepository;
        $this->checkRepository = $checkRepository;
        $this->tokenStorage    = $tokenStorage;
        $this->em              = $em;
    }

    public function __invoke(CheckInRequest $message): void
    {
        $room = $this->roomRepository->findOneBy(['slug' => $message->room]);
        if (! $room) {
            throw CheckRequestException::becauseRoomDoesNotExists($message->room);
        }

        $user = $this->tokenStorage->getToken()->getUser();
        if (! $user instanceof User) {
            throw new AccessDeniedException();
        }

        $check = $this->checkRepository->findOneBy(['room' => $room, 'person' => $user, 'outAt' => null]);
        if ($check instanceof Check) {
            throw CheckRequestException::becauseOnlyOneOpenCheckIsAllowed();
        }

        if ($room->getOccupation() >= $room->getCapacity()) {
            throw CheckRequestException::becauseRoomIsFull();
        }

        $this->em->getConnection()->beginTransaction();
        try {
            $room->addPerson($user);

            $check = Check::record($user, $room);
            $this->checkRepository->save($check);

            $this->em->flush();
            $this->em->getConnection()->commit();
        } catch (Throwable $e) {
            $this->em->getConnection()->rollBack();

            throw $e;
        }
    }
}
