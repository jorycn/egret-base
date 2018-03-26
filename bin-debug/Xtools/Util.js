var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 工具箱
 * @author jory|jorycn@163.com
 *
 */
var Util = (function () {
    function Util() {
    }
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    */
    Util.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /*
    * 对象冒泡排序
    */
    Util.sortarr = function (arr) {
        var tmp;
        for (var i = 0; i < arr.length; i++) {
            for (var j = arr.length - 1; j > i; j--) {
                if (arr[j].y < arr[j - 1].y) {
                    tmp = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = tmp;
                }
            }
        }
        return arr;
    };
    Util.center = function (obj) {
        return (Store.stageWidth - obj.width) / 2;
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
//# sourceMappingURL=Util.js.map