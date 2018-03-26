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
 * 加载进度条
 * @author
 *
 */
var LoadBar = (function (_super) {
    __extends(LoadBar, _super);
    function LoadBar() {
        return _super.call(this) || this;
    }
    /*
     * 初始化
     */
    LoadBar.prototype.init = function () {
        this.prol = new egret.Sprite();
        this.prol.x = 228;
        this.prol.y = 223;
        this.addChild(this.prol);
        this.bm = Util.createBitmapByName("loadbar_bg_png");
        this.bm.y = 246;
        this.prol.addChild(this.bm);
        //182 18
        this.barl = Util.createBitmapByName("loadbar_top_png");
        this.barl.y = 246;
        this.prol.addChild(this.barl);
        var label = new egret.TextField;
        label.text = 'Loading';
        label.textColor = 0xFFFFFF;
        label.size = 30;
        label.y = 354;
        label.width = 285;
        label.textAlign = egret.HorizontalAlign.CENTER;
        this.prol.addChild(label);
        var n = 4;
        egret.setInterval(function () {
            var _d = '';
            var _j = 4 - n;
            for (var _i = _j; _i > 0; _i--) {
                _d += '.';
            }
            label.text = 'Loading' + _d;
            n -= 1;
            if (n < 0)
                n = 3;
        }, this, 200);
    };
    /*
     * 设置加载进度
     */
    LoadBar.prototype.setProgress = function (current, total) {
        this.barl.width = current / total * 285;
    };
    return LoadBar;
}(egret.DisplayObjectContainer));
__reflect(LoadBar.prototype, "LoadBar");
//# sourceMappingURL=LoadBar.js.map