/* global define */
define(['backgrid', 'oro/datagrid/cell-formatter'],
function(Backgrid, CellFormatter) {
    'use strict';

    /**
     * Attribute as label column cell
     *
     * @export  oro/datagrid/string-cell
     * @class   oro.datagrid.StringCell
     * @extends Backgrid.StringCell
     */
    return Backgrid.StringCell.extend({
        className: "AknGrid-bodyCell attribute-as-label-cell",

        /**
         @property {(Backgrid.CellFormatter|Object|string)}
         */
        formatter: new CellFormatter()
    });
});
