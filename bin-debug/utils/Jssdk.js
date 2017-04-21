var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Jssdk = (function (_super) {
    __extends(Jssdk, _super);
    function Jssdk(myScore, giftid) {
        var _this = _super.call(this) || this;
        _this.CLASS_NAME = "Jssdk";
        _this.myScore = myScore;
        _this.giftid = giftid;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Jssdk.prototype.onAddToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    /**
     * 初始化
     **/
    Jssdk.prototype.init = function () {
        this.title = this.title ? this.title : "萌萌哒福鸡围堵大作战";
        this.desc = this.desc ? this.desc : "鞭炮响，新年到。萌萌哒福鸡又开始躲猫猫了，快来围住福鸡赢好运福袋。";
        this.link = this.link ? this.link : "http://oa.daqinwang.cc/lottery/3/index";
        this.imgUrl = this.imgUrl ? this.imgUrl : "http://mat1.gtimg.com/xian/cc/h5/zhuaji/icon.jpg";
        if (this.myScore > 0) {
            if (this.giftid == 0) {
                this.title = '我用了' + this.myScore + '步围住了福鸡，赢得新年好运福袋一个，你也快来参与围堵大作战吧。';
            }
            else if (this.giftid == 1) {
                this.title = '我用了' + this.myScore + '步围住了福鸡，赢得Q币10个，你也快来参与围堵大作战吧。';
            }
            else if (this.giftid == 2) {
                this.title = '我用了' + this.myScore + '步围住了福鸡，赢得生肖公仔一只，你也快来参与围堵大作战吧。';
            }
        }
        else {
            this.title = '萌萌哒福鸡围堵大作战';
        }
        this.url = "http://www.daqinwang.cc/api/default/sign?url=" + encodeURIComponent(location.href.split('#')[0]);
        this.getSignPackage();
    };
    Jssdk.prototype.getSignPackage = function () {
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
            //........................................................
            if (wx) {
                _this.getWeiXinConfig();
                wx.ready(function () {
                    /// 在这里调用微信相关功能的 API
                    self.getWeiXinShareTimeline();
                    self.getWeiXinShareAppMessage();
                    self.getWeiXinShareQQ();
                    self.getWeiXinShareWeiBo();
                    //this.getWeixinShowMenuItems(["menuItem:share:timeline"]);
                    //this.getWeixinHideMenuItems();
                });
            }
        }, this);
    };
    Jssdk.prototype.getWeiXinConfig = function () {
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
    };
    Jssdk.prototype.getWeiXinShareTimeline = function () {
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
    Jssdk.prototype.getWeiXinShareAppMessage = function () {
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
    Jssdk.prototype.getWeiXinShareQQ = function () {
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
    Jssdk.prototype.getWeiXinShareWeiBo = function () {
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
    Jssdk.prototype.getWeixinShowMenuItems = function (arr_menu) {
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
    Jssdk.prototype.getWeixinHideMenuItems = function (arr_menu) {
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
    return Jssdk;
}(egret.DisplayObjectContainer));
__reflect(Jssdk.prototype, "Jssdk");
//# sourceMappingURL=Jssdk.js.map