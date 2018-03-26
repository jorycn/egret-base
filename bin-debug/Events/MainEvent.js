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
 * 主类事件
 * @author
 *
 */
var MainEvent = (function (_super) {
    __extends(MainEvent, _super);
    function MainEvent(type) {
        return _super.call(this, type) || this;
    }
    // 资源加载完成
    MainEvent.LOADCOMP = 'loadcomp';
    // 游戏开始
    MainEvent.GAME_START = "game_start";
    MainEvent.GAME_OVER = "game_over";
    MainEvent.GAME_RESTART = "game_restart";
    MainEvent.GAME_SHARE = "game_share";
    // jssdk准备就绪
    MainEvent.WXCOMP = 'wxcomp';
    return MainEvent;
}(egret.Event));
__reflect(MainEvent.prototype, "MainEvent");
//# sourceMappingURL=MainEvent.js.map