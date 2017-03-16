<?php

namespace spec\Pim\Component\Catalog\Query;

use Akeneo\Component\StorageUtils\Cursor\CursorFactoryInterface;
use Doctrine\Common\Persistence\ObjectManager;
use PhpSpec\ObjectBehavior;
use Pim\Bundle\CatalogBundle\Doctrine\ORM\Repository\ProductRepository;
use Pim\Bundle\CatalogBundle\Elasticsearch\SearchQueryBuilder;
use Pim\Component\Catalog\Query\Filter\FilterRegistryInterface;
use Pim\Component\Catalog\Query\Sorter\SorterRegistryInterface;
use Pim\Component\Catalog\Repository\AttributeRepositoryInterface;
use Prophecy\Argument;

class ProductQueryBuilderFactorySpec extends ObjectBehavior
{
    function let(
        AttributeRepositoryInterface $attRepository,
        FilterRegistryInterface $filterRegistry,
        SorterRegistryInterface $sorterRegistry,
        CursorFactoryInterface $cursorFactory,
        ObjectManager $om
    ) {
        $this->beConstructedWith(
            'Pim\Component\Catalog\Query\ProductQueryBuilder',
            $om,
            'Pim\Component\Catalog\Model\Product',
            $attRepository,
            $filterRegistry,
            $sorterRegistry,
            $cursorFactory
        );
    }

    function it_is_a_product_query_factory()
    {
        $this->shouldImplement('Pim\Component\Catalog\Query\ProductQueryBuilderFactoryInterface');
    }

    function it_creates_a_product_query_builder()
    {
        $pqb = $this->create(['default_locale' => 'en_US', 'default_scope' => 'print']);
        $pqb->getQueryBuilder()->shouldBeAnInstanceOf(SearchQueryBuilder::class);
    }

    //TODO TIP-706: enable this when we'll merge the PQB family family
//    function it_creates_a_product_query_builder_with_filters()
//    {
//        $pqb = $this->create(
//            [
//                'default_locale' => 'en_US',
//                'default_scope'  => 'print',
//                'filters'        => [
//                    [
//                        'field'    => 'family',
//                        'operator' => 'CONTAINS',
//                        'value'    => 'foo'
//                    ],
//                ]
//            ]
//        );
//        $pqb->getQueryBuilder()->shouldBeAnInstanceOf(SearchQueryBuilder::class);
//    }
}
