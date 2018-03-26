module game
{
    /**
     * 主游戏容器
     */
    export class GameContainer extends egret.DisplayObjectContainer
    {
        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        // 游戏主场景
        private mainLayer:egret.Sprite;
        private stageW: number;
        private stageH: number;


        private onAddToStage(event:egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

            this.stageW = Store.stageWidth;
            this.stageH = Store.stageHeight;

            // 主层
            GameLayerManager.gameLayer();
            this.mainLayer = GameLayerManager.instance.mainLayer;

            
            // 添加音乐
            let self = this;
            egret.setTimeout(function(){
                var jssdk = new xtools.XJssdk();
                // jssdk.addEventListener(SoundEvent.WXCOMP, self.playBgm, this);
                self.addChild(jssdk);                
            }, this, 20);
        }
    }
}
