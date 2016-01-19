/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
/* global CKEDITOR */
YUI.add('ez-alloyeditor-button-imagevariation-tests', function (Y) {
    var renderTest,
        AlloyEditor = Y.eZ.AlloyEditor,
        React = Y.eZ.React,
        Assert = Y.Assert;

    renderTest = new Y.Test.Case({
        name: "eZ AlloyEditor imagevariation render test",

        "async:init": function () {
            var startTest = this.callback();

            CKEDITOR.plugins.addExternal('lineutils', '../../../lineutils/');
            CKEDITOR.plugins.addExternal('widget', '../../../widget/');
            this.variations = [{
                identifier: 'large',
                name: 'Large',
            }, {
                identifier: 'small',
                name: 'Small',
            }];
            this.container = Y.one('.container').getDOMNode();
            this.editorContainer = Y.one('.editorContainer');
            this.editorContainerContent = this.editorContainer.getHTML();
            this.editor = AlloyEditor.editable(
                this.editorContainer.getDOMNode(), {
                    extraPlugins: AlloyEditor.Core.ATTRS.extraPlugins.value + ',ezembed',
                    eZ: {
                        imageVariations: this.variations,
                    },
                }
            );
            this.editor.get('nativeEditor').on('instanceReady', Y.bind(function () {
                var editor = this.editor.get('nativeEditor');

                this.widget = editor.widgets.getByElement(
                    editor.element.findOne('#image')
                );
                this.widget.focus();

                startTest();
            }, this));
        },

        tearDown: function () {
            React.unmountComponentAtNode(this.container);
            this.editorContainer.setContent(this.editorContainerContent);
        },

        "Should render a select": function () {
            var select;

            select = React.render(
                <Y.eZ.AlloyEditorButton.ButtonImageVariation editor={this.editor} />,
                this.container
            );

            Assert.isNotNull(
                React.findDOMNode(select),
                "The select should be rendered"
            );
            Assert.areEqual(
                "SELECT", React.findDOMNode(select).tagName,
                "The component should generate a select"
            );
        },

        "Should render an option per variations": function () {
            var select, node;

            select = React.render(
                <Y.eZ.AlloyEditorButton.ButtonImageVariation editor={this.editor} />,
                this.container
            );
            node = Y.one(React.findDOMNode(select));

            Assert.areEqual(
                this.variations.length,
                node.all('option').size(),
                "One option per variation should be rendered"
            );

            node.all('option').each(function (option, i) {
                Assert.areEqual(
                    this.variations[i].name,
                    option.getContent(),
                    "The option should be filled with the variation name"
                );
                Assert.areEqual(
                    this.variations[i].identifier,
                    option.getAttribute('value'),
                    "The option value should be filled with the variation identifier"
                );
            }, this);
        },

        "Should set the default value of the select based on the used image variation": function () {
            var select, node;

            select = React.render(
                <Y.eZ.AlloyEditorButton.ButtonImageVariation editor={this.editor} />,
                this.container
            );
            node = Y.one(React.findDOMNode(select));
            Assert.areEqual(
                'small', node.get('value'),
                "'small' should be selected"
            );
        },
    });

    Y.Test.Runner.setName("eZ AlloyEditor imagevariation button tests");
    Y.Test.Runner.add(renderTest);
}, '', {requires: ['test', 'node', 'node-event-simulate', 'ez-alloyeditor-button-imagevariation', 'ez-alloyeditor-plugin-embed']});
