define(
    [
        'jquery'
    ],
    function ($) {
        'use strict';

        return {
            init: function (defaultTab) {
                var activeTab = sessionStorage.getItem('pimee_product_asset_activeTab') || defaultTab;
                var tabSelector = 'a[href="' + activeTab + '"]';
                $(tabSelector).tab('show');
            }
        };
    });
