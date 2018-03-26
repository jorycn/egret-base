var Music;
(function (Music) {
    function play(res) {
        Music._bgSound = RES.getRes(res);
        Music._bgChannel = Music._bgSound.play(0, -1);
    }
    Music.play = play;
    function stop() {
        if (Music._bgChannel) {
            Music._bgChannel.stop();
            Music._bgChannel = null;
        }
    }
    Music.stop = stop;
    function playEffect(res) {
        var _effect = RES.getRes(res);
        _effect.play(0, 1);
    }
    Music.playEffect = playEffect;
})(Music || (Music = {}));
//# sourceMappingURL=SoundManager.js.map