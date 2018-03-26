var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 用来管理生成 MovieClip 的类
 */
var MCFactory = (function () {
    function MCFactory() {
    }
    // public static factory: {
    //     string: egret.MovieClipDataFactory
    // }
    /**
     * 根据 mc 名称来管理创建一个 MovieClip 实例
     */
    MCFactory.createMovieClip = function (key) {
        if (!this.factory[key]) {
            var data = RES.getRes(key + "_json");
            if (!data) {
                console.log("\u6CA1\u6709\u8BE5 key \u7684\u8D44\u6E90\u5E27\u52A8\u753B, data \u4E3A\u7A7A, key: " + key);
                return;
            }
            var txtr = RES.getRes(key + "_png");
            if (!txtr) {
                console.log("\u6CA1\u6709\u8BE5 key \u7684\u8D44\u6E90\u5E27\u52A8\u753B, txtr \u4E3A\u7A7A, key: " + key);
                return;
            }
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            this.factory[key] = mcFactory;
        }
        return new egret.MovieClip(this.factory[key].generateMovieClipData(key));
    };
    /**
     * 工厂对象
     */
    MCFactory.factory = {};
    return MCFactory;
}());
__reflect(MCFactory.prototype, "MCFactory");
//# sourceMappingURL=MCFactory.js.map