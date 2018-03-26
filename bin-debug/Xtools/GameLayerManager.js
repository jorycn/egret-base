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
  * 显示对象层级
  * Main-GameScene（sceneLayer、mainLayer、popLayer、effectLayer、maskLayer、loadLayer）
  *
*/
var GameLayerManager = (function (_super) {
    __extends(GameLayerManager, _super);
    //构造方法
    function GameLayerManager() {
        var _this = _super.call(this) || this;
        // 场景层 如 战场、主城、副本战场之类的
        _this.sceneLayer = new egret.Sprite();
        // 主UI层 如 底部功能栏
        _this.mainLayer = new egret.Sprite();
        // 弹窗层 如 设置、背包、装备之类的
        _this.panelLayer = new egret.Sprite();
        // 特效层 如 闪烁、飘字之类的
        _this.effectLayer = new egret.Sprite();
        // 通讯遮罩层 和服务器通讯UI
        _this.maskLayer = new egret.Sprite();
        // 加载遮罩层 场景切换的时候加载资源UI
        _this.loadLayer = new egret.Sprite();
        _this.init();
        return _this;
    }
    //游戏容器管理器单例
    GameLayerManager.gameLayer = function () {
        if (!this.instance)
            this.instance = new GameLayerManager();
        return this.instance;
    };
    //初始化场景类
    GameLayerManager.prototype.init = function () {
        this.addChild(this.sceneLayer);
        this.addChild(this.mainLayer);
        this.addChild(this.panelLayer);
        this.addChild(this.effectLayer);
        this.addChild(this.maskLayer);
        this.addChild(this.loadLayer);
    };
    GameLayerManager.prototype.clearLayer = function (obj) {
        while (obj.numChildren > 0) {
            obj.removeChildAt(0);
        }
    };
    return GameLayerManager;
}(egret.Sprite));
__reflect(GameLayerManager.prototype, "GameLayerManager");
//# sourceMappingURL=GameLayerManager.js.map