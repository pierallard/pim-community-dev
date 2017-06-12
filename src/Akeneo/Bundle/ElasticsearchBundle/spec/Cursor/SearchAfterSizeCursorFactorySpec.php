<?php

namespace spec\Akeneo\Bundle\ElasticsearchBundle\Cursor;

use Akeneo\Bundle\ElasticsearchBundle\Client;
use Akeneo\Bundle\ElasticsearchBundle\Cursor\SearchAfterSizeCursor;
use Akeneo\Component\StorageUtils\Exception\InvalidObjectException;
use Akeneo\Component\StorageUtils\Repository\CursorableRepositoryInterface;
use Doctrine\Common\Persistence\ObjectManager;
use PhpSpec\ObjectBehavior;
use Pim\Component\Catalog\Model\ProductInterface;
use Prophecy\Argument;

class SearchAfterSizeCursorFactorySpec extends ObjectBehavior
{
    const DEFAULT_BATCH_SIZE = 100;

    function let(Client $searchEngine, ObjectManager $om)
    {
        $this->beConstructedWith(
            $searchEngine,
            $om,
            ProductInterface::class,
            SearchAfterSizeCursor::class,
            self::DEFAULT_BATCH_SIZE,
            'pim_catalog_product'
        );
    }

    function it_is_initializable()
    {
        $this->shouldHaveType('Akeneo\Bundle\ElasticsearchBundle\Cursor\SearchAfterSizeCursorFactory');
        $this->shouldImplement('Akeneo\Component\StorageUtils\Cursor\CursorFactoryInterface');
    }

    function it_creates_a_cursor($om, $searchEngine, CursorableRepositoryInterface $cursorableRepository)
    {
        $om->getRepository(ProductInterface::class)->willReturn($cursorableRepository);
        $searchEngine->search('pim_catalog_product', ['size' => 100, 'sort' => ['_uid' => 'asc'], 'search_after' => ['foo']])->willReturn([
            'hits' => [
                'total' => 0,
                'hits' => []
            ]
        ]);

        $this->createCursor([], ['page_size' => 100, 'limit' => 150, 'search_after' => ['foo']])
            ->shouldBeAnInstanceOf('Akeneo\Component\StorageUtils\Cursor\CursorInterface');
    }

    function it_creates_a_cursor_with_search_after_identifier($om, $searchEngine, CursorableRepositoryInterface $cursorableRepository)
    {
        $om->getRepository(ProductInterface::class)->willReturn($cursorableRepository);
        $searchEngine->search('pim_catalog_product', [
            'size' => 100, 'sort' => ['_uid' => 'asc'], 'search_after' => ['2017-12-12', 'pim_catalog_product#foo']
        ])->willReturn([
            'hits' => [
                'total' => 0,
                'hits' => []
            ]
        ]);

        $this->createCursor([], ['page_size' => 100, 'limit' => 150, 'search_after' => ['2017-12-12'], 'search_after_unique_key' => 'foo'])
            ->shouldBeAnInstanceOf('Akeneo\Component\StorageUtils\Cursor\CursorInterface');
    }

    function it_throws_an_exception_if_repository_is_not_cursorable($om)
    {
        $om->getRepository(ProductInterface::class)->willReturn(Argument::any());

        $this->shouldThrow(
            InvalidObjectException::objectExpected(ProductInterface::class, CursorableRepositoryInterface::class)
        )->during('createCursor', [[], ['limit' => 150, 'search_after' => []]]);
    }
}
