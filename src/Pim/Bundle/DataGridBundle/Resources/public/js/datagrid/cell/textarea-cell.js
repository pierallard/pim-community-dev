/* global define */
define(['oro/datagrid/string-cell', 'bootstrap'],
function(StringCell) {
    'use strict';

    return StringCell.extend({
        render: function() {
            var description = this.formatter.fromRaw(this.model.get(this.column.get("name")));

            if (description.length > 40) {
                this.$el.html('<span id="'+ this.model.get("sku") + '">' + description.substring(0, 40) + ' ... </span>');
                this.delegateEvents();

                this.$el.popover({
                    title: this.formatter.fromRaw(this.column.get('label')),
                    html: true,
                    content: description.substring(0, 300) + ' ...',
                    delay: {
                        show: 500,
                        hide: 100
                    },
                    container: '#' + this.model.get("sku"),
                    trigger: 'hover'
                });
            } else {
                this.$el.html(description);
            }

            return this;
        }
    });
});