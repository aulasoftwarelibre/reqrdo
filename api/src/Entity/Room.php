<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RoomRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;

/**
 * @ORM\Entity(repositoryClass=RoomRepository::class)
 *
 * @ApiResource(
 *     collectionOperations={"get"},
 *     itemOperations={"get"}
 * )
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
     * @ORM\Column(type="string", length=255, unique=true)
     *
     * @ApiProperty(identifier=true)
     */
    private string $slug;

    /** @ORM\Column(type="string", length=255, unique=true) */
    private string $name;

    /** @ORM\Column(type="integer") */
    private int $capacity;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="room")
     *
     * @var Collection<int, User>
     */
    private Collection $people;

    public function __construct()
    {
        $this->id     = (string) Uuid::v6();
        $this->people = new ArrayCollection();
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
        }

        return $this;
    }
}
