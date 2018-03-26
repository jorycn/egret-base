var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var Cookie;
(function (Cookie) {
    // 配置 tsconfig target lib es6
    var CookieError = (function (_super) {
        __extends(CookieError, _super);
        function CookieError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CookieError;
    }(Error));
    Cookie.CookieError = CookieError;
    __reflect(CookieError.prototype, "Cookie.CookieError");
    var daysToMillis = 24 * 60 * 60 * 1000; // tslint:disable-line:no-magic-numbers
    var checkCookieSupport = function (opts) {
        if (typeof document === 'undefined' && (!opts || !opts.silent)) {
            throw new CookieError('Document is not defined! Are you trying to use this on the server?');
        }
        return typeof document !== 'undefined';
    };
    var write = function (name, value, opts) {
        if (checkCookieSupport(opts)) {
            var date = new Date();
            var expires = !!opts && !!opts.days ? "; expires=" + date.setTime(date.getTime() + opts.days * daysToMillis) : '';
            var secure = !!opts && opts.secure ? '; secure' : '';
            var path = !!opts && opts.path ? "; path=" + opts.path : '';
            var domain = !!opts && opts.domain ? "; domain=" + opts.domain : '';
            document.cookie = encodeURIComponent(name) + "=" + value + expires + secure + path + domain;
            return true;
        }
        return false;
    };
    var get = function (name, opts) {
        if (checkCookieSupport(opts)) {
            var res = document.cookie.match("(?:^|; )" + encodeURIComponent(name) + "=([^;]*)");
            return res ? decodeURI(res[1]) : '';
        }
        return '';
    };
    var remove = function (name, opts) {
        return write(name, '', __assign({}, opts, { days: -1 }));
    };
    function setcooke(name, value, opts) {
        return write(name, value, opts);
    }
    Cookie.setcooke = setcooke;
    function getcooke(name, opts) {
        return get(name, opts);
    }
    Cookie.getcooke = getcooke;
    function removecookie(name, opts) {
        return remove(name, opts);
    }
    Cookie.removecookie = removecookie;
})(Cookie || (Cookie = {}));
//# sourceMappingURL=Cookie.js.map