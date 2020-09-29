<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RoomRepository;
use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;

/**
 * @ORM\Entity(repositoryClass=RoomRepository::class)
 *
 * @ApiResource(
 *     normalizationContext={"groups"={"room"}},
 *     collectionOperations={"get"},
 *     itemOperations={"get"},
 *     mercure=true
 * )
 * @SuppressWarnings(PHPMD.UnusedPrivateField)
 */
class Room
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\Column(type="guid")
     *
     * @ApiProperty(identifier=false)
     */
    private string $id;

    /**
     * @ORM\Version()
     * @ORM\Column(type="integer")
     *
     * @phpcsSuppress SlevomatCodingStandard.Classes.UnusedPrivateElements.UnusedProperty
     */
    private int $version;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     *
     * @ApiProperty(identifier=true)
     * @Groups({"room"})
     */
    private string $slug;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     *
     * @Groups({"room", "check"})
     */
    private string $name;

    /**
     * @ORM\Column(type="integer")
     *
     * @Groups({"room"})
     */
    private int $capacity;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="room")
     *
     * @Groups({"room"})
     * @var Collection<int, User>
     */
    private Collection $people;

    /** @ORM\Column(type="datetime") */
    private DateTimeInterface $updatedAt;

    public function __construct()
    {
        $this->id     = (string) Uuid::v6();
        $this->people = new ArrayCollection();
        $this->update();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): self
    {
        $this->capacity = $capacity;

        return $this;
    }

    /**
     * @Groups({"room"})
     */
    public function getOccupation(): int
    {
        return $this->people->count();
    }

    /**
     * @return Collection|User[]
     */
    public function getPeople(): Collection
    {
        return $this->people;
    }

    public function addPerson(User $person): self
    {
        if (! $this->people->contains($person)) {
            $this->people[] = $person;
            $person->setRoom($this);

            $this->update();
        }

        return $this;
    }

    public function removePerson(User $person): self
    {
        if ($this->people->contains($person)) {
            $this->people->removeElement($person);
            // set the owning side to null (unless already changed)
            if ($person->getRoom() === $this) {
                $person->setRoom(null);
            }

            $this->update();
        }

        return $this;
    }

    public function getUpdatedAt(): ?DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    private function update(): void
    {
        $this->updatedAt = new DateTimeImmutable();
    }
}
