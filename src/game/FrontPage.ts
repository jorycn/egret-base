module game{
    export class FrontPage extends egret.Sprite
    {
        public constructor() {
            super();
            this.init();
        }

        private bg:egret.Bitmap;
        private btnStart:egret.Bitmap;
        
        private init()
        {
            this.bg = game.createBitmapByName('bg_start_jpg');
            this.addChild(this.bg);

            this.btnStart = game.createBitmapByName('btn_start_png');
            this.btnStart.x = (Store.getStageWidth()-this.btnStart.width)/2;//居中定位
            this.btnStart.y = 820;
            this.btnStart.touchEnabled = true;//开启触碰
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameStart,this);//点击按钮开始游戏
            this.addChild(this.btnStart);
        }

        private gameStart()
        {
            this.dispatchEvent(new GameEvent(GameEvent.GAME_START));
        }
    }
}