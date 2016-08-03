/**
 * @name        jquery.ajax.progress
 * @author      Sheng-Liang Slogar <slogar.sheng@gmail.com>
 * @version     1.0.0
 * @link        http://github.com/shengslogar/jquery.ajax.progress
 * @requires    jQuery
 */

(function ($) {

    // clone existing $.ajax function
    var _ajax = $.ajax;

    // overwrite existing $.ajax function
    $.ajax = function (_url, _params) {

        var params;

        // Input type 1: $.ajax([settings])
        if (typeof _url == "object")
            params = _url || {};
        // Input type 2: $.ajax(url[, settings])
        else {
            // _url overrides params.url
            params = $.extend(_params, {url: _url});
        }

        var xhrObj;

        // download progress queue
        var downloadProgressFuncs = [];

        // upload progress queue
        var uploadProgressFuncs = [];

        // extend $.ajax.xhr
        params.xhr = function () {
            var xhr = $.ajaxSettings.xhr();

            xhr.addEventListener("progress", function (e) {
                for (var i in downloadProgressFuncs) {
                    downloadProgressFuncs[i].apply(xhrObj, [e]);
                }
            });

            xhr.upload.addEventListener("progress", function (e) {
                for (var i in uploadProgressFuncs) {
                    uploadProgressFuncs[i].apply(xhrObj, [e]);
                }
            });

            return xhr;
        };

        xhrObj = _ajax(params);

        // add $.ajax().downloadProgress
        xhrObj.downloadProgress = function (func) {
            downloadProgressFuncs.push(func);

            // allow chaining
            return this;
        };

        // alias
        xhrObj.progress = xhrObj.downloadProgress;

        // add $.ajax().uploadProgress
        xhrObj.uploadProgress = function (func) {
            uploadProgressFuncs.push(func);

            // allow chaining
            return this;
        };

        return xhrObj;
    };
}(jQuery));