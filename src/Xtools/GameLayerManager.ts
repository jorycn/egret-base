  /**
    * 显示对象层级
    * Main-GameScene（sceneLayer、mainLayer、popLayer、effectLayer、maskLayer、loadLayer）
    * 
*/
class GameLayerManager extends egret.Sprite{

    // 场景层 如 战场、主城、副本战场之类的
    public sceneLayer:egret.Sprite = new egret.Sprite();
    // 主UI层 如 底部功能栏
    public mainLayer:egret.Sprite = new egret.Sprite();
    // 弹窗层 如 设置、背包、装备之类的
    public panelLayer:egret.Sprite = new egret.Sprite();
    // 特效层 如 闪烁、飘字之类的
    public effectLayer:egret.Sprite = new egret.Sprite();   
    // 通讯遮罩层 和服务器通讯UI
    public maskLayer:egret.Sprite = new egret.Sprite();
    // 加载遮罩层 场景切换的时候加载资源UI
    public loadLayer:egret.Sprite = new egret.Sprite();

    public static instance:GameLayerManager; 

    //构造方法
    public constructor(){
        super();
        this.init();
    }

    //游戏容器管理器单例
    public static gameLayer():GameLayerManager  
    {  
        if(!this.instance)  
            this.instance = new GameLayerManager();  
        return this.instance;  
    }  

    //初始化场景类
    public init():void {
        this.addChild(this.sceneLayer);
        this.addChild(this.mainLayer);
        this.addChild(this.panelLayer);
        this.addChild(this.effectLayer);
        this.addChild(this.maskLayer);
        this.addChild(this.loadLayer);
    }

    public clearLayer(obj: egret.Sprite): void {
        while(obj.numChildren>0){
            obj.removeChildAt(0);
        }
    }

}
        
        