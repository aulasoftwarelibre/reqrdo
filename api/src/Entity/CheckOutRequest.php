<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     routePrefix="/rooms",
 *     messenger=true,
 *     collectionOperations={
 *          "post"={"status"=204, "security"="is_granted('ROLE_USER')"}
 *     },
 *     itemOperations={},
 *     output=false
 * )
 */
final class CheckOutRequest
{
    /** @Assert\NotBlank() */
    public string $room;
}
