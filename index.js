/*!
 Copyright (c) 2017 96qbhy.
 Licensed under the MIT License (MIT)
 */
/* global define */

(function () {
    'use strict';

    var axios = window.axios || require('axios');

    function getResponse(data) {
        var response = data.data;
        if (response.code !== 'success') {
            throw new Error(response.msg);
        }
        return response;
    }

    function smms(file) {
        var data = new FormData();
        data.append('smfile', file);
        data.append('ssl', true);
        return axios.post('https://sm.ms/api/upload', data).then(getResponse);
    }

    smms.list = function () {
        return axios.get('https://sm.ms/api/list').then(getResponse);
    };

    smms.clear = function () {
        return axios.get('https://sm.ms/api/clear').then(getResponse);
    };

    smms.remove = function (hash) {
        return axios.get('https://sm.ms/api/delete/' + hash);
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = smms;
    } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        // register as 'smms', consistent with npm package name
        define('smms', [], function () {
            return smms;
        });
    } else {
        window.smms = smms;
    }
}());
