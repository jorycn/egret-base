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
    var MainPage = (function (_super) {
        __extends(MainPage, _super);
        function MainPage() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        MainPage.prototype.init = function () {
            this.bg = game.createBitmapByName('bg_jpg');
            this.addChild(this.bg);
            this.countDown = new egret.BitmapText();
            this.countDown.font = RES.getRes("number_fnt");
            this.countDown.x = Store.getStageWidth() - 105;
            this.countDown.y = 200;
            this.countDown.text = String(0);
            this.addChild(this.countDown);
        };
        MainPage.prototype.gameStart = function () {
            this.dispatchEvent(new GameEvent(GameEvent.GAME_START));
        };
        MainPage.prototype.updateTime = function () {
            this.countDown.x = Store.getStageWidth() - this.countDown.width - 50;
            this.countDown.text = String(Math.floor(Store.getTime() / 1000));
        };
        return MainPage;
    }(egret.Sprite));
    game.MainPage = MainPage;
    __reflect(MainPage.prototype, "game.MainPage");
})(game || (game = {}));
//# sourceMappingURL=MainPage.js.map