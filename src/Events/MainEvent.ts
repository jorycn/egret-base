/**
 *
 * 主类事件
 * @author 
 *
 */
class MainEvent extends egret.Event {
    // 资源加载完成
    public static LOADCOMP: string = 'loadcomp';
    // 游戏开始
    public static GAME_START: string = "game_start";
    public static GAME_OVER: string = "game_over";
    public static GAME_RESTART: string = "game_restart";
    public static GAME_SHARE: string = "game_share";

    // jssdk准备就绪
    public static WXCOMP: string = 'wxcomp';

    public constructor(type:string) {
        super(type);
    }
}
