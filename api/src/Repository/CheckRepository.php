<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Check;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Check|null find($id, $lockMode = null, $lockVersion = null)
 * @method Check|null findOneBy(array $criteria, array $orderBy = null)
 * @method Check[]    findAll()
 * @method Check[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CheckRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Check::class);
    }

    public function save(Check $check): void
    {
        $this->_em->persist($check);
    }

    // /**
    //  * @return Check[] Returns an array of Check objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Check
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
