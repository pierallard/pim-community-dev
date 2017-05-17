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
        'text!pim/template/menu/tab'
    ],
    function (
        _,
        __,
        BaseForm,
        router,
        template
    ) {
        return BaseForm.extend({
            className: 'AknHeader-menuItem',
            template: _.template(template),
            events: {
                'click': 'redirect'
            },

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
                this.$el.html(this.template({
                    title: this.getLabel(),
                    icon: '/bundles/pimui/images/' + this.config.icon,
                    iconHover: '/bundles/pimui/images/' + this.config.iconHover
                }));

                BaseForm.prototype.render.apply(this, arguments);
            },

            /**
             * Redirect the user to the config destination
             */
            redirect: function () {
                if (undefined !== this.getRoute()) {
                    router.redirectToRoute(this.getRoute());
                }
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
            }
        });
    });
