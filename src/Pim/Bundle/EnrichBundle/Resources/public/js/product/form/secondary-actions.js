'use strict';
/**
 * Displays a list of secondary actions
 *
 * @author    Pierre Allard <pierre.allard@akeneo.com>
 * @copyright 2017 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
define(
    [
        'underscore',
        'pim/form',
        'text!pim/template/product/secondary-actions'
    ],
    function (
        _,
        BaseForm,
        template
    ) {
        return BaseForm.extend({
            className: 'AknSecondaryActions AknDropdown AknButtonList-item',

            template: _.template(template),

            render: function () {
                this.$el.html(this.template());

                this.renderExtensions();
            }
        });
    }
);
