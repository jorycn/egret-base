var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 基于 egret.HttpRequest 封装的 Http 类，主要用来进行网络请求封装
 * post/get 方法返回的都是 promise 对象，可以支持新的 promise/await 新的语法。
 *
 * 使用方法：
 * let res = await new Http().post('/api/test', {id: 1});
 */
var HttpBase = (function () {
    /**
     * 构造函数
     */
    function HttpBase() {
        this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.setRequestHeader("X-XSRF-TOKEN", Cookie.getcooke('XSRF-TOKEN') || '');
        return this;
    }
    /**
     * post 方法
     * @param url 一个用来包含发送请求的 url 字符串
     * @param param 发送到服务器的数据
     */
    HttpBase.prototype.post = function (url, param, cb) {
        if (param === void 0) { param = {}; }
        this.request.open(this.getUrl(url), egret.HttpMethod.POST);
        this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this.request.send(this.formatPostData(param));
        this.request.addEventListener(egret.Event.COMPLETE, function (e) {
            var request = e.currentTarget;
            cb(JSON.parse(request.response));
        }, this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) {
            alert('网络错误，请稍后重试!');
        }, this);
    };
    /**
     * get 方法
     * @param url 一个用来包含发送请求的 url 字符串
     * @param param 发送到服务器的数据
     */
    HttpBase.prototype.get = function (url, param, cb) {
        if (param === void 0) { param = {}; }
        var getData = this.formatPostData(param), real_url = this.getUrl(url);
        if (getData != '') {
            real_url += "?" + getData;
        }
        this.request.open(real_url, egret.HttpMethod.GET);
        this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this.request.send();
        this.request.addEventListener(egret.Event.COMPLETE, function (e) {
            var request = e.currentTarget;
            cb(JSON.parse(request.response));
        }, this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) {
            alert('网络错误，请稍后重试!');
        }, this);
    };
    /**
     * 获取完整 url 路径，（主要用来区别本地环境还是什么环境的）
     * @param url 一个用来包含发送请求的 url 字符串
     */
    HttpBase.prototype.getUrl = function (url) {
        if (typeof HttpBase.domain === 'string' && HttpBase.domain.length > 0) {
            return "http://" + HttpBase.domain;
        }
        else if (typeof HttpBase.domain === 'function') {
            var domain = HttpBase.domain();
            if (!domain || domain === '')
                return url;
            return "http://" + domain + url;
        }
        else {
            return url;
        }
    };
    /**
     * 设置请求的域名
     */
    HttpBase.setDomain = function (domain) {
        if (typeof domain === 'string' || typeof domain === 'function') {
            HttpBase.domain = domain;
        }
        else {
            console.log('setDomain 的参数 domain 必须是一个字符串或者函数');
        }
    };
    /**
     * 格式化传参, eg: {p1: a, p2: b}  ==>  'p1=a&p2=b'
     * @param param 发送到服务器的数据
     */
    HttpBase.prototype.formatPostData = function (param) {
        var arr = [], val = '';
        for (var key in param) {
            // 如果是数组，或者是对象，则进行 JSON.stringify
            if (typeof param[key] == 'object') {
                try {
                    val = JSON.stringify(param[key]);
                }
                catch (e) {
                    console.log("Http.formatPostData \u53C2\u6570\u5F02\u5E38: ", param);
                    val = '';
                }
                arr.push(key + "=" + val);
            }
            else {
                arr.push(key + "=" + param[key]);
            }
        }
        if (arr.length <= 0)
            return '';
        return arr.join('&');
    };
    /**
     * 域名
     */
    HttpBase.domain = null;
    return HttpBase;
}());
__reflect(HttpBase.prototype, "HttpBase");
//# sourceMappingURL=HttpBase.js.map