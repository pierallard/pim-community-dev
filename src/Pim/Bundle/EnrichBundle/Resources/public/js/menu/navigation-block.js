'use strict';

/**
 * Base extension for menu
 *
 * @author    Pierre Allard <pierre.allard@akeneo.com>
 * @copyright 2017 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
define(
    [
        'underscore',
        'oro/translator',
        'pim/form',
        'text!pim/template/menu/navigation-block'
    ],
    function (
        _,
        __,
        BaseForm,
        template
    ) {
        return BaseForm.extend({
            className: 'AknColumn-block',
            template: _.template(template),

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
                    title: __(this.config.title)
                }));

                BaseForm.prototype.render.apply(this, arguments);
            },

            /**
             * @returns {Backbone.View}
             */
            getColumn: function () {
                return this.getParent().getColumn();
            },

            /**
             * Set tab active or not.
             *
             * @param {string[]} codes
             */
            setActive: function (codes) {
                return _.reduce(this.extensions, function (p, extension) {
                    return _.union(p, extension.setActive(codes));
                }, []);
            }
        })
    });
