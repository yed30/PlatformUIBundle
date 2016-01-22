/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ez-trashitemmodel', function (Y) {
    "use strict";
    /**
     * Provides the Trash Item model cass
     *
     * @module ez-trashitemmodel
     */

    Y.namespace('eZ');

    /**
     * TrashItem model
     *
     * @namespace eZ
     * @class TrashItem
     * @constructor
     * @extends Model
     */
    Y.eZ.TrashItem = Y.Base.create('trashItemModel', Y.eZ.RestModel, [], {

    }, {
        REST_STRUCT_ROOT: "TrashItem",
        ATTRS_REST_MAP: [
            'childCount', 'depth', 'hidden', 'invisible', 'pathString',
            'priority', 'remoteId', 'sortField', 'sortOrder',
            {'id': 'locationId'}, {'_href': 'id'},
        ],
        LINKS_MAP: ['ParentLocation', 'Content'],
        ATTRS: {
            /**
             * The trash item's number of child
             *
             * @attribute childCount
             * @default 0
             * @type integer
             */
            childCount: {
                value: 0
            },

            /**
             * The trash item's depth
             *
             * @attribute depth
             * @default 1
             * @type integer
             */
            depth: {
                value: 1
            },

            /**
             * The trash item's hidden flag
             *
             * @attribute hidden
             * @default false
             * @type boolean
             */
            hidden: {
                value: false
            },

            /**
             * The trash item's invisible flag
             *
             * @attribute invisible
             * @default false
             * @type boolean
             */
            invisible: {
                value: false
            },

            /**
             * The trash item's id in the eZ Publish content repository
             *
             * @attribute locationId
             * @default ''
             * @type string
             */
            locationId: {
                value: ''
            },

            /**
             * The trash item's path string
             *
             * @attribute pathString
             * @default ''
             * @type string
             */
            pathString: {
                value: ""
            },

            /**
             * The trash item's priority
             *
             * @attribute priority
             * @default 0
             * @type integer
             */
            priority: {
                value: 0
            },

            /**
             * The trash item's remote id
             *
             * @attribute remoteId
             * @default ''
             * @type string
             */
            remoteId: {
                value: ""
            },

            /**
             * The trash item's sort field
             *
             * @attribute sortField
             * @default "PATH"
             * @type string
             */
            sortField: {
                value: "PATH"
            },

            /**
             * The trash item's sort order
             *
             * @attribute sortOrder
             * @default "ASC"
             * @type string
             */
            sortOrder: {
                value: "ASC"
            },
        }
    });
});
