class Config {

    public static VERSION: string = '0.1.2'

    public static API_HOST: string = 'http://yingxiaogame.daqinwang.cc';
    public static GAME_ID: string = '10';

    public static API_SUBMIT_SCORE: string = Config.API_HOST + '/wechat/game/submit_user_info/' + Config.GAME_ID;
    public static API_TOPLIST: string = Config.API_HOST + '/wechat/game/ranking/' + Config.GAME_ID;
    public static API_LOTTERY: string = Config.API_HOST + '/wechat/game/lottery/' + Config.GAME_ID;

    public static JSSDK: any = {
        'apiUrl': 'http://yingxiaogame.daqinwang.cc/wechat/jsconfig',
        'title' : '国网陕西电力新年登高',
        'desc'  : '国网陕西电力新年登高',
        'url'   : 'http://yingxiaogame.daqinwang.cc/wechat/game/index/10',
        'imgUrl': 'http://img1.gtimg.com/xian/pics/hv1/254/162/2261/147063089.jpg'
    }
}