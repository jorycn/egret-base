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
var xtools;
(function (xtools) {
    var XJssdk = (function (_super) {
        __extends(XJssdk, _super);
        function XJssdk() {
            var _this = _super.call(this) || this;
            _this.CLASS_NAME = "xtools.XJssdk";
            _this.init();
            return _this;
        }
        /**
         * 初始化
         **/
        XJssdk.prototype.init = function () {
            var jssdkConfig = Config.JSSDK;
            this.title = jssdkConfig.title;
            this.desc = jssdkConfig.desc;
            this.link = jssdkConfig.link;
            this.imgUrl = jssdkConfig.imgUrl;
            this.url = jssdkConfig.apiUrl + "?url=" + encodeURIComponent(location.href.split('#')[0]);
            if (!this.signPackage) {
                this.getSignPackage();
            }
            else {
                this.initWxConfig();
            }
            console.log(this.title);
        };
        XJssdk.prototype.getSignPackage = function () {
            var _this = this;
            var para = "callback";
            var self = this;
            this.loader = new egret.URLLoader();
            var req = new egret.URLRequest(this.url + "&" + para + "=");
            this.loader._request = req;
            this.JsonpReq = new JsonpReq();
            this.JsonpReq.process(this.loader);
            this.loader.addEventListener(egret.Event.COMPLETE, function (e) {
                //this.signPackage = <SignPackage>JSON.parse(e.target.data);
                _this.signPackage = e.target.data;
                _this.initWxConfig();
            }, this);
        };
        XJssdk.prototype.initWxConfig = function () {
            var self = this;
            if (wx) {
                var bodyConfig = new BodyConfig();
                bodyConfig.debug = false;
                bodyConfig.appId = this.signPackage.appId;
                bodyConfig.timestamp = this.signPackage.timestamp;
                bodyConfig.nonceStr = this.signPackage.nonceStr;
                bodyConfig.signature = this.signPackage.signature;
                bodyConfig.jsApiList = [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ];
                wx.config(bodyConfig);
                wx.ready(function () {
                    /// 在这里调用微信相关功能的 API
                    self.getWeiXinShareTimeline();
                    self.getWeiXinShareAppMessage();
                    self.getWeiXinShareQQ();
                    self.getWeiXinShareWeiBo();
                    //this.getWeixinShowMenuItems(["menuItem:share:timeline"]);
                    //this.getWeixinHideMenuItems();
                    // 添加事件
                    GameLayerManager.gameLayer();
                    GameLayerManager.instance.loadLayer.dispatchEvent(new MainEvent(MainEvent.WXCOMP));
                });
            }
        };
        XJssdk.prototype.getWeiXinShareTimeline = function () {
            var bodyMenuShareTimeline = new BodyMenuShareTimeline();
            bodyMenuShareTimeline.title = this.title;
            bodyMenuShareTimeline.link = this.link;
            bodyMenuShareTimeline.imgUrl = this.imgUrl;
            bodyMenuShareTimeline.trigger = function () {
                //alert('用户点击分享到朋友圈');
            };
            bodyMenuShareTimeline.success = function () {
                //alert('已分享');
            };
            bodyMenuShareTimeline.cancel = function () {
                //alert('已取消');
            };
            bodyMenuShareTimeline.fail = function (res) {
                alert(JSON.stringify(res));
            };
            wx.onMenuShareTimeline(bodyMenuShareTimeline);
        };
        /**
         * 获取微信分享到朋友
         */
        XJssdk.prototype.getWeiXinShareAppMessage = function () {
            var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
            bodyMenuShareAppMessage.title = this.title;
            bodyMenuShareAppMessage.desc = this.desc;
            bodyMenuShareAppMessage.link = this.link;
            bodyMenuShareAppMessage.imgUrl = this.imgUrl;
            bodyMenuShareAppMessage.trigger = function () {
                //alert('用户点击发送给朋友');
            };
            bodyMenuShareAppMessage.success = function () {
                //alert('已分享');
            };
            bodyMenuShareAppMessage.cancel = function () {
                //alert('已取消');
            };
            bodyMenuShareAppMessage.fail = function (res) {
                //alert(JSON.stringify(res));
            };
            wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
        };
        /**
         * 获取微信分享到QQ
         */
        XJssdk.prototype.getWeiXinShareQQ = function () {
            var bodyMenuShareQQ = new BodyMenuShareQQ();
            bodyMenuShareQQ.title = this.title;
            bodyMenuShareQQ.desc = this.desc;
            bodyMenuShareQQ.link = this.link;
            bodyMenuShareQQ.imgUrl = this.imgUrl;
            bodyMenuShareQQ.trigger = function () {
                //alert('用户点击分享到QQ');
            };
            bodyMenuShareQQ.complete = function (res) {
                //alert(JSON.stringify(res));
            };
            bodyMenuShareQQ.success = function () {
                //alert('已分享');
            };
            bodyMenuShareQQ.cancel = function () {
                //alert('已取消');
            };
            bodyMenuShareQQ.fail = function (res) {
                //alert(JSON.stringify(res));
            };
            wx.onMenuShareQQ(bodyMenuShareQQ);
        };
        /**
         * 获取微信分享到腾讯微博
         */
        XJssdk.prototype.getWeiXinShareWeiBo = function () {
            var bodyMenuShareWeibo = new BodyMenuShareWeibo();
            bodyMenuShareWeibo.title = this.title;
            bodyMenuShareWeibo.desc = this.desc;
            bodyMenuShareWeibo.link = this.link;
            bodyMenuShareWeibo.imgUrl = this.imgUrl;
            bodyMenuShareWeibo.trigger = function () {
                //alert('用户点击分享到微博');
            };
            bodyMenuShareWeibo.complete = function (res) {
                //alert(JSON.stringify(res));
            };
            bodyMenuShareWeibo.success = function () {
                //alert('已分享');
            };
            bodyMenuShareWeibo.cancel = function () {
                //alert('已取消');
            };
            bodyMenuShareWeibo.fail = function (res) {
                alert(JSON.stringify(res));
            };
            wx.onMenuShareWeibo(bodyMenuShareWeibo);
        };
        /**
         * 批量显示菜单项
         */
        XJssdk.prototype.getWeixinShowMenuItems = function (arr_menu) {
            if (arr_menu === void 0) { arr_menu = null; }
            var _arr_menu = [
                //传播类
                "menuItem:share:appMessage",
                "menuItem:share:timeline",
                "menuItem:share:qq",
                "menuItem:share:weiboApp",
                "menuItem:favorite",
                "menuItem:share:facebook",
                "menuItem:share:QZone",
                //保护类
                "menuItem:editTag",
                "menuItem:delete",
                "menuItem:copyUrl",
                "menuItem:originPage",
                "menuItem:readMode",
                "menuItem:openWithQQBrowser",
                "menuItem:openWithSafari",
                "menuItem:share:email",
                "menuItem:share:brand" //一些特殊公众号
            ];
            if (arr_menu != null) {
                _arr_menu = arr_menu;
            }
            wx.showMenuItems({
                menuList: _arr_menu,
                success: function (res) {
                    //alert('已显示“分享到朋友圈”等按钮');
                },
                fail: function (res) {
                    //alert(JSON.stringify(res));
                }
            });
        };
        /**
         * 批量隐藏菜单项
         */
        XJssdk.prototype.getWeixinHideMenuItems = function (arr_menu) {
            if (arr_menu === void 0) { arr_menu = null; }
            var _arr_menu = [
                //传播类
                "menuItem:share:appMessage",
                "menuItem:share:timeline",
                "menuItem:share:qq",
                "menuItem:share:weiboApp",
                "menuItem:favorite",
                "menuItem:share:facebook",
                "menuItem:share:QZone",
                //保护类
                "menuItem:editTag",
                "menuItem:delete",
                "menuItem:copyUrl",
                "menuItem:originPage",
                "menuItem:readMode",
                "menuItem:openWithQQBrowser",
                "menuItem:openWithSafari",
                "menuItem:share:email",
                "menuItem:share:brand" //一些特殊公众号
            ];
            if (arr_menu != null) {
                _arr_menu = arr_menu;
            }
            wx.hideMenuItems({
                menuList: _arr_menu,
                success: function (res) {
                    //alert('已隐藏所有传播和保护类按钮');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        };
        return XJssdk;
    }(egret.Sprite));
    xtools.XJssdk = XJssdk;
    __reflect(XJssdk.prototype, "xtools.XJssdk");
})(xtools || (xtools = {}));
//# sourceMappingURL=XJssdk.js.map