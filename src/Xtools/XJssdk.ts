interface SignPackage {
    appId:string;
    nonceStr:string;
    timestamp:number;
    signature:string;
    url:string;
}

module xtools {
    export class XJssdk extends egret.Sprite{
        public CLASS_NAME:string = "xtools.XJssdk";

        private title:string;
        private desc:string;
        private link:string;
        private imgUrl:string;

        private loader:egret.URLLoader;
        private signPackage:SignPackage;
        private url:string;

        private JsonpReq:JsonpReq;

        public constructor() {
            super();
            this.init();
        }

        /**
         * 初始化
         **/
        public init() {
            let jssdkConfig = Config.JSSDK;

            this.title = jssdkConfig.title;
            this.desc = jssdkConfig.desc;
            this.link = jssdkConfig.link;
            this.imgUrl = jssdkConfig.imgUrl;

            this.url = jssdkConfig.apiUrl+"?url="+encodeURIComponent(location.href.split('#')[0]);

            if(!this.signPackage){
                this.getSignPackage();
            }else{
                this.initWxConfig();
            }
        }


        private getSignPackage(){
            var para = "callback";
            var self = this;
            this.loader = new egret.URLLoader();
            var req:egret.URLRequest = new egret.URLRequest(this.url + "&" + para + "=");
            this.loader._request = req;
            this.JsonpReq = new JsonpReq();
            this.JsonpReq.process(this.loader);
            
            this.loader.addEventListener(egret.Event.COMPLETE, (e)=> {
                //this.signPackage = <SignPackage>JSON.parse(e.target.data);
                this.signPackage = e.target.data;
                this.initWxConfig();
            }, this);
        }

        private initWxConfig() {
            let self = this;
            if(wx) {
                var bodyConfig:BodyConfig = new BodyConfig();
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
        }


        private getWeiXinShareTimeline() {

            var bodyMenuShareTimeline = new BodyMenuShareTimeline();
            bodyMenuShareTimeline.title = this.title;
            bodyMenuShareTimeline.link = this.link;
            bodyMenuShareTimeline.imgUrl = this.imgUrl;
            bodyMenuShareTimeline.trigger = ()=> {
                //alert('用户点击分享到朋友圈');
            };
            bodyMenuShareTimeline.success = ()=> {
                //alert('已分享');
            };
            bodyMenuShareTimeline.cancel = ()=> {
                //alert('已取消');
            };
            bodyMenuShareTimeline.fail = (res)=> {
                alert(JSON.stringify(res));
            };
            wx.onMenuShareTimeline(bodyMenuShareTimeline);
        }

        /**
         * 获取微信分享到朋友
         */
        private getWeiXinShareAppMessage(){
            var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
            bodyMenuShareAppMessage.title = this.title;
            bodyMenuShareAppMessage.desc = this.desc;
            bodyMenuShareAppMessage.link = this.link;
            bodyMenuShareAppMessage.imgUrl = this.imgUrl;
            bodyMenuShareAppMessage.trigger = ()=> {
                //alert('用户点击发送给朋友');
            };
            bodyMenuShareAppMessage.success = ()=> {
                //alert('已分享');
            };
            bodyMenuShareAppMessage.cancel = ()=> {
                //alert('已取消');
            };
            bodyMenuShareAppMessage.fail = (res)=> {
                //alert(JSON.stringify(res));
            };
            wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
        }

        /**
         * 获取微信分享到QQ
         */
        private getWeiXinShareQQ(){
            var bodyMenuShareQQ = new BodyMenuShareQQ();
            bodyMenuShareQQ.title = this.title;
            bodyMenuShareQQ.desc = this.desc;
            bodyMenuShareQQ.link = this.link;
            bodyMenuShareQQ.imgUrl = this.imgUrl;
            bodyMenuShareQQ.trigger = ()=> {
                //alert('用户点击分享到QQ');
            };
            bodyMenuShareQQ.complete = (res)=> {
                //alert(JSON.stringify(res));
            };
            bodyMenuShareQQ.success = ()=> {
                //alert('已分享');
            };
            bodyMenuShareQQ.cancel = ()=> {
                //alert('已取消');
            };
            bodyMenuShareQQ.fail = (res)=> {
                //alert(JSON.stringify(res));
            };
            wx.onMenuShareQQ(bodyMenuShareQQ);
        }

        /**
         * 获取微信分享到腾讯微博
         */
        private getWeiXinShareWeiBo(){
            var bodyMenuShareWeibo = new BodyMenuShareWeibo();
            bodyMenuShareWeibo.title = this.title;
            bodyMenuShareWeibo.desc = this.desc;
            bodyMenuShareWeibo.link = this.link;
            bodyMenuShareWeibo.imgUrl = this.imgUrl;
            bodyMenuShareWeibo.trigger = ()=> {
                //alert('用户点击分享到微博');
            };
            bodyMenuShareWeibo.complete = (res)=> {
                //alert(JSON.stringify(res));
            };
            bodyMenuShareWeibo.success = ()=> {
                //alert('已分享');
            };
            bodyMenuShareWeibo.cancel = ()=> {
                //alert('已取消');
            };
            bodyMenuShareWeibo.fail = (res)=> {
                alert(JSON.stringify(res));
            };
            wx.onMenuShareWeibo(bodyMenuShareWeibo);
        }

        /**
         * 批量显示菜单项
         */
        private getWeixinShowMenuItems(arr_menu:any[]=null) {
            var _arr_menu: any[] = [
                //传播类
                "menuItem:share:appMessage",//发送给朋友
                "menuItem:share:timeline",//分享到朋友圈
                "menuItem:share:qq",//分享到QQ
                "menuItem:share:weiboApp",//分享到Weibo
                "menuItem:favorite",//收藏
                "menuItem:share:facebook",//分享到FB
                "menuItem:share:QZone",//分享到 QQ 空间

                //保护类
                "menuItem:editTag",//编辑标签
                "menuItem:delete",//删除
                "menuItem:copyUrl",//复制链接
                "menuItem:originPage",//原网页
                "menuItem:readMode",//阅读模式
                "menuItem:openWithQQBrowser",//在QQ浏览器中打开
                "menuItem:openWithSafari",//在Safari中打开
                "menuItem:share:email",//邮件
                "menuItem:share:brand" //一些特殊公众号
            ];
            if(arr_menu != null) {
                _arr_menu = arr_menu;
            }
            wx.showMenuItems({
                menuList:_arr_menu,
                success: (res) => {
                    //alert('已显示“分享到朋友圈”等按钮');
                },
                fail: (res) => {
                    //alert(JSON.stringify(res));
                }
            });
        }

        /**
         * 批量隐藏菜单项
         */
        private getWeixinHideMenuItems(arr_menu:any[]=null) {
            var _arr_menu: any[] = [
                //传播类
                "menuItem:share:appMessage",//发送给朋友
                "menuItem:share:timeline",//分享到朋友圈
                "menuItem:share:qq",//分享到QQ
                "menuItem:share:weiboApp",//分享到Weibo
                "menuItem:favorite",//收藏
                "menuItem:share:facebook",//分享到FB
                "menuItem:share:QZone",//分享到 QQ 空间

                //保护类
                "menuItem:editTag",//编辑标签
                "menuItem:delete",//删除
                "menuItem:copyUrl",//复制链接
                "menuItem:originPage",//原网页
                "menuItem:readMode",//阅读模式
                "menuItem:openWithQQBrowser",//在QQ浏览器中打开
                "menuItem:openWithSafari",//在Safari中打开
                "menuItem:share:email",//邮件
                "menuItem:share:brand" //一些特殊公众号
            ];
            if(arr_menu != null) {
                _arr_menu = arr_menu;
            }
            wx.hideMenuItems({
                menuList:_arr_menu,
                success: (res) => {
                    //alert('已隐藏所有传播和保护类按钮');
                },
                fail: (res) => {
                    alert(JSON.stringify(res));
                }
            });
        }

    }
}