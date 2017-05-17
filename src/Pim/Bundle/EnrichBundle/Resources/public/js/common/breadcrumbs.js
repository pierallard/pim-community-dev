'use strict';

/**
 * Extension to display breadcrumbs on every page
 *
 * @author    Pierre Allard <pierre.allard@akeneo.com>
 * @copyright 2017 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
define(
    [
        'underscore',
        'pim/form',
        'text!pim/template/common/breadcrumbs',
        'oro/mediator',
        'pim/router'
    ],
    function (
        _,
        BaseForm,
        template,
        mediator,
        router
    ) {
        return BaseForm.extend({
            className: 'AknBreadcrumb',
            template: _.template(template),
            breadcrumbs: [],
            events: {
                'click .breadcrumbs-item': 'redirect'
            },

            /**
             * {@inheritdoc}
             */
            initialize: function (config) {
                this.config = config.config;

                return BaseForm.prototype.initialize.apply(this, arguments);
            },

            /**
             * {@inheritdoc}
             */
            configure: function () {
                mediator.trigger('pim_menu:highlight', {
                    paths: this.config.path,
                    origin: this
                });
            },

            /**
             * {@inheritdoc}
             */
            render: function () {
                this.$el.empty().html(this.template({
                    breadcrumbs: this.breadcrumbs
                }))
            },

            /**
             * Set the current breadcrumbs information.
             * Event breadcrumb item contains code, route and label.
             *
             * @param {Array} event
             */
            setBreadcrumbs: function (event) {
                this.breadcrumbs = event;
            },

            /**
             * Redirects to the linked route
             *
             * @param {Event} event
             */
            redirect: function (event) {
                var code = event.currentTarget.dataset['code'];
                var breadcrumb = _.findWhere(this.breadcrumbs, { code: code });
                router.redirectToRoute(breadcrumb.route);
            }
        });
    });
