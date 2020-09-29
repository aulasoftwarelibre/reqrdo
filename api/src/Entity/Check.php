<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CheckRepository;
use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;

/**
 * @ORM\Entity(repositoryClass=CheckRepository::class)
 * @ORM\Table(name="`check`")
 *
 * @ApiResource(
 *     normalizationContext={"groups"={"check"}},
 *     collectionOperations={"get"},
 *     itemOperations={"get"},
 *     mercure=true
 * )
 */
class Check
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\Column(type="guid")
     *
     * @Groups({"check"})
     */
    private string $id;

    /**
     * @ORM\ManyToOne(targetEntity=Room::class)
     * @ORM\JoinColumn(nullable=false)
     *
     * @Groups({"check"})
     */
    private Room $room;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     * @ORM\JoinColumn(nullable=false)
     *
     * @Groups({"check"})
     */
    private User $person;

    /**
     * @ORM\Column(type="datetime")
     *
     * @Groups({"check"})
     */
    private DateTimeInterface $inAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"check"})
     */
    private ?DateTimeInterface $outAt = null;

    public function __construct()
    {
        $this->id = (string) Uuid::v6();
    }

    public static function record(User $user, Room $room): self
    {
        $check = new self();
        $check->setPerson($user);
        $check->setRoom($room);
        $check->setInAt(new DateTimeImmutable());

        return $check;
    }

    public function close(): void
    {
        $this->setOutAt(new DateTimeImmutable());
        $this->room->removePerson($this->person);
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getRoom(): ?Room
    {
        return $this->room;
    }

    public function setRoom(Room $room): self
    {
        $this->room = $room;

        return $this;
    }

    public function getPerson(): ?User
    {
        return $this->person;
    }

    public function setPerson(User $person): self
    {
        $this->person = $person;

        return $this;
    }

    public function getInAt(): ?DateTimeInterface
    {
        return $this->inAt;
    }

    public function setInAt(DateTimeInterface $inAt): self
    {
        $this->inAt = $inAt;

        return $this;
    }

    public function getOutAt(): ?DateTimeInterface
    {
        return $this->outAt;
    }

    public function setOutAt(?DateTimeInterface $outAt): self
    {
        $this->outAt = $outAt;

        return $this;
    }
}
