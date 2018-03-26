var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Store = (function () {
    function Store() {
    }
    Store.setOrientation = function (angle) {
        if (angle == 90 || angle == -90) {
            Store.orientation = 'landscope';
        }
    };
    Object.defineProperty(Store, "stageHeight", {
        get: function () {
            return egret.MainContext.instance.stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Store, "stageWidth", {
        get: function () {
            return egret.MainContext.instance.stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Store.orientation = 'portrait';
    Store.score = 0;
    Store.time = 0;
    return Store;
}());
__reflect(Store.prototype, "Store");
//# sourceMappingURL=Store.js.map