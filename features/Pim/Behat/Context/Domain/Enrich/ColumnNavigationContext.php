<?php

namespace Pim\Behat\Context\Domain\Enrich;

use Context\Spin\SpinCapableTrait;
use Pim\Behat\Context\PimContext;

class ColumnNavigationContext extends PimContext
{
    use SpinCapableTrait;

    /**
     * @param string $panel
     *
     * @Given /^I visit the "([^"]*)" column tab$/
     */
    public function iVisitTheColumnTab($panel)
    {
        $this->spin(function () use ($panel) {
            return $this->getCurrentPage()->find('css', sprintf('.column-navigation-link:contains(%s)', $panel));
        }, sprintf('Can not found the column navigation link "%s"', $panel))->click();
    }
}
