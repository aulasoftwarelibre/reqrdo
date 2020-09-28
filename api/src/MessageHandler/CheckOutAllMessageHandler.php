<?php

declare(strict_types=1);

namespace App\MessageHandler;

use App\Entity\Check;
use App\Message\CheckOutAllMessage;
use App\Repository\CheckRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

use function array_map;

final class CheckOutAllMessageHandler implements MessageHandlerInterface
{
    private CheckRepository $checkRepository;
    private EntityManagerInterface $em;

    public function __construct(CheckRepository $checkRepository, EntityManagerInterface $em)
    {
        $this->checkRepository = $checkRepository;
        $this->em              = $em;
    }

    /**
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    public function __invoke(CheckOutAllMessage $message): void
    {
        array_map(
            static fn (Check $check) => $check->close(),
            $this->checkRepository->findBy(['outAt' => null])
        );

        $this->em->flush();
    }
}
