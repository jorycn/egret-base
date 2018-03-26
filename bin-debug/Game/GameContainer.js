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
var game;
(function (game) {
    /**
     * 主游戏容器
     */
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GameContainer.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = Store.stageWidth;
            this.stageH = Store.stageHeight;
            // 主层
            GameLayerManager.gameLayer();
            this.mainLayer = GameLayerManager.instance.mainLayer;
            // 添加音乐
            var self = this;
            egret.setTimeout(function () {
                var jssdk = new xtools.XJssdk();
                // jssdk.addEventListener(SoundEvent.WXCOMP, self.playBgm, this);
                self.addChild(jssdk);
            }, this, 20);
            // Music.addToggle('bg_mp3','music_on_png', 'music_off_png', 671, 38);   
            // this.gameStart();
            this.mainLayer.touchEnabled = true;
            this.mainLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.aa, this);
        };
        GameContainer.prototype.aa = function () {
            Config.JSSDK.title = 'hello jory';
            var jssdk = new xtools.XJssdk();
            this.addChild(jssdk);
        };
        return GameContainer;
    }(egret.DisplayObjectContainer));
    game.GameContainer = GameContainer;
    __reflect(GameContainer.prototype, "game.GameContainer");
})(game || (game = {}));
//# sourceMappingURL=GameContainer.js.map