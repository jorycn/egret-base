module game{
    export class GameContainer extends egret.DisplayObjectContainer {
        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(evt:RES.ResourceEvent)
        {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onAddToStage,this);
            this.init();
        }

        
        private timer:egret.Timer;
        private jssdk:Jssdk;

        private FrontPage:game.FrontPage;
        private MainPage:game.MainPage;
        
        // 游戏场景初始化
        private init():void{
            // 首屏
            this.FrontPage = new game.FrontPage();
            this.addChild(this.FrontPage);
            this.FrontPage.addEventListener(GameEvent.GAME_START, this.gameStart, this);

            // 计时器
            this.timer = new egret.Timer(500, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.handTimer, this);

            // 游戏主界面
            this.MainPage = new game.MainPage();

            // 微信分享
            var self=this;
            setTimeout(function(){
                self.jssdk = new Jssdk(0,0);
                self.addChild(self.jssdk);
            }, 200);
        }

        private gameStart():void{
            this.timer.start();

            this.removeChild(this.FrontPage);
            this.addChild(this.MainPage);

        }

        private handTimer():void
        {
            // 更新时间
            Store.setTime(Store.getTime()+500);

            //更新时间显示
            this.MainPage.updateTime();
        }
    }
}