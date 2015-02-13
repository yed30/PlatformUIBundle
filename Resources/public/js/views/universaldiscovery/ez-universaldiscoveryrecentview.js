/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ez-universaldiscoveryrecentview', function (Y) {
    "use strict";
    /**
     *
     * @module ez-universaldiscoveryrecentview
     */
    Y.namespace('eZ');

    Y.eZ.UniversalDiscoveryRecentView = Y.Base.create('universalDiscoveryRecentView', Y.eZ.UniversalDiscoveryMethodBaseView, [], {
        render: function () {
            this.get('container').setHTML(this.template());
            return this;
        },
    }, {
        ATTRS: {
            /**
             * @attribute title
             * @default 'Browse'
             */
            title: {
                value: 'Recent',
                readOnly: true,
            },

            /**
             * @attribute identifier
             * @default 'browse'
             */
            identifier: {
                value: 'recent',
                readOnly: true,
            },
        }
    });
});
