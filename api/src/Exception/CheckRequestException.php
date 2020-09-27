<?php

declare(strict_types=1);

namespace App\Exception;

use Exception;

use function sprintf;

class CheckRequestException extends Exception
{
    public static function becauseRoomDoesNotExists(string $id): self
    {
        return new self(sprintf('The room "%s" does not exists', $id));
    }

    public static function becauseOnlyOneOpenCheckIsAllowed(): self
    {
        return new self('Previous check must be closed');
    }

    public static function becauseNoOpenCheckIsFound(): self
    {
        return new self('No open check was found');
    }
}
