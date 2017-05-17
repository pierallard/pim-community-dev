'use strict';

/**
 * Base extension for tab
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
            template: _.template(template),
            events: {
                'click': 'redirect'
            },
            active: false,
            items: [],

            /**
             * {@inheritdoc}
             */
            initialize: function (config) {
                this.config = config.config;
                this.items = [];

                BaseForm.prototype.initialize.apply(this, arguments);
            },

            /**
             * {@inheritdoc}
             */
            configure: function () {
                this.listenTo(this.getRoot(), 'pim_menu:register_item', this.registerItem);

                BaseForm.prototype.configure.apply(this, arguments);
            },


            /**
             * {@inheritdoc}
             */
            render: function () {
                this.$el.empty().append(this.template({
                    active: this.active,
                    title: this.getLabel(),
                    icon: '/bundles/pimui/images/' + this.config.icon,
                    iconHover: '/bundles/pimui/images/' + this.config.iconHover
                }));

                return BaseForm.prototype.render.apply(this, arguments);
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
                if (undefined !== this.config.to) {
                    return this.config.to;
                } else {
                    return _.first(_.sortBy(this.items, 'position')).getRoute();
                }
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
            },

            /**
             * Registers a new item attached to this tab.
             *
             * @param {Event} event
             * @param {string} event.target
             * @param {Backbone.View} event.origin
             */
            registerItem: function (event) {
                if (event.target === this.code) {
                    this.items.push(event.origin);
                }
            }
        });
    });
