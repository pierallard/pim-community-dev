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
            current: null,
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
             */
            highlight: function (event) {
                var result = [];

                _.each(this.extensions, function (extension) {
                    if (extension.code === event.paths[0]) {
                        result.push({
                            code: extension.code,
                            route: extension.getRoute(),
                            label: extension.getLabel()
                        });
                    }

                    extension.setActive(event.paths[0]);
                });

                this.current = result;
                event.origin.setBreadcrumbs(result);
            }
        });
    });
