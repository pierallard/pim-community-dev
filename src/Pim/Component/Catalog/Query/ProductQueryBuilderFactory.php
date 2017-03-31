<?php

namespace Pim\Component\Catalog\Query;

use Akeneo\Component\StorageUtils\Cursor\CursorFactoryInterface;
use Pim\Component\Catalog\Query\Filter\FilterRegistryInterface;
use Pim\Component\Catalog\Query\Sorter\SorterRegistryInterface;
use Pim\Component\Catalog\Repository\AttributeRepositoryInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Aims to wrap the creation and configuration of the product query builder
 *
 * @author    Nicolas Dupont <nicolas@akeneo.com>
 * @copyright 2014 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
class ProductQueryBuilderFactory implements ProductQueryBuilderFactoryInterface
{
    /** @var string */
    protected $pqbClass;

    /** @var AttributeRepositoryInterface */
    protected $attributeRepository;

    /** FilterRegistryInterface */
    protected $filterRegistry;

    /** SorterRegistryInterface */
    protected $sorterRegistry;

    /** CursorFactoryInterface */
    protected $cursorFactory;

    /**
     * @param string                       $pqbClass
     * @param AttributeRepositoryInterface $attributeRepository
     * @param FilterRegistryInterface      $filterRegistry
     * @param SorterRegistryInterface      $sorterRegistry
     * @param CursorFactoryInterface       $cursorFactory
     */
    public function __construct(
        $pqbClass,
        AttributeRepositoryInterface $attributeRepository,
        FilterRegistryInterface $filterRegistry,
        SorterRegistryInterface $sorterRegistry,
        CursorFactoryInterface $cursorFactory
    ) {
        $this->pqbClass = $pqbClass;
        $this->attributeRepository = $attributeRepository;
        $this->filterRegistry = $filterRegistry;
        $this->sorterRegistry = $sorterRegistry;
        $this->cursorFactory = $cursorFactory;
    }

    /**
     * {@inheritdoc}
     */
    public function create(array $options = [])
    {
        $options = $this->resolveOptions($options);

        $pqb = $this->createProductQueryBuilder([
            'locale' => $options['default_locale'],
            'scope'  => $options['default_scope']
        ]);

        $pqb->setQueryBuilder(new SearchQueryBuilder());

        foreach ($options['filters'] as $filter) {
            $pqb->addFilter($filter['field'], $filter['operator'], $filter['value'], $filter['context']);
        }

        return $pqb;
    }

    /**
     * @param array $options
     *
     * @return ProductQueryBuilderInterface
     */
    protected function createProductQueryBuilder(array $options)
    {
        $pqb = new $this->pqbClass(
            $this->attributeRepository,
            $this->filterRegistry,
            $this->sorterRegistry,
            $this->cursorFactory,
            $options
        );

        return $pqb;
    }

    /**
     * @param array $options
     *
     * @return array
     */
    protected function resolveOptions(array $options)
    {
        $resolver = new OptionsResolver();
        $this->configureOptions($resolver);
        $options = $resolver->resolve($options);

        $filterResolver = new OptionsResolver();
        $this->configureFilterOptions($filterResolver);

        $filters = $options['filters'];
        $options['filters'] = [];
        foreach ($filters as $filter) {
            $options['filters'][] = $filterResolver->resolve($filter);
        }

        return $options;
    }

    /**
     * @param OptionsResolver $resolver
     */
    protected function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefined([
            'repository_method',
            'repository_parameters',
            'currentGroup',
            'product',
            'default_locale',
            'default_scope',
            'filters',
            'search_after',
            'limit'
        ]);
        $resolver->setDefaults([
            'repository_method'     => 'createQueryBuilder',
            'repository_parameters' => 'o',
            'default_locale'        => null,
            'default_scope'         => null,
            'filters'               => [],
        ]);
        $resolver->setAllowedTypes('filters', 'array');
        $resolver->setAllowedTypes('search_after', 'string');
        $resolver->setAllowedTypes('limit', 'integer');
    }

    /**
     * @param OptionsResolver $resolver
     */
    protected function configureFilterOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired(['field', 'operator', 'value'])
            ->setDefined(['context'])
            ->setDefaults([
                'context'  => [],
            ]);
    }
}
