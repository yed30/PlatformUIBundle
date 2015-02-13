/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ez-dashboardview', function (Y) {
    "use strict";
    /**
     * Provides the Dashboard View class
     *
     * @module ez-dashboardview
     */
    Y.namespace('eZ');

    /**
     * The dashboard view
     *
     * @namespace eZ
     * @class DashboardView
     * @constructor
     * @extends eZ.TemplateBasedView
     */
    Y.eZ.DashboardView = Y.Base.create('dashboardView', Y.eZ.TemplateBasedView, [], {
        events: {
            '.ez-discover': {
                'tap': '_runUniversalDiscovery',
            },
            '.ez-discover-settings': {
                'tap': '_runUniversalDiscoverySettings',
            },
        },

        _runUniversalDiscovery: function (e) {
            this.fire('contentDiscover', {
                config: {
                    contentDiscoveredHandler: Y.bind(this._universalDiscoveryConfirmHandler, this),
                }
            });
        },

        _runUniversalDiscoverySettings: function (e) {
            this.fire('contentDiscover', {
                config: {
                    title: 'Select your contentS',
                    multiple: true,
                    contentDiscoveredHandler: Y.bind(this._universalDiscoveryConfirmHandler, this),
                    //visibleMethod: 'recent',
                },
            });
        },

        _universalDiscoveryConfirmHandler: function (e) {
            var selNode = this.get('container').one('.ez-ud-selection'),
                names = [];

            if ( e.target.get('multiple') ) {
                Y.Array.each(e.selection, function (struct) {
                    names.push(struct.content.get('name'));
                });
                selNode.setContent(names.join(', '));
            } else {
                selNode.setContent(e.selection.content.get('name'));
            }
        },

        /**
         * Renders the dashboard view
         *
         * @method render
         * @return {eZ.DashboardView} the view itself
         */
        render: function () {
            this.get('container').setHTML(this.template());
            return this;
        }
    });
});
