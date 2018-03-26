/**
 * 
 * 主类
 * @author jorycn
 * 
 */ 
class Main extends egret.DisplayObjectContainer {

    /** 加载进度界面*/
    public loadingView:LoadingUI;
    public loadBar:LoadBar;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private loadLayer: egret.Sprite;
    private onAddToStage(event:egret.Event) {
        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }
        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
        // 初始化游戏层
        this.stage.addChild(GameLayerManager.gameLayer());
        this.loadLayer = GameLayerManager.instance.loadLayer;

        ////设置加载进度界面
        this.loadingView = new LoadingUI();
        this.loadLayer.addChild(this.loadingView);

        this.loadBar = new LoadBar();
        
        ////RES加载类
        Loader.getInstance();
        Loader.instance.addEventListener(LoadEvent.GROUP_COMPLETE,this.loadGroupComp,this);
        Loader.instance.addEventListener(LoadEvent.GROUP_PROGRESS,this.loadGroupprogress,this);
        Loader.instance.init();
    }

    /*
     * 分组资源加载进度
     */ 
    private loadGroupprogress(e:LoadEvent){
        if (e.groupName == "loading") {
            this.loadingView.setProgress(e.itemsLoaded, e.itemsTotal);
        }else if (e.groupName == "preload") {
            this.loadBar.setProgress(e.itemsLoaded, e.itemsTotal);
        }
    }
    
    /*
     * 分组资源加载完成
     */ 
    private loadGroupComp(e:LoadEvent){
        if(e.groupName == 'loading'){
            this.loadLayer.removeChild(this.loadingView);

            var bg:egret.Bitmap = Util.createBitmapByName('bg_jpg');
            GameLayerManager.instance.sceneLayer.addChild(bg);

            this.loadBar.init();
            this.loadLayer.addChild(this.loadBar);

            Loader.instance.load("preload");
        }else if(e.groupName == 'preload'){
            this.createScence();
        }
    }

    private createScence(){
        this.loadLayer.removeChild(this.loadBar);

        // 游戏入口
        var gameContainer:game.GameContainer = new game.GameContainer();
        GameLayerManager.instance.sceneLayer.addChild(gameContainer);
    }
}