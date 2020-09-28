<?php

declare(strict_types=1);

namespace App\Exception;

use Exception;

use function sprintf;

class CheckRequestException extends Exception
{
    public static function becauseRoomDoesNotExists(string $id): self
    {
        return new self(sprintf('La sala "%s" no existe', $id));
    }

    public static function becauseOnlyOneOpenCheckIsAllowed(): self
    {
        return new self('Ya hay una sesión abierta');
    }

    public static function becauseNoOpenCheckIsFound(): self
    {
        return new self('No hay una sesión abierta');
    }

    public static function becauseRoomIsFull(): self
    {
        return new self('El aula está llena');
    }
}
