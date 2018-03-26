var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
    }
    Config.VERSION = '0.1.2';
    Config.API_HOST = 'http://yingxiaogame.daqinwang.cc';
    Config.GAME_ID = '10';
    Config.API_SUBMIT_SCORE = Config.API_HOST + '/wechat/game/submit_user_info/' + Config.GAME_ID;
    Config.API_TOPLIST = Config.API_HOST + '/wechat/game/ranking/' + Config.GAME_ID;
    Config.API_LOTTERY = Config.API_HOST + '/wechat/game/lottery/' + Config.GAME_ID;
    Config.JSSDK = {
        'apiUrl': 'http://yingxiaogame.daqinwang.cc/wechat/jsconfig',
        'title': '国网陕西电力新年登高',
        'desc': '国网陕西电力新年登高',
        'url': 'http://yingxiaogame.daqinwang.cc/wechat/game/index/10',
        'imgUrl': 'http://img1.gtimg.com/xian/pics/hv1/254/162/2261/147063089.jpg'
    };
    return Config;
}());
__reflect(Config.prototype, "Config");
//# sourceMappingURL=Config.js.map