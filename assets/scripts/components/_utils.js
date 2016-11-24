/**
 * [LocalStorage basic functions DRYed]
 */
var LS = function() {

    return {
        get: function(key, parse = false) {
            return parse ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key);
        },

        set: function(key, value, stringify = false) {
            return stringify ? localStorage.setItem(key, JSON.stringify(value)) : localStorage.setItem(key, value);
        },

        remove: function(key, value) {
            return localStorage.removeItem(key);
        }
    }
}();


/**
 * [Is not jQuery x)]
 */
var Ajx = function() {
    var xhr = null;

    return {
        getJSON: function(method, url) {
            return new Promise(function (resolve, reject) {

                if (xhr != null) {
                    xhr.abort();
                } else {
                    xhr = new XMLHttpRequest();
                }

                xhr.open(method, url);
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.onerror = function () {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                };
                xhr.send();
            });
        }
    }

}();
