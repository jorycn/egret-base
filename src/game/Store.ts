
class Store
{
    private static score:number = 0;
    private static time:number = 0;

    public static setTime(val:number):void
    {
        Store.time = val;
    }

    public static getTime():number
    {
        return Store.time;
    }

    public static getStageHeight():number
    {
        return egret.MainContext.instance.stage.stageHeight;
    }

    public static getStageWidth():number
    {
        return egret.MainContext.instance.stage.stageWidth;
    }

    public static getScore():number
    {
        return Store.score;
    }
}