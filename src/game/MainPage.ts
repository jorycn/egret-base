module game{
    export class MainPage extends egret.Sprite
    {
        public constructor() {
            super();
            this.init();
        }

        private bg:egret.Bitmap;
        private btnStart:egret.Bitmap;

        private countDown:egret.BitmapText;
        
        private init()
        {
            this.bg = game.createBitmapByName('bg_jpg');

            this.addChild(this.bg);

            this.countDown = new egret.BitmapText();
            this.countDown.font = RES.getRes("number_fnt");
            this.countDown.x = Store.getStageWidth() - 105;
            this.countDown.y = 200;
            this.countDown.text = String(0);

            this.addChild(this.countDown);
        }

        private gameStart()
        {
            this.dispatchEvent(new GameEvent(GameEvent.GAME_START));
        }

        public updateTime():void
        {
            this.countDown.text = String(Math.floor(Store.getTime()/1000));
        }
    }
}