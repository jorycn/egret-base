var game;
(function (game) {
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    game.createBitmapByName = createBitmapByName;
})(game || (game = {}));
//# sourceMappingURL=Util.js.map