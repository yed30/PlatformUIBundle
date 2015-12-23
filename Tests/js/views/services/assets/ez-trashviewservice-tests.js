/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ez-trashviewservice-tests', function (Y) {
    var serviceTest,
    Assert = Y.Assert, Mock = Y.Mock;

    serviceTest = new Y.Test.Case({
        name: "eZ Trash View Service tests",

        setUp: function () {
            this.trashResponse ={"document" :{
                "Trash": {
                    "_media-type": "application\/vnd.ez.api.Trash+json",
                    "_href": "\/api\/ezp\/v2\/content\/trash",
                    "TrashItem": [
                        {
                            "_media-type": "application\/vnd.ez.api.TrashItem+json",
                            "_href": "\/api\/ezp\/v2\/content\/trash\/54",
                            "id": 54,
                            "priority": 0,
                            "hidden": false,
                            "invisible": false,
                            "ParentLocation": {
                                "_media-type": "application\/vnd.ez.api.Location+json",
                                "_href": "\/api\/ezp\/v2\/content\/locations\/1\/2"
                            },
                            "pathString": "\/1\/2\/54\/",
                            "depth": 2,
                            "childCount": 0,
                            "remoteId": "19d14270a67a7a12951177ff33fc946d",
                            "Content": {
                                "_media-type": "application\/vnd.ez.api.Content+json",
                                "_href": "\/api\/ezp\/v2\/content\/objects\/52"
                            },
                            "sortField": "PATH",
                            "sortOrder": "ASC"
                        },
                        {
                            "_media-type": "application\/vnd.ez.api.TrashItem+json",
                            "_href": "\/api\/ezp\/v2\/content\/trash\/55",
                            "id": 55,
                            "priority": 0,
                            "hidden": false,
                            "invisible": false,
                            "ParentLocation": {
                                "_media-type": "application\/vnd.ez.api.Location+json",
                                "_href": "\/api\/ezp\/v2\/content\/locations\/1\/2"
                            },
                            "pathString": "\/1\/2\/55\/",
                            "depth": 2,
                            "childCount": 0,
                            "remoteId": "0458c82327b09582b697a05280cd8da3",
                            "Content": {
                                "_media-type": "application\/vnd.ez.api.Content+json",
                                "_href": "\/api\/ezp\/v2\/content\/objects\/53"
                            },
                            "sortField": "PATH",
                            "sortOrder": "ASC"
                        },
                        {
                            "_media-type": "application\/vnd.ez.api.TrashItem+json",
                            "_href": "\/api\/ezp\/v2\/content\/trash\/56",
                            "id": 56,
                            "priority": 0,
                            "hidden": false,
                            "invisible": false,
                            "ParentLocation": {
                                "_media-type": "application\/vnd.ez.api.Location+json",
                                "_href": "\/api\/ezp\/v2\/content\/locations\/1\/2"
                            },
                            "pathString": "\/1\/2\/56\/",
                            "depth": 2,
                            "childCount": 0,
                            "remoteId": "78363d0d0034b985dc518512230d395a",
                            "Content": {
                                "_media-type": "application\/vnd.ez.api.Content+json",
                                "_href": "\/api\/ezp\/v2\/content\/objects\/54"
                            },
                            "sortField": "PATH",
                            "sortOrder": "ASC"
                        },
                        {
                            "_media-type": "application\/vnd.ez.api.TrashItem+json",
                            "_href": "\/api\/ezp\/v2\/content\/trash\/57",
                            "id": 57,
                            "priority": 0,
                            "hidden": false,
                            "invisible": false,
                            "ParentLocation": {
                                "_media-type": "application\/vnd.ez.api.Location+json",
                                "_href": "\/api\/ezp\/v2\/content\/locations\/1\/2\/56"
                            },
                            "pathString": "\/1\/2\/56\/57\/",
                            "depth": 3,
                            "childCount": 0,
                            "remoteId": "60d1ad39495c7fc3f2740cf1c063c9cc",
                            "Content": {
                                "_media-type": "application\/vnd.ez.api.Content+json",
                                "_href": "\/api\/ezp\/v2\/content\/objects\/55"
                            },
                            "sortField": "PATH",
                            "sortOrder": "ASC"
                        },
                        {
                            "_media-type": "application\/vnd.ez.api.TrashItem+json",
                            "_href": "\/api\/ezp\/v2\/content\/trash\/59",
                            "id": 59,
                            "priority": 0,
                            "hidden": false,
                            "invisible": false,
                            "ParentLocation": {
                                "_media-type": "application\/vnd.ez.api.Location+json",
                                "_href": "\/api\/ezp\/v2\/content\/locations\/1\/2\/58"
                            },
                            "pathString": "\/1\/2\/58\/59\/",
                            "depth": 3,
                            "childCount": 0,
                            "remoteId": "cf2aed3abd51a871f820063dcc690cf3",
                            "Content": {
                                "_media-type": "application\/vnd.ez.api.Content+json",
                                "_href": "\/api\/ezp\/v2\/content\/objects\/57"
                            },
                            "sortField": "PATH",
                            "sortOrder": "ASC"
                        },
                        {
                            "_media-type": "application\/vnd.ez.api.TrashItem+json",
                            "_href": "\/api\/ezp\/v2\/content\/trash\/60",
                            "id": 60,
                            "priority": 0,
                            "hidden": false,
                            "invisible": false,
                            "ParentLocation": {
                                "_media-type": "application\/vnd.ez.api.Location+json",
                                "_href": "\/api\/ezp\/v2\/content\/locations\/1\/2"
                            },
                            "pathString": "\/1\/2\/60\/",
                            "depth": 2,
                            "childCount": 0,
                            "remoteId": "d3bae4d508a8c30f7103834fd9194488",
                            "Content": {
                                "_media-type": "application\/vnd.ez.api.Content+json",
                                "_href": "\/api\/ezp\/v2\/content\/objects\/58"
                            },
                            "sortField": "PATH",
                            "sortOrder": "ASC"
                        },
                        {
                            "_media-type": "application\/vnd.ez.api.TrashItem+json",
                            "_href": "\/api\/ezp\/v2\/content\/trash\/61",
                            "id": 61,
                            "priority": 0,
                            "hidden": false,
                            "invisible": false,
                            "ParentLocation": {
                                "_media-type": "application\/vnd.ez.api.Location+json",
                                "_href": "\/api\/ezp\/v2\/content\/locations\/1\/2\/60"
                            },
                            "pathString": "\/1\/2\/60\/61\/",
                            "depth": 3,
                            "childCount": 0,
                            "remoteId": "032f98c4c4d1d4c83ef36122fdcace56",
                            "Content": {
                                "_media-type": "application\/vnd.ez.api.Content+json",
                                "_href": "\/api\/ezp\/v2\/content\/objects\/59"
                            },
                            "sortField": "PATH",
                            "sortOrder": "ASC"
                        },
                        {
                            "_media-type": "application\/vnd.ez.api.TrashItem+json",
                            "_href": "\/api\/ezp\/v2\/content\/trash\/62",
                            "id": 62,
                            "priority": 0,
                            "hidden": false,
                            "invisible": false,
                            "ParentLocation": {
                                "_media-type": "application\/vnd.ez.api.Location+json",
                                "_href": "\/api\/ezp\/v2\/content\/locations\/1\/2\/60\/61"
                            },
                            "pathString": "\/1\/2\/60\/61\/62\/",
                            "depth": 4,
                            "childCount": 0,
                            "remoteId": "f0afe76d19c8b6c572ab891cabbedc11",
                            "Content": {
                                "_media-type": "application\/vnd.ez.api.Content+json",
                                "_href": "\/api\/ezp\/v2\/content\/objects\/60"
                            },
                            "sortField": "PATH",
                            "sortOrder": "ASC"
                        },
                        {
                            "_media-type": "application\/vnd.ez.api.TrashItem+json",
                            "_href": "\/api\/ezp\/v2\/content\/trash\/63",
                            "id": 63,
                            "priority": 0,
                            "hidden": false,
                            "invisible": false,
                            "ParentLocation": {
                                "_media-type": "application\/vnd.ez.api.Location+json",
                                "_href": "\/api\/ezp\/v2\/content\/locations\/1\/2\/60\/61"
                            },
                            "pathString": "\/1\/2\/60\/61\/63\/",
                            "depth": 4,
                            "childCount": 0,
                            "remoteId": "2201a0b2f093355651812e8649e9cccb",
                            "Content": {
                                "_media-type": "application\/vnd.ez.api.Content+json",
                                "_href": "\/api\/ezp\/v2\/content\/objects\/61"
                            },
                            "sortField": "PATH",
                            "sortOrder": "ASC"
                        }
                    ]
                }
            }};

            this.contentServiceMock = new Mock();
            Mock.expect(this.contentServiceMock, {
                method: "loadTrashItems",
                args: [-1, 0, Mock.Value.Function],
                run: Y.bind(function (limit, offset, callback) {
                    callback(false, this.trashResponse);
                }, this),
            });

            this.apiCallback = function (options, callback) {
                Assert.isNotNull(options.api, "API should be available in options");
                callback();
            };

            this.apiCallbackError = function (options, callback) {
                Assert.isNotNull(options.api, "API should be available in options");
                callback(true);
            };

            this.contentInfoModelConstructor = function () {};
            this.contentInfoModelConstructor.prototype.set = function () {};
            this.contentInfoModelConstructor.prototype.get = function () {
                return {ContentType: "truc"};
            };
            this.contentInfoModelConstructor.prototype.load = this.apiCallback;

            this.contentTypeModelConstructor = function () {};
            this.contentTypeModelConstructor.prototype.set = function () {};
            this.contentTypeModelConstructor.prototype.load = this.apiCallback;

            this.locationModelConstructor = function () {};
            this.locationModelConstructor.prototype.set = function () {};
            this.locationModelConstructor.prototype.load = this.apiCallback;
            this.locationModelConstructor.prototype.loadPath = this.apiCallback;

            this.trashItemModelConstructor = function () {};
            this.trashItemModelConstructor.prototype.loadFromHash = function (hash) {
                Assert.isObject(hash, "Hash should be an object");
            };

            this.capiMock = new Mock();
            Mock.expect(this.capiMock, {
                method: "getContentService",
                args: [],
                returns: this.contentServiceMock,
            });

            this.service = new Y.eZ.TrashViewService({
                capi: this.capiMock,
                contentInfoModelConstructor: this.contentInfoModelConstructor,
                contentTypeModelConstructor: this.contentTypeModelConstructor,
                locationModelConstructor: this.locationModelConstructor,
                trashItemModelConstructor: this.trashItemModelConstructor,
            });
        },

        tearDown: function () {
            this.service.destroy();
            delete this.service;
        },

        "Should load the trashItems": function () {
            var nbParentNotInTrash = 0;

            this.locationModelConstructor.prototype.load = function( options, callback ) {
                Assert.isNotNull(options.api, "API should be available in options");
                nbParentNotInTrash++;
                callback();
            };

            this.service.load(function(){});

            Assert.areSame(
                9,
                this.service._getViewParameters().trashItems.length,
                "TrashItems should contain 9 items"
            );

            Y.Array.each(this.service.get('trashItems'), Y.bind(function (item){
                this._assertTrashItem(item);
            },this));

            Assert.areSame(
                5,
                nbParentNotInTrash,
                "5 items have parents not in trash"
            );
        },

        _assertTrashItem: function (item) {
            Assert.isInstanceOf(
                this.trashItemModelConstructor,
                item.item,
                'Item should contain a trashItem'
            );
            Assert.isInstanceOf(
                this.contentInfoModelConstructor,
                item.contentInfo,
                'Item should contain a contentInfo'
            );
            Assert.isInstanceOf(
                this.locationModelConstructor,
                item.parentLocation,
                'Item should contain a parent location'
            );
            Assert.isInstanceOf(
                this.contentTypeModelConstructor,
                item.contentType,
                'Item should contain a contentType'
            );
        },

        "Should error on loading trashItems": function () {
            Mock.expect(this.contentServiceMock, {
                method: "loadTrashItems",
                args: [-1, 0, Mock.Value.Function],
                run: Y.bind(function (limit, offset, callback) {
                    callback(true, this.trashResponse);
                }, this),
            });

            this.service.load(function(){});

            Assert.areSame(
                0,
                this.service.get('trashItems').length,
                "TrashItems should be empty"
            );
        },

        _testItemsLoadError: function () {
            var errorFired = false;

            this.contentInfoModelConstructor.prototype.load = this.apiCallbackError;

            this.service.on('error', function () {
                errorFired = true;
            });

            this.service.load(function(){});

            Assert.isTrue(
                errorFired,
                "An error should have been fired"
            );
        },

        "Should error on loading contentInfo": function () {
            this.contentInfoModelConstructor.prototype.load = this.apiCallbackError;
            this._testItemsLoadError();
        },

        "Should error on loading contentType": function () {
            this.contentTypeModelConstructor.prototype.load = this.apiCallbackError;
            this._testItemsLoadError();
        },

        "Should error on loading parent location": function () {
            this.locationModelConstructor.prototype.load = this.apiCallbackError;
            this._testItemsLoadError();
        },

        "Should error on loading parent location path": function () {
            this.locationModelConstructor.prototype.loadPath = this.apiCallbackError;
            this._testItemsLoadError();
        },
    });


    Y.Test.Runner.setName("eZ Location Trash View Service tests");
    Y.Test.Runner.add(serviceTest);

}, '', {requires: ['test', 'ez-trashviewservice']});
