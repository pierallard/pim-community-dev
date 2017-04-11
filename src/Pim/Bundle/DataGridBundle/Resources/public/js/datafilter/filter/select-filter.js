/* global define */
define(
    [
        'underscore',
        'oro/translator',
        'oro/datafilter/abstract-filter',
        'pim/initselect2'
    ],
function(
    _,
    __,
    AbstractFilter,
    initSelect2
) {
    'use strict';

    /**
     * Select filter: filter value as select option
     *
     * @export  oro/datafilter/select-filter
     * @class   oro.datafilter.SelectFilter
     * @extends oro.datafilter.AbstractFilter
     */
    return AbstractFilter.extend({
        /**
         * Filter template
         *
         * @property
         */
        template: _.template(
            '<div class="AknActionButton filter-select filter-criteria-selector oro-drop-opener oro-dropdown-toggle">' +
                '<% if (showLabel) { %><%= label %>: <% } %>' +
                '<span class="filter-criteria-hint"><%= criteriaHint %></span>' +
                '<span class="AknActionButton-caret AknCaret"></span>' +
            '</div>' +
            '<% if (canDisable) { %><a href="<%= nullLink %>" class="disable-filter"><i class="icon-remove hide-text"><%- _.__("Close") %></i></a><% } %>' +
            '<div class="filter-criteria dropdown-menu" />'
        ),

        popupCriteriaTemplate: _.template(
            '<div class="AknFilterChoice">' +
                '<select class="select2">' +
                    '<% _.each(options, function (option) { %>' +
                        '<option value="<%= option.value %>"<% if (option.value == selectedChoice.value) { %> selected="selected"<% } %>><%= option.label %></option>' +
                    '<% }); %>' +
                '</select>' +
            '</div>'
        ),

        /**
         * Set of selectors to manage the filter
         *
         * @property
         */
        selectors: {
            container: '.filter-select',
            input: 'select',
            criteria: '.filter-criteria',
            criteriaHint: '.filter-criteria-hint'
        },

        /**
         * Should default value be added to options list
         *
         * @property
         */
        populateDefault: true,

        /**
         * Indicates if the popup for the criteria is showed or not
         *
         * @property
         */
        popupCriteriaShowed: false,

        /**
         * Filter events
         *
         * @property
         */
        events: {
            'click .disable-filter': '_onClickDisableFilter',
            'change select': '_onSelectChange',
            'click .filter-criteria-selector': '_onClickCriteriaSelector'
        },

        /**
         * Initialize.
         *
         * @param {Object} options
         */
        initialize: function() {
            if (_.isUndefined(this.choices)) {
                this.choices = [];
            }
            this.choices = _.map(this.choices, function(option, i) {
                return _.isString(option) ? {value: i, label: option} : option;
            });
            if (_.isUndefined(this.emptyValue)) {
                this.emptyValue = {
                    value: ' '
                };
            }

            AbstractFilter.prototype.initialize.apply(this, arguments);
        },

        /**
         * Render filter template
         *
         * @return {*}
         */
        render: function () {
            this.$el.empty();

            this.$el.append(
                this.template({
                    label: this.label,
                    showLabel: this.showLabel,
                    placeholder: this.placeholder,
                    nullLink: this.nullLink,
                    canDisable: this.canDisable,
                    criteriaHint: this._getCriteriaHint()
                })
            );

            this._renderCriteria(this.$(this.selectors.criteria));
            this._updateDOMValue();

            initSelect2.init(this.$(this.selectors.input).parent(), {
                multiple: false,
                width: '290px',
                minimumInputLength: 0
            });

            $('body').on('click', this._clickOutsideCriteriaCallback.bind(this));

            return this;
        },

        /**
         * Close the criteria popup if the user clicks in elsewhere of the popup
         *
         * @param {Event} e
         */
        _clickOutsideCriteriaCallback: function(e) {
            if (this.popupCriteriaShowed) {
                var elem = this.$(this.selectors.criteria);

                if (elem.get(0) !== e.target && !elem.has(e.target).length) {
                    this._hideCriteria();
                    e.stopPropagation();
                }
            }
        },

        /**
         * Render filter criteria popup
         *
         * @param {Object} el
         * @protected
         * @return {*}
         */
        _renderCriteria: function(el) {
            var options =  this.choices.slice(0);
            if (this.populateDefault) {
                options.unshift({value: ' ', label: this.placeholder});
            }

            var selectedChoice = this.emptyValue.value;
            $(el).append(this.popupCriteriaTemplate({
                options: options,
                selectedChoice: selectedChoice
            }));
            return this;
        },

        /**
         * Get criteria hint value
         *
         * @return {String}
         */
        _getCriteriaHint: function() {
            var value = (arguments.length > 0) ? this._getDisplayValue(arguments[0]) : this._getDisplayValue();
            var choice = _.find(this.choices, function (c) {
                return (c.value == value.value);
            });
            return !_.isUndefined(choice) ? choice.label : this.placeholder;
        },

        /**
         * Triggers change data event
         *
         * @protected
         */
        _onSelectChange: function() {
            this.setValue(this._formatRawValue(this._readDOMValue()));
        },

        /**
         * Handle click on filter disabler
         *
         * @param {Event} e
         */
        _onClickDisableFilter: function(e) {
            e.preventDefault();
            this.disable();
        },

        /**
         * @inheritDoc
         */
        _isNewValueUpdated: function(newValue) {
            return !_.isEqual(this.getValue().value || '', newValue.value);
        },

        /**
         * @inheritDoc
         */
        _onValueUpdated: function(newValue, oldValue) {
            AbstractFilter.prototype._onValueUpdated.apply(this, arguments);
            this.$(this.selectors.criteriaHint).html(_.escape(this._getCriteriaHint()));
            this._hideCriteria();
        },

        /**
         * @inheritDoc
         */
        _writeDOMValue: function(value) {
            this._setInputValue(this.selectors.input, value.value);
            return this;
        },

        /**
         * @inheritDoc
         */
        _readDOMValue: function() {
            return {
                value: this._getInputValue(this.selectors.input)
            };
        },

        /**
         * Handle click on criteria selector
         *
         * @param {Event} e
         * @protected
         */
        _onClickCriteriaSelector: function(e) {
            e.stopPropagation();
            $('body').trigger('click');
            if (!this.popupCriteriaShowed) {
                this._showCriteria();
            } else {
                this._hideCriteria();
            }
        },

        /**
         * Show criteria popup
         *
         * @protected
         */
        _showCriteria: function() {
            this.$(this.selectors.criteria).show();
            var select2 = this.$(this.selectors.criteria).find(this.selectors.input);
            select2.select2('open');
            var currentValue = this.getValue();
            var currentChoice = _.find(this.choices, function (choice) {
                return choice.value === currentValue.value;
            });
            if (currentChoice) {
                select2.select2('data', { value: currentChoice.value, text: currentChoice.label })
            }

            this._setButtonPressed(this.$(this.selectors.criteria), true);
            setTimeout(_.bind(function() {
                this.popupCriteriaShowed = true;
            }, this), 100);
        },

        /**
         * Hide criteria popup
         *
         * @protected
         */
        _hideCriteria: function() {
            this.$(this.selectors.criteria).hide();
            this._setButtonPressed(this.$(this.selectors.criteria), false);
            setTimeout(_.bind(function() {
                this.popupCriteriaShowed = false;
            }, this), 100);
        }
    });
});
