'use strict';

/**
 * Base extension for menu
 *
 * @author    Julien Sanchez <julien@akeneo.com>
 * @copyright 2017 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
define(
    [
        'underscore',
        'oro/translator',
        'pim/form',
        'pim/router',
        'text!pim/template/menu/item'
    ],
    function (
        _,
        __,
        BaseForm,
        router,
        template
    ) {
        return BaseForm.extend({
            template: _.template(template),
            events: {
                'click .navigation-item': 'redirect'
            },
            active: false,

            /**
             * {@inheritdoc}
             */
            initialize: function (config) {
                this.config = config.config;

                BaseForm.prototype.initialize.apply(this, arguments);
            },

            /**
             * {@inheritdoc}
             */
            render: function () {
                this.$el.empty().append(this.template({
                    title: this.getLabel(),
                    active: this.active
                }));

                this.delegateEvents();

                return BaseForm.prototype.render.apply(this, arguments);
            },

            /**
             * Redirect the user to the config destination
             */
            redirect: function () {
                router.redirectToRoute(this.config.to);
            },

            /**
             * Returns the route of the tab.
             *
             * @returns {string|undefined}
             */
            getRoute: function () {
                return this.config.to;
            },

            /**
             * Returns the displayed label of the tab
             *
             * @returns {string}
             */
            getLabel: function () {
                return __(this.config.title);
            },

            /**
             * Set tab active or not.
             *
             * @param {string[]} codes
             */
            setActive: function (codes) {
                this.active = false;
                var breadcrumbItems = [];

                if (_.contains(codes, this.code)) {
                    this.active = true;
                    breadcrumbItems = [{
                        code: this.code,
                        route: this.getRoute(),
                        label: this.getLabel()
                    }];
                }

                this.render();

                return breadcrumbItems;
            }
        });
    });
