'use strict';

/**
 * Base extension forheadermenu
 *
 * @author    Pierre Allard <pierre.allard@akeneo.com>
 * @copyright 2017 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
define(
    [
        'underscore',
        'pim/form/common/column'
    ],
    function (
        _,
        Column
    ) {
        return Column.extend({
            active: false,

            render: function () {
                if (this.active) {
                    return Column.prototype.render.apply(this, arguments);
                } else {
                    return this.$el.empty();
                }
            },

            /**
             * Set tab active or not.
             *
             * @param {string[]} codes
             */
            setActive: function (codes) {
                this.active = _.contains(codes, this.config.tab);
                this.render();

                return _.reduce(this.extensions, function (p, extension) {
                    return _.union(p, extension.setActive(codes));
                }, []);
            }
        });
    });
