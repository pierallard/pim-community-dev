<?php

namespace Pim\Bundle\EnrichBundle\Doctrine\ORM\Repository;

use Akeneo\Component\StorageUtils\Repository\SearchableRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\QueryBuilder;
use Pim\Component\Catalog\Model\AttributeOptionInterface;

/**
 * AttributeOption searchable repository
 *
 * @author    Philippe Mossière <philippe.mossiere@akeneo.com>
 * @copyright 2016 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
class AttributeOptionSearchableRepository implements SearchableRepositoryInterface
{
    /** @var EntityManagerInterface */
    protected $entityManager;

    /** @var string */
    protected $entityName;

    /**
     * @param ObjectManager $entityManager
     * @param string $entityName
     */
    public function __construct(EntityManagerInterface $entityManager, $entityName)
    {
        $this->entityManager = $entityManager;
        $this->entityName    = $entityName;
    }

    /**
     * {@inheritdoc}
     *
     * @return AttributeOptionInterface[]
     */
    public function findBySearch($search = null, array $options = [])
    {
        $qb = $this->entityManager->createQueryBuilder();

        $qb->select('o')
            ->distinct()
            ->from($this->entityName, 'o')
            ->leftJoin('o.optionValues', 'v')
            ->leftJoin('o.attribute', 'a')
            ->andWhere('a.code = :attributeCode')
            ->orderBy('o.sortOrder')
            ->setParameter('attributeCode', $options['identifier']);

        if ($search) {
            $qb->andWhere('v.value like :search OR o.code LIKE :search')
                ->setParameter('search', '%' . $search . '%');
        }

        $qb = $this->applyQueryOptions($qb, $options);

        return $qb->getQuery()->getResult();
    }

    /**
     * @param QueryBuilder $qb
     * @param array        $options
     *
     * @return QueryBuilder
     */
    protected function applyQueryOptions(QueryBuilder $qb, array $options)
    {
        if (isset($options['identifiers']) && is_array($options['identifiers']) && !empty($options['identifiers'])) {
            $qb->andWhere('o.code in (:codes)');
            $qb->setParameter('codes', $options['identifiers']);
        }

        if (isset($options['locale']) && null !== $options['locale']) {
            $qb->andWhere('v.locale = :locale');
            $qb->setParameter('locale', $options['locale']);
        }

        if (isset($options['limit'])) {
            $qb->setMaxResults((int) $options['limit']);
            if (isset($options['page'])) {
                $qb->setFirstResult((int) $options['limit'] * ((int) $options['page'] - 1));
            }
        }

        return $qb;
    }
}
