module Music{

    export var _bgSound:egret.Sound;
    export var _bgChannel:egret.SoundChannel;

    export function play(res: string){
        _bgSound = RES.getRes(res);
        _bgChannel = _bgSound.play(0,-1);
    }

    export function stop(){
        if(_bgChannel){
            _bgChannel.stop();
            _bgChannel = null;
        }
    }

    export function playEffect(res: string){
        var _effect: egret.Sound = RES.getRes(res);
        _effect.play(0,1);
    }
}
