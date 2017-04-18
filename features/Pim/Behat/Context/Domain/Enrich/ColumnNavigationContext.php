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

        $this->wait();
    }

    /**
     * @param string $tab
     *
     * @Then /^I should be on the "([^"]*)" column tab$/
     */
    public function iShouldBeOnTheTab($tab)
    {
        $this->spin(function () use ($tab) {
            return $this->getCurrentTabName() === $tab;
        }, sprintf(
            'Expected to be on the column tab "%s", "%s" found',
            $tab,
            null !== $this->getCurrentTabName() ? $this->getCurrentTabName() : 'no current tab'
        ));
    }

    /**
     * @return null|string
     */
    protected function getCurrentTabName()
    {
        $currentTab = $this->getCurrentPage()->find('css', '.AknColumn-navigationLink--active');

        return (null !== $currentTab) ? $currentTab->getText() : null;
    }
}
