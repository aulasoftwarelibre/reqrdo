<?php

declare(strict_types=1);

namespace App\Command;

use App\Message\CheckOutAllMessage;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Messenger\MessageBusInterface;

class ClosePendingChecksCommand extends Command
{
    private MessageBusInterface $messageBus;

    /**
     * @inheritDoc
     */
    public function __construct(?string $name = null, MessageBusInterface $messageBus)
    {
        parent::__construct($name);

        $this->messageBus = $messageBus;
    }

    protected function configure(): void
    {
        $this
            ->setName('app:check:out')
            ->setDescription('Do check out automatically to all open checks');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $this->messageBus->dispatch(
            new CheckOutAllMessage()
        );

        $io->success('Check out completed.');

        return Command::SUCCESS;
    }
}
