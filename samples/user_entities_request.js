/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
'use strict';

// var apiai = require("../module/apiai");
var apiai = require("apiai");

var app = apiai("YOUR_ACCESS_TOKEN");

var sessionId = "Some unique sessionId";

var user_entities = [{
    name: 'Application',
    extend: false,
    entries: [
        {
            value: 'Firefox',
            synonyms: ['Firefox']
        },
        {
            value: 'XCode',
            synonyms: ['XCode']
        },
        {
            value: 'Sublime Text',
            synonyms: ['Sublime Text']
        }
    ]
}];

var user_entities_body = {
    sessionId: sessionId,
    entities: user_entities
};

var user_entities_request = app.userEntitiesRequest(user_entities_body);

user_entities_request.on('response', function(response) {
    console.log('User entities response: ');
    console.log(JSON.stringify(response, null, 4));

    var request = app.textRequest('open XCode', {sessionId: sessionId});

    request.on('response', function(response) {
        console.log('Query response: ');
        console.log(JSON.stringify(response, null, 4));
    });

    request.on('error', function(error) {
        console.log(error);
    });

    request.end();
});

user_entities_request.on('error', function(error) {
    console.log(error);
});

user_entities_request.end();
