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
 * 资源加载类
 * @author
 *
 */
var Loader = (function (_super) {
    __extends(Loader, _super);
    function Loader() {
        return _super.call(this) || this;
    }
    /*
     * 获取对象实例
     */
    Loader.getInstance = function () {
        if (Loader.instance == null) {
            var loader = new Loader();
            Loader.instance = loader;
        }
        return Loader.instance;
    };
    /*
     * 加载配置文件
     */
    Loader.prototype.init = function () {
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json?v=" + Config.VERSION, "resource/");
    };
    /**
    * 配置文件加载完成,开始预加载preload资源组。
    */
    Loader.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("loading");
    };
    /**
    * 资源组加载出错
    */
    Loader.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    /**
    * preload资源组加载进度
    */
    Loader.prototype.onResourceProgress = function (event) {
        this.loadevent = new LoadEvent(LoadEvent.GROUP_PROGRESS);
        this.loadevent.groupName = event.groupName;
        this.loadevent.itemsLoaded = event.itemsLoaded;
        this.loadevent.itemsTotal = event.itemsTotal;
        this.dispatchEvent(this.loadevent);
        this.loadevent = null;
    };
    /**
    * preload资源组加载完成
    */
    Loader.prototype.onResourceLoadComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        //派发完成事件
        //Main.instance.dispatchEvent(new LoadEvent(LoadEvent.LOADCOMP,event.groupName));
        //this.dispatchEvent(new LoadEvent(LoadEvent.GROUP_COMPLETE,event.groupName));
        this.loadevent = new LoadEvent(LoadEvent.GROUP_COMPLETE);
        this.loadevent.groupName = event.groupName;
        this.dispatchEvent(this.loadevent);
        this.loadevent = null;
    };
    /**
    * 加载preload资源组。
    */
    Loader.prototype.load = function (group) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(group);
    };
    return Loader;
}(egret.EventDispatcher));
__reflect(Loader.prototype, "Loader");
//# sourceMappingURL=Loader.js.map