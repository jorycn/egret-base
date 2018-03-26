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
/**
 *
 * 主类
 * @author jorycn
 *
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        // 初始化游戏层
        this.stage.addChild(GameLayerManager.gameLayer());
        this.loadLayer = GameLayerManager.instance.loadLayer;
        ////设置加载进度界面
        this.loadingView = new LoadingUI();
        this.loadLayer.addChild(this.loadingView);
        this.loadBar = new LoadBar();
        ////RES加载类
        Loader.getInstance();
        Loader.instance.addEventListener(LoadEvent.GROUP_COMPLETE, this.loadGroupComp, this);
        Loader.instance.addEventListener(LoadEvent.GROUP_PROGRESS, this.loadGroupprogress, this);
        Loader.instance.init();
    };
    /*
     * 分组资源加载进度
     */
    Main.prototype.loadGroupprogress = function (e) {
        if (e.groupName == "loading") {
            this.loadingView.setProgress(e.itemsLoaded, e.itemsTotal);
        }
        else if (e.groupName == "preload") {
            this.loadBar.setProgress(e.itemsLoaded, e.itemsTotal);
        }
    };
    /*
     * 分组资源加载完成
     */
    Main.prototype.loadGroupComp = function (e) {
        if (e.groupName == 'loading') {
            this.loadLayer.removeChild(this.loadingView);
            var bg = Util.createBitmapByName('bg_jpg');
            GameLayerManager.instance.sceneLayer.addChild(bg);
            this.loadBar.init();
            this.loadLayer.addChild(this.loadBar);
            Loader.instance.load("preload");
        }
        else if (e.groupName == 'preload') {
            this.createScence();
        }
    };
    Main.prototype.createScence = function () {
        this.loadLayer.removeChild(this.loadBar);
        // 游戏入口
        var gameContainer = new game.GameContainer();
        GameLayerManager.instance.sceneLayer.addChild(gameContainer);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map