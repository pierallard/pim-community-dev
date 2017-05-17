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
        'oro/mediator'
    ],
    function (
        _,
        BaseForm,
        mediator
    ) {
        return BaseForm.extend({
            current: null,

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
                // TODO Temporary, to delete.
                this.$el.empty();

                BaseForm.prototype.render.apply(this, arguments);

                this.$el.prepend('Current highlight: ' + _.result(_.first(this.current), 'label', 'none'));
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
                });

                this.current = result;
                this.render();
                event.origin.setBreadcrumbs(result);
            }
        });
    });
