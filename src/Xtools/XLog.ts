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
module xtools.XLog {
    /** 存储日志数据*/
    export var __debug:any[]=[];
    export var __info: any[] = [];
    export var __warn: any[] = [];
    export var __error: any[] = [];
    export var __fatal: any[] = [];
    /** 常量。调试级别*/
    export var DEBUG: string = "debug";
    /** 常量。信息说明级别*/
    export var INFO: string = "info";
    /** 常量。警告级别*/
    export var WARN: string = "warn";
    /** 常量。错误级别(运算错误，如外部传值不符合格式而引起的运行错误。)*/
    export var ERROR: string = "error";
    /** 常量。致命错误级别。（从理论与实际运行都不应该存在的错误，但确实发生了）*/
    export var FATAL: string = "fatal";
    /* 日志权限处理等级(默认全部处理) **/
    export var __level: Object = {};
    /** 设置日志配置数据。(暂未实现)**/
    export function setConfig(config: any): void {
 
    }
    /** 设置指定类型的处理是否关闭。 close为true标识关闭该类型的处理。（类型从常量中处理） */
    export function setClose(type:string,close:boolean=false){
        __level[type] = close;
    }
 
    /** 处理单个指定类型的数据**/
    export function __ei(d:any[],typeClass:string,args:any[],type:string):void{
        if(__level[type] == true) return;
        typeClass = typeClass;
        var s: string ="";        if(args.length>0)s= args[0];
        for(var i: number = 1;i < args.length;i++){
            s = s + " "+args ;
        }
        var t: string = __time();
        d[d.length] = [t,type,typeClass,s];
        //可以修改此处直接使用官方提供的日志功能模块
        console.log(t+" ["+type+"] "+typeClass+"\t"+s);
    }
    export function __time():string{
        var d: Date = new Date();
        var t: number= d.getFullYear();
        var str:string= t + "-";
        t= d.getMonth()+1;
        str = str + __z2(t) + "-";
        t = d.getDate();
        str = str + __z2(t) + " ";
        t = d.getHours();
        str = str + __z2(t) + ":";
        t = d.getMinutes();
        str = str + __z2(t) + ":";
        t = d.getSeconds();
        str = str + __z2(t)+".";
        t = d.getMilliseconds();
        if(t < 10) str = str + "00" + t;
        else if(t < 100) str = str + "0" + t;
        else str = str + t;
        return str;
    }
    export function __z2(v:number):string{
        if(v < 10) return "0" + v;
        return v + "";
    }
 
    /** 调试**/
    export function debug(typeClass:any,...args){
        __ei(__debug,typeClass,args,DEBUG);
    }
    /** 信息说明**/
    export function info(typeClass:any,...args){
        __ei(__info,typeClass,args,INFO);
    }
    /** 警告**/
    export function warn(typeClass:any,...args){
        __ei(__warn,typeClass,args,WARN);
    }
    /** 错误**/
    export function error(typeClass:any,...args){
        __ei(__error,typeClass,args,ERROR);
    }
    /** 致命错误**/
    export function fatal(typeClass:any,...args){
        __ei(__fatal,typeClass,args,FATAL);
    }
 
    /** 获取指定类型的日志。从常量中选取。**/
    export function getDataList(type:string):any[]{
        try {
            return XLog[type];
        } catch(e) { }
        return null;
    }
    /** 清空指定类型的日志数据。类型为null时表示清空全部数据**/
    export function clear(type:string=null):void{
        if(type==null){
            __debug.length = 0;
            __info.length = 0;
            __warn.length = 0;
            __error.length = 0;
            __fatal.length = 0;
        }else{
            try {
                var r:any[]=XLog["__"+type];
                if(r!=null){
                    r.length = 0;
                }
            } catch(e) {
                //打印调用出错的数据信息
                error("Log.clear():type=",type,e);
            }
        }
    }
}