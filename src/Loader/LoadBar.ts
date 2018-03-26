/**
 *
 * 加载进度条
 * @author 
 *
 */
class LoadBar extends egret.DisplayObjectContainer {
    
    private bm: egret.Bitmap;
    
    private barl: egret.Bitmap;
    private prol: egret.Sprite;

	public constructor() {
        super();
	}
	/*
	 * 初始化
	 */ 
	public init(){
        this.prol = new egret.Sprite();
        this.prol.x = 228;
        this.prol.y = 223;
        this.addChild(this.prol);

        this.bm = Util.createBitmapByName("loadbar_bg_png");
        this.bm.y = 246;
        this.prol.addChild(this.bm);
        //182 18
        this.barl = Util.createBitmapByName("loadbar_top_png");
        this.barl.y = 246;
        this.prol.addChild(this.barl);

		var label:egret.TextField = new egret.TextField;
		label.text = 'Loading';
		label.textColor = 0xFFFFFF;
		label.size = 30;
		label.y = 354;
		label.width = 285;
		label.textAlign = egret.HorizontalAlign.CENTER;
		this.prol.addChild(label);

		var n = 4;
		egret.setInterval(function(){
			var _d = '';
			var _j = 4-n;
			for(var _i=_j;_i>0;_i--){
				_d += '.';
			}
			label.text = 'Loading' + _d;
			n -= 1;
			if(n<0) n=3;
		}, this, 200)
	}
    
	/*
	 * 设置加载进度
	 */ 
	public setProgress(current, total){
        this.barl.width=current/total*285;
	}
}
