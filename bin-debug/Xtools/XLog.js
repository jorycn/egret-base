/***
* 常用日志类。
* 注意：用来存储的日志数据可以自行扩展后存储在日志文件中(未实现，留待将来扩展)。
* 单条数据的格式：[时间，日志类型,日志触发类，日志内容]
* 用法：
* Log.info("Main","信息说明，这是主类");
* Log.error("Main","这是错误的内容");
* Log.warn("Main","这是警告的内容");
* Log.setClose(Log.DEBUG,true);//关闭调试日志的处理
*
*
* Log.clear();//清除全部日志数据
* Log.clear(Log.DEBUG);//清除全部调试的日志。
* Log.getDataList(Log.DEBUG);//获取全部调试日志。返回为[时间,类型,调用的类(typeClass),日志内容]列表。
*/
var xtools;
(function (xtools) {
    var XLog;
    (function (XLog) {
        /** 存储日志数据*/
        XLog.__debug = [];
        XLog.__info = [];
        XLog.__warn = [];
        XLog.__error = [];
        XLog.__fatal = [];
        /** 常量。调试级别*/
        XLog.DEBUG = "debug";
        /** 常量。信息说明级别*/
        XLog.INFO = "info";
        /** 常量。警告级别*/
        XLog.WARN = "warn";
        /** 常量。错误级别(运算错误，如外部传值不符合格式而引起的运行错误。)*/
        XLog.ERROR = "error";
        /** 常量。致命错误级别。（从理论与实际运行都不应该存在的错误，但确实发生了）*/
        XLog.FATAL = "fatal";
        /* 日志权限处理等级(默认全部处理) **/
        XLog.__level = {};
        /** 设置日志配置数据。(暂未实现)**/
        function setConfig(config) {
        }
        XLog.setConfig = setConfig;
        /** 设置指定类型的处理是否关闭。 close为true标识关闭该类型的处理。（类型从常量中处理） */
        function setClose(type, close) {
            if (close === void 0) { close = false; }
            XLog.__level[type] = close;
        }
        XLog.setClose = setClose;
        /** 处理单个指定类型的数据**/
        function __ei(d, typeClass, args, type) {
            if (XLog.__level[type] == true)
                return;
            typeClass = typeClass;
            var s = "";
            if (args.length > 0)
                s = args[0];
            for (var i = 1; i < args.length; i++) {
                s = s + " " + args;
            }
            var t = __time();
            d[d.length] = [t, type, typeClass, s];
            //可以修改此处直接使用官方提供的日志功能模块
            console.log(t + " [" + type + "] " + typeClass + "\t" + s);
        }
        XLog.__ei = __ei;
        function __time() {
            var d = new Date();
            var t = d.getFullYear();
            var str = t + "-";
            t = d.getMonth() + 1;
            str = str + __z2(t) + "-";
            t = d.getDate();
            str = str + __z2(t) + " ";
            t = d.getHours();
            str = str + __z2(t) + ":";
            t = d.getMinutes();
            str = str + __z2(t) + ":";
            t = d.getSeconds();
            str = str + __z2(t) + ".";
            t = d.getMilliseconds();
            if (t < 10)
                str = str + "00" + t;
            else if (t < 100)
                str = str + "0" + t;
            else
                str = str + t;
            return str;
        }
        XLog.__time = __time;
        function __z2(v) {
            if (v < 10)
                return "0" + v;
            return v + "";
        }
        XLog.__z2 = __z2;
        /** 调试**/
        function debug(typeClass) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            __ei(XLog.__debug, typeClass, args, XLog.DEBUG);
        }
        XLog.debug = debug;
        /** 信息说明**/
        function info(typeClass) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            __ei(XLog.__info, typeClass, args, XLog.INFO);
        }
        XLog.info = info;
        /** 警告**/
        function warn(typeClass) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            __ei(XLog.__warn, typeClass, args, XLog.WARN);
        }
        XLog.warn = warn;
        /** 错误**/
        function error(typeClass) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            __ei(XLog.__error, typeClass, args, XLog.ERROR);
        }
        XLog.error = error;
        /** 致命错误**/
        function fatal(typeClass) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            __ei(XLog.__fatal, typeClass, args, XLog.FATAL);
        }
        XLog.fatal = fatal;
        /** 获取指定类型的日志。从常量中选取。**/
        function getDataList(type) {
            try {
                return XLog[type];
            }
            catch (e) { }
            return null;
        }
        XLog.getDataList = getDataList;
        /** 清空指定类型的日志数据。类型为null时表示清空全部数据**/
        function clear(type) {
            if (type === void 0) { type = null; }
            if (type == null) {
                XLog.__debug.length = 0;
                XLog.__info.length = 0;
                XLog.__warn.length = 0;
                XLog.__error.length = 0;
                XLog.__fatal.length = 0;
            }
            else {
                try {
                    var r = XLog["__" + type];
                    if (r != null) {
                        r.length = 0;
                    }
                }
                catch (e) {
                    //打印调用出错的数据信息
                    error("Log.clear():type=", type, e);
                }
            }
        }
        XLog.clear = clear;
    })(XLog = xtools.XLog || (xtools.XLog = {}));
})(xtools || (xtools = {}));
//# sourceMappingURL=XLog.js.map