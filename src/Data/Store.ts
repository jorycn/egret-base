class Store{
    public static orientation:string = 'portrait';

    public static score:number = 0;
    public static time:number = 0;
    public static curPanel:egret.Sprite;
    
    public static setOrientation(angle: number):void 
    {
        if(angle == 90 || angle == -90)
        {
            Store.orientation = 'landscope';
        }
    }

    public static get stageHeight():number
    {
        return egret.MainContext.instance.stage.stageHeight;
    }

    public static get stageWidth():number
    {
        return egret.MainContext.instance.stage.stageWidth;
    }
}
