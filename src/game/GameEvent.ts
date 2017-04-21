class GameEvent extends egret.Event
{
    public static TIME_CLICK:string = 'time_click';
    public static GAME_START:string = "game_start";
    public static GAME_OVER:string = "game_over";

    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}
