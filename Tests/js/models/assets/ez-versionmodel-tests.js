YUI.add('ez-versionmodel-tests', function (Y) {
    var modelTest, loadNewTest, updateTest, removeTest,
        restResponse = {
            "Version": {
                "_media-type": "application/vnd.ez.api.Version+json",
                "_href": "/api/ezp/v2/content/objects/4242/versions/3",
                "VersionInfo": {
                    "id": "42",
                    "versionNo": 3,
                    "status": "DRAFT",
                    "modificationDate": "2014-02-25T14:12:04+01:00",
                    "Creator": {
                        "_media-type": "application/vnd.ez.api.User+json",
                        "_href": "/api/ezp/v2/user/users/14"
                    },
                    "creationDate": "2014-02-25T14:12:04+01:00",
                    "initialLanguageCode": "eng-GB",
                    "languageCodes": "eng-GB",
                    "names": {
                        "value": [
                            {
                                "_languageCode": "eng-GB",
                                "#text": "T11"
                            }
                        ]
                    },
                    "Content": {
                        "_media-type": "application/vnd.ez.api.ContentInfo+json",
                        "_href": "/api/ezp/v2/content/objects/4242"
                    }
                },
                "Fields": {
                    "field": [
                        {
                            "id": 978,
                            "fieldDefinitionIdentifier": "name",
                            "languageCode": "eng-GB",
                            "fieldValue": "T11"
                        },
                        {
                            "id": 979,
                            "fieldDefinitionIdentifier": "text",
                            "languageCode": "eng-GB",
                            "fieldValue": "Once and for all"
                        }
                    ]
                },
                "Relations": {
                    "_media-type": "application/vnd.ez.api.RelationList+json",
                    "_href": "/api/ezp/v2/content/objects/4242/versiaons/3/relations",
                    "Relation": []
                }
            }
        };

    modelTest = new Y.Test.Case(Y.merge(Y.eZ.Test.ModelTests, {
        name: "eZ Version Model tests",

        _should: {
            ignore: {
                "Sync action other than 'read' are not supported": true
            }
        },

        init: function () {
            this.capiMock = new Y.Mock();
            this.capiGetService = 'getContentService';
            this.serviceMock = new Y.Mock();
            this.serviceLoad = 'loadContent';
            this.rootProperty = "Version.VersionInfo";
            this.parsedAttributeNumber = Y.eZ.Version.ATTRS_REST_MAP.length + 1 + 2; // links + "manually" parsed fields
            this.loadResponse = restResponse;
        },


        setUp: function () {
            this.model = new Y.eZ.Version();
        },

        tearDown: function () {
            this.model.destroy();
            delete this.model;
        },

        "'xxxx' sync operation is not supported": function () {
            this._testUnsupportedSyncOperation('xxxx');
        },

        "Should read the fields": function () {
            var m = this.model,
                response = {
                    body: Y.JSON.stringify(this.loadResponse),
                    document: this.loadResponse
                },
                fields, res;

            res = m .parse(response);
            fields = res.fields;

            Y.Assert.areEqual(
                this.loadResponse.Version.Fields.field.length,
                Y.Object.size(fields),
                "The fields from the current version should all be imported"
            );
            Y.Assert.areEqual(
                this.loadResponse.Version.Fields.field[0].id,
                fields.name.id,
                "The name field should have been imported"
            );

            Y.Assert.areEqual(
                this.loadResponse.Version.Fields.field[1].id,
                fields.text.id,
                "The text field should have been imported"
            );
        },

        "Should return the fields": function () {
            var m = this.model,
                fields = {
                    'test': {'id': 42},
                    'test2': {'id': 43}
                };
            m.set('fields', fields);

            Y.Assert.areEqual(
                fields.test.id,
                m.getField('test').id
            );
            Y.Assert.areEqual(
                fields.test2.id,
                m.getField('test2').id
            );
            Y.Assert.isUndefined(
                m.getField('doesnotexist')
            );
        }
    }));

    loadNewTest = new Y.Test.Case({
        name: "eZ Version Model loadNew tests",

        setUp: function () {
            this.contentId = "/ezp/api/content/objects/4242";
            this.version = new Y.eZ.Version({
                id: this.contentId + "/version/2",
                versionId: "42",
                versionNo: 2
            });
            this.createDraftResponse = restResponse;
            this.capiMock = new Y.Mock();
            this.contentService = new Y.Mock();

            Y.Mock.expect(this.capiMock, {
                method: 'getContentService',
                returns: this.contentService,
            });
        },

        tearDown: function () {
            this.version.destroy();
            delete this.version;
        },

        "Should create a new version": function () {
            Y.Mock.expect(this.contentService, {
                method: 'createContentDraft',
                args: [Y.Mock.Value.String, Y.Mock.Value.Function],
                run: function (contentId, cb) {
                    Y.Assert.areEqual(
                        loadNewTest.contentId,
                        contentId,
                        "The content id should be used to create a new version"
                    );
                    cb(false, {
                        body: Y.JSON.stringify(loadNewTest.createDraftResponse),
                        document: loadNewTest.createDraftResponse
                    });
                }
            });

            this.version.loadNew({
                api: this.capiMock,
                contentId: this.contentId,
            }, function (error) {
                Y.Assert.isTrue(
                    !error,
                    "No error should be detected"
                );

                Y.Assert.areEqual(
                    loadNewTest.createDraftResponse.Version.VersionInfo.versionNo,
                    loadNewTest.version.get('versionNo'),
                    "The new version should have been created and parsed"
                );
            });
        },

        "Should keep the version intact in case of error": function () {
            var origVersionJSON = this.version.toJSON(),
                capiError = {message: 'capi error'};

            Y.Mock.expect(this.contentService, {
                method: 'createContentDraft',
                args: [Y.Mock.Value.String, Y.Mock.Value.Function],
                run: function (contentId, cb) {
                    Y.Assert.areEqual(
                        loadNewTest.contentId,
                        contentId,
                        "The content id should be used to create a new version"
                    );
                    cb(capiError);
                }
            });

            this.version.loadNew({
                api: this.capiMock,
                contentId: this.contentId
            }, function (error) {
                Y.Assert.areSame(
                    capiError,
                    error,
                    "The error from the CAPI should passed to the callback"
                );
                Y.Assert.areEqual(
                    Y.JSON.stringify(origVersionJSON),
                    Y.JSON.stringify(loadNewTest.version.toJSON()),
                    "The version should be left intact"
                );
            });
        },

    });

    removeTest = new Y.Test.Case({
        name: "eZ Version Model remove tests",

        setUp: function () {
            this.contentId = "/ezp/api/content/objects/4242";
            this.versionId = "42";
            this.version = new Y.eZ.Version();
            this.version.setAttrs({
                id: this.contentId + "/version/2",
                versionId: this.versionId,
                versionNo: 2
            });
            this.capiMock = new Y.Mock();
            this.contentService = new Y.Mock();

            Y.Mock.expect(this.capiMock, {
                method: 'getContentService',
                returns: this.contentService,
            });
        },

        tearDown: function () {
            this.version.destroy();
            delete this.version;
        },

        "Should delete the version in the repository": function () {
            var version = this.version;

            Y.Mock.expect(this.contentService, {
                method: 'deleteVersion',
                args: [this.version.get('id'), Y.Mock.Value.Function],
                run: function (id, callback) {
                    callback();
                }
            });

            this.version.destroy({
                remove: true,
                api: this.capiMock
            }, function (error) {
                Y.Assert.isFalse(!!error, "The destroy callback should be called without error");
                Y.Assert.areEqual(
                    "", version.get('versionId'),
                    "The version object should reseted"
                );
            });

            Y.Mock.verify(this.contentService);
        },

        "Should handle the error while deleting the version": function () {
            var version = this.version,
                versionId = this.versionId;

            Y.Mock.expect(this.contentService, {
                method: 'deleteVersion',
                args: [this.version.get('id'), Y.Mock.Value.Function],
                run: function (id, callback) {
                    callback(true);
                }
            });

            this.version.destroy({
                remove: true,
                api: this.capiMock
            }, function (error) {
                Y.Assert.isTrue(!!error, "The destroy callback should be called with an error");

                Y.Assert.areEqual(
                    versionId, version.get('versionId'),
                    "The version object should be left intact"
                );
            });

            Y.Mock.verify(this.contentService);
        },
    });

    updateTest = new Y.Test.Case({
        name: "eZ Version Model update tests",

        setUp: function () {
            this.contentId = "/ezp/api/content/objects/4242";
            this.version = new Y.eZ.Version({
                id: this.contentId + "/version/2",
                versionId: "42",
                versionNo: 2
            });
            this.origVersionJSON = this.version.toJSON();
            this.saveResponse = restResponse;
            this.capiMock = new Y.Mock();
            this.contentService = new Y.Mock();

            Y.Mock.expect(this.capiMock, {
                method: 'getContentService',
                returns: this.contentService,
            });

            Y.Mock.expect(this.contentService, {
                method: 'newContentUpdateStruct',
                args: ['eng-GB'],
                returns: {
                    "body": {
                        "VersionUpdate": {
                            "fields": {
                                "field": []
                            }
                        }
                    }
                }
            });
        },

        tearDown: function () {
            this.version.destroy();
            delete this.version;
        },

        "Should update the version with the provided fields": function () {
            var fields = [{}, {}];

            Y.Mock.expect(this.contentService, {
                method: 'updateContent',
                args: [this.version.get('id'), Y.Mock.Value.Object, Y.Mock.Value.Function],
                run: function (id, struct, callback) {
                    Y.Assert.areSame(
                        fields,
                        struct.body.VersionUpdate.fields.field,
                        "The field should be added to update struct"
                    );
                    callback(false, {
                        body: Y.JSON.stringify(updateTest.saveResponse),
                        document: updateTest.saveResponse
                    });
                }
            });

            this.version.save({
                api: this.capiMock,
                fields: fields
            }, function (error) {
                Y.Assert.isTrue(
                    !error, "No error should be detected"
                );
                Y.Assert.areEqual(
                    updateTest.saveResponse.Version.VersionInfo.versionNo,
                    updateTest.version.get('versionNo'),
                    "The version should have been updated with the response"
                );
                Y.Assert.areEqual(
                    updateTest.saveResponse.Version.VersionInfo.status,
                    updateTest.version.get('status'),
                    "The version status should be published"
                );
            });
        },

        "Should update and publish the content": function () {
            var fields = [{}, {}];

            Y.Mock.expect(this.contentService, {
                method: 'updateContent',
                args: [this.version.get('id'), Y.Mock.Value.Object, Y.Mock.Value.Function],
                run: function (id, struct, callback) {
                    Y.Assert.areSame(
                        fields,
                        struct.body.VersionUpdate.fields.field,
                        "The field should be added to update struct"
                    );
                    callback(false, {
                        body: Y.JSON.stringify(updateTest.saveResponse),
                        document: updateTest.saveResponse
                    });
                }
            });

            Y.Mock.expect(this.contentService, {
                method: 'publishVersion',
                args: [this.version.get('id'), Y.Mock.Value.Function],
                run: function (id, callback) {
                    callback(false, {});
                }
            });

            this.version.save({
                api: this.capiMock,
                fields: fields,
                publish: true
            }, function (error) {
                Y.Assert.isTrue(
                    !error, "No error should be detected"
                );
                Y.Assert.areEqual(
                    updateTest.saveResponse.Version.VersionInfo.versionNo,
                    updateTest.version.get('versionNo'),
                    "The version should have been updated with the response"
                );
                Y.Assert.areEqual(
                    "PUBLISHED",
                    updateTest.version.get('status'),
                    "The version should be published"
                );
            });
        },

        _testUpdateError: function (publish) {
            var fields = [{}, {}],
                updateError = {'message': 'update error'};

            Y.Mock.expect(this.contentService, {
                method: 'updateContent',
                args: [this.version.get('id'), Y.Mock.Value.Object, Y.Mock.Value.Function],
                run: function (id, struct, callback) {
                    Y.Assert.areSame(
                        fields,
                        struct.body.VersionUpdate.fields.field,
                        "The field should be added to update struct"
                    );
                    callback(updateError);
                }
            });

            this.version.save({
                api: this.capiMock,
                fields: fields,
                publish: publish
            }, function (error) {
                Y.Assert.areSame(
                    updateError,
                    error,
                    "The updateContent error should be provided"
                );

                Y.Assert.areEqual(
                    Y.JSON.stringify(updateTest.origVersionJSON),
                    Y.JSON.stringify(updateTest.version.toJSON()),
                    "The version should be left intact"
                );
            });
        },

        "Should handle the error when updating": function () {
            this._testUpdateError();
        },

        "Should handle the error when updating with publish option": function () {
            this._testUpdateError(true);
        },

        "Should handle the error when publishing": function () {
            var fields = [{}, {}],
                publishError = {message: 'publish error'};

            Y.Mock.expect(this.contentService, {
                method: 'updateContent',
                args: [this.version.get('id'), Y.Mock.Value.Object, Y.Mock.Value.Function],
                run: function (id, struct, callback) {
                    Y.Assert.areSame(
                        fields,
                        struct.body.VersionUpdate.fields.field,
                        "The field should be added to update struct"
                    );
                    callback(false, {
                        body: Y.JSON.stringify(updateTest.saveResponse),
                        document: updateTest.saveResponse
                    });
                }
            });

            Y.Mock.expect(this.contentService, {
                method: 'publishVersion',
                args: [this.version.get('id'), Y.Mock.Value.Function],
                run: function (id, callback) {
                    callback(publishError, {});
                }
            });

            this.version.save({
                api: this.capiMock,
                fields: fields,
                publish: true
            }, function (error) {
                Y.Assert.areSame(
                    publishError,
                    error,
                    "The updateContent error should be provided"
                );

                Y.Assert.areEqual(
                    Y.JSON.stringify(updateTest.origVersionJSON),
                    Y.JSON.stringify(updateTest.version.toJSON()),
                    "The version should be left intact"
                );
            });
        }

    });

    Y.Test.Runner.setName("eZ Version Model tests");
    Y.Test.Runner.add(modelTest);
    Y.Test.Runner.add(loadNewTest);
    Y.Test.Runner.add(updateTest);
    Y.Test.Runner.add(removeTest);

}, '', {requires: ['test', 'json', 'model-tests', 'ez-versionmodel', 'ez-restmodel']});
