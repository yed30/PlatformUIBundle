/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
// **NOTICE:**
// THIS IS AN AUTO-GENERATED FILE
// DO YOUR MODIFICATIONS IN THE CORRESPONDING .jsx FILE
// AND REGENERATE IT WITH: grunt jsx
// END OF NOTICE
YUI.add('ez-alloyeditor-button-imagevariation', function (Y) {
    "use strict";
    /**
     * Provides the image variation drop down
     *
     * @module ez-alloyeditor-button-remove
     */
    Y.namespace('eZ.AlloyEditorButton');

    var AlloyEditor = Y.eZ.AlloyEditor,
        React = Y.eZ.React,
        ButtonImageVariation;

    /**
     * The ButtonImageVariation components represents a drop down to choose
     * the image variation to use.
     *
     * @uses Y.eZ.AlloyEditorButton.WidgetButton
     *
     * @class ButtonImageVariation
     * @namespace eZ.AlloyEditorButton
     */
    ButtonImageVariation = React.createClass({displayName: "ButtonImageVariation",
        mixins: [
            Y.eZ.AlloyEditorButton.WidgetButton,
        ],

        statics: {
            key: 'ezimagevariation'
        },

        _updateVariation: function (e) {
            console.log('Update variation');
        },

        /**
         * Returns the options to add to the drop down list.
         *
         * @method _getImageVariationOptions
         * @return Array
         */
        _getImageVariationOptions: function () {
            var editor = this.props.editor.get('nativeEditor'),
                variations = editor.config.eZ.imageVariations;

            return variations.map(function (variation) {
                return React.createElement("option", {
                    key: variation.identifier, 
                    value: variation.identifier}, variation.name);
            });
        },

        render: function () {
            return (
                React.createElement("select", {
                    defaultValue: this._getWidget().getConfig('size'), 
                    onChange: this._updateVariation, 
                    tabIndex: this.props.tabIndex}, 
                    this._getImageVariationOptions()
                )
            );
        },
    });

    AlloyEditor.Buttons[ButtonImageVariation.key] = ButtonImageVariation;

    Y.eZ.AlloyEditorButton.ButtonImageVariation = ButtonImageVariation;
});
