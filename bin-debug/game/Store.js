var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Store = (function () {
    function Store() {
    }
    Store.setTime = function (val) {
        Store.time = val;
    };
    Store.getTime = function () {
        return Store.time;
    };
    Store.getStageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    Store.getStageWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    Store.getScore = function () {
        return Store.score;
    };
    return Store;
}());
Store.score = 0;
Store.time = 0;
__reflect(Store.prototype, "Store");
//# sourceMappingURL=Store.js.map