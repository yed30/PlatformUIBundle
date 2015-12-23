/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ez-trashitemmodel-tests', function (Y) {
    var loadFromHashTest,
        Assert = Y.Assert;

    loadFromHashTest = new Y.Test.Case({
        name: "eZ TrashItem Model loadFromHash test",

        setUp: function () {
            this.model = new Y.eZ.TrashItem();

            this.trashItemHash = {
                "_media-type": "application\/vnd.ez.api.TrashItem+json",
                "_href": "\/api\/ezp\/v2\/content\/trash\/124",
                "id": 124,
                "priority": 0,
                "hidden": false,
                "invisible": false,
                "ParentLocation": {
                    "_media-type": "application\/vnd.ez.api.Location+json",
                    "_href": "\/api\/ezp\/v2\/content\/locations\/1\/2"
                },
                "pathString": "\/1\/2\/124\/",
                "depth": 2,
                "childCount": 0,
                "remoteId": "c2c9eb420c91db11f810b2995165f1ba",
                "Content": {
                    "_media-type": "application\/vnd.ez.api.Content+json",
                    "_href": "\/api\/ezp\/v2\/content\/objects\/121"
                },
                "sortField": "PATH",
                "sortOrder": "ASC"
            };
        },

        tearDown: function () {
            this.model.destroy();
            delete this.model;
        },

        "Should load attribute from a trashItem hash": function () {
            this.model.loadFromHash(this.trashItemHash);

            Assert.areSame(
                this.trashItemHash._href,
                this.model.get('id'),
                "href hash attribute should have been set to id model attribute"
            );

            Assert.areSame(
                this.trashItemHash.id,
                this.model.get('locationId'),
                "id hash attribute should have been set to locationId model attribute"
            );

            Assert.areSame(
                this.trashItemHash.priority,
                this.model.get('priority'),
                "priority hash attribute should have been set to priority model attribute"
            );

            Assert.areSame(
                this.trashItemHash.hidden,
                this.model.get('hidden'),
                "hidden hash attribute should have been set to hidden model attribute"
            );

            Assert.areSame(
                this.trashItemHash.invisible,
                this.model.get('invisible'),
                "invisible hash attribute should have been set to invisible model attribute"
            );

            Assert.areSame(
                this.trashItemHash.pathString,
                this.model.get('pathString'),
                "pathString hash attribute should have been set to pathString model attribute"
            );

            Assert.areSame(
                this.trashItemHash.depth,
                this.model.get('depth'),
                "depth hash attribute should have been set to depth model attribute"
            );

            Assert.areSame(
                this.trashItemHash.childCount,
                this.model.get('childCount'),
                "childCount hash attribute should have been set to childCount model attribute"
            );

            Assert.areSame(
                this.trashItemHash.remoteId,
                this.model.get('remoteId'),
                "remoteId hash attribute should have been set to remoteId model attribute"
            );

            Assert.areSame(
                this.trashItemHash.sortField,
                this.model.get('sortField'),
                "sortField hash attribute should have been set to sortField model attribute"
            );

            Assert.areSame(
                this.trashItemHash.sortOrder,
                this.model.get('sortOrder'),
                "sortOrder hash attribute should have been set to sortOrder model attribute"
            );
        },

    });


    Y.Test.Runner.setName("eZ Trash Item Model tests");
    Y.Test.Runner.add(loadFromHashTest);

}, '', {requires: ['test', 'model-tests', 'ez-trashitemmodel', 'ez-restmodel']});
