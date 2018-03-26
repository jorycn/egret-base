/**
 *
 * 工具箱
 * @author jory|jorycn@163.com
 *
 */
class Util {
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    */
    public static createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /*
    * 对象冒泡排序
    */ 
    public static sortarr(arr:any[]):any[]{
        var tmp:any;
        for (var i:number = 0; i < arr.length; i++){
            for (var j:number = arr.length - 1; j > i; j--){
                if (arr[j].y < arr[j - 1].y){
                    tmp = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = tmp;
                }
            }
        }
        return arr;
    }

    public static center(obj: any): number{
        return (Store.stageWidth - obj.width)/2;
    }
}