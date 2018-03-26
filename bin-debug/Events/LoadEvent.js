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
 * 加载类事件
 * @author
 *
 */
var LoadEvent = (function (_super) {
    __extends(LoadEvent, _super);
    //public static LOADING: string = "loading";
    //public static LOADCOMP: string = "loadcomp";
    //private _resName: string = "";
    //public constructor(type:string, resName:string="", bubbles:boolean=false, cancelable:boolean=false) {
    function LoadEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
        //this._resName = resName;
    }
    return LoadEvent;
}(RES.ResourceEvent));
__reflect(LoadEvent.prototype, "LoadEvent");
//# sourceMappingURL=LoadEvent.js.map