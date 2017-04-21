var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GameContainer.prototype.onAddToStage = function (evt) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onAddToStage, this);
            this.init();
        };
        // 游戏场景初始化
        GameContainer.prototype.init = function () {
            // 首屏
            this.FrontPage = new game.FrontPage();
            this.addChild(this.FrontPage);
            this.FrontPage.addEventListener(GameEvent.GAME_START, this.gameStart, this);
            // 计时器
            this.timer = new egret.Timer(500, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.handTimer, this);
            // 游戏主界面
            this.MainPage = new game.MainPage();
            // 微信分享
            var self = this;
            setTimeout(function () {
                self.jssdk = new Jssdk(0, 0);
                self.addChild(self.jssdk);
            }, 200);
        };
        GameContainer.prototype.gameStart = function () {
            this.timer.start();
            this.removeChild(this.FrontPage);
            this.addChild(this.MainPage);
        };
        GameContainer.prototype.handTimer = function () {
            // 更新时间
            Store.setTime(Store.getTime() + 500);
            //更新时间显示
            this.MainPage.updateTime();
        };
        return GameContainer;
    }(egret.DisplayObjectContainer));
    game.GameContainer = GameContainer;
    __reflect(GameContainer.prototype, "game.GameContainer");
})(game || (game = {}));
//# sourceMappingURL=GameContainer.js.map