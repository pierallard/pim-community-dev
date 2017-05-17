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
        'pim/form',
        'oro/mediator',
        'text!pim/template/menu/menu'
    ],
    function (
        _,
        BaseForm,
        mediator,
        template
    ) {
        return BaseForm.extend({
            className: 'AknHeader',
            template: _.template(template),

            /**
             * {@inheritdoc}
             */
            initialize: function (config) {
                mediator.on('pim_menu:highlight', this.highlight, this);

                return BaseForm.prototype.initialize.apply(this, arguments);
            },

            /**
             * {@inheritdoc}
             */
            render: function () {
                this.$el.empty().append(this.template({

                }));

                return BaseForm.prototype.render.apply(this, arguments);
            },

            /**
             * Highlight tue current menu
             *
             * @param {Event} event
             * @param {string[]} event.paths
             * @param {Backbone.View} event.origin
             */
            highlight: function (event) {
                var breadcrumbItems = _.reduce(this.extensions, function (p, extension) {
                    return _.union(p, extension.setActive(event.paths));
                }, []);

                event.origin.setBreadcrumbs(breadcrumbItems);
            }
        });
    });
