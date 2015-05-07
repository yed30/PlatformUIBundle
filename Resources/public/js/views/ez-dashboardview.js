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
        _randomTime: function () {
            return Math.round(Math.random() * (6000 - 1500) + 1500);
        },

        _notificationRandom: function (i) {

            i = i || 1;
            Y.later(this._randomTime(), this, function () {
                var time = this._randomTime();

                this.fire('notify', {
                    notification: {
                        text: 'This is the random notification ' + i + ', something is happening...',
                        identifier: 'random-notification-' + i,
                        state: 'started',
                        timeout: this._randomTime(),
                    }
                });
                Y.later(time, this, function () {
                    this.fire('notify', {
                        notification: {
                            text: 'Random notification ' + i + ' DONE after ' + time + 'ms',
                            identifier: 'random-notification-' + i,
                            state: 'done',
                            timeout: this._randomTime(),
                        }
                    });
                });
                this._notificationRandom(i+1);
            });
        },

        /**
         * Renders the dashboard view
         *
         * @method render
         * @return {eZ.DashboardView} the view itself
         */
        render: function () {
            this.get('container').setHTML(this.template());
            this._notificationRandom();
            return this;
        }
    });
});
