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
    var FrontPage = (function (_super) {
        __extends(FrontPage, _super);
        function FrontPage() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        FrontPage.prototype.init = function () {
            this.bg = game.createBitmapByName('bg_start_jpg');
            this.addChild(this.bg);
            this.btnStart = game.createBitmapByName('btn_start_png');
            this.btnStart.x = (Store.getStageWidth() - this.btnStart.width) / 2; //居中定位
            this.btnStart.y = 820;
            this.btnStart.touchEnabled = true; //开启触碰
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this); //点击按钮开始游戏
            this.addChild(this.btnStart);
        };
        FrontPage.prototype.gameStart = function () {
            this.dispatchEvent(new GameEvent(GameEvent.GAME_START));
        };
        return FrontPage;
    }(egret.Sprite));
    game.FrontPage = FrontPage;
    __reflect(FrontPage.prototype, "game.FrontPage");
})(game || (game = {}));
//# sourceMappingURL=FrontPage.js.map