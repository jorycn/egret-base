/**
 * 基于 egret.HttpRequest 封装的 Http 类，主要用来进行网络请求封装
 * post/get 方法返回的都是 promise 对象，可以支持新的 promise/await 新的语法。
 * 
 * 使用方法：
 * let res = await new Http().post('/api/test', {id: 1});
 */
class HttpBase {
    /**
     * egert 的请求对象实例
     */
    private request: egret.HttpRequest;

    /**
     * 域名
     */
    private static domain: any = null;

    /**
     * 构造函数
     */
    public constructor() {
        this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.setRequestHeader("X-XSRF-TOKEN", Cookie.getcooke('XSRF-TOKEN')||'');
        return this;
    }

    /**
     * post 方法
     * @param url 一个用来包含发送请求的 url 字符串
     * @param param 发送到服务器的数据
     */
    public post(url: string, param: Object = {}, cb) {
            this.request.open(this.getUrl(url), egret.HttpMethod.POST);
            this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.request.send(this.formatPostData(param));
            this.request.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
                let request = <egret.HttpRequest>e.currentTarget;
                cb(JSON.parse(request.response));
            }, this);
            this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, (e: egret.IOErrorEvent) => {
                alert('网络错误，请稍后重试!');
            }, this);
    }

    /**
     * get 方法
     * @param url 一个用来包含发送请求的 url 字符串
     * @param param 发送到服务器的数据
     */
    public get(url: string, param: Object = {}, cb) {

            let getData = this.formatPostData(param),
                real_url = this.getUrl(url);
            
            if (getData != '') {
                real_url += `?${getData}`;
            }
            this.request.open(real_url, egret.HttpMethod.GET);
            this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.request.send();
            this.request.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
                let request = <egret.HttpRequest>e.currentTarget;
                cb(JSON.parse(request.response));
            }, this);
            this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, (e: egret.IOErrorEvent) => {
                alert('网络错误，请稍后重试!');
            }, this);
    }

    /**
     * 获取完整 url 路径，（主要用来区别本地环境还是什么环境的）
     * @param url 一个用来包含发送请求的 url 字符串
     */
    private getUrl(url: string): string {
        if (typeof HttpBase.domain === 'string' && HttpBase.domain.length > 0) {
            return `http:\/\/${HttpBase.domain}`;
        } else if (typeof HttpBase.domain === 'function') {
            let domain = HttpBase.domain();

            if (!domain || domain === '') return url;
            return `http:\/\/${domain}${url}`;
        } else {
            return url;
        }
    }

    /**
     * 设置请求的域名
     */
    public static setDomain(domain: any) {
        if (typeof domain === 'string' || typeof domain === 'function') {
            HttpBase.domain = domain;
        } else {
            console.log('setDomain 的参数 domain 必须是一个字符串或者函数');
        }
    }
   
    /**
     * 格式化传参, eg: {p1: a, p2: b}  ==>  'p1=a&p2=b'
     * @param param 发送到服务器的数据
     */
    private formatPostData(param: Object): string {
        let arr = [],
            val = '';

        for (let key in param) {
            // 如果是数组，或者是对象，则进行 JSON.stringify
            if (typeof param[key] == 'object') {
                try {
                    val = JSON.stringify(param[key]);
                } catch(e) {
                    console.log(`Http.formatPostData 参数异常: `, param);
                    val = '';
                }
                arr.push(`${key}=${val}`);
            } else {
                arr.push(`${key}=${param[key]}`);
            }
        }
        if (arr.length <= 0) return '';
        return arr.join('&');
    }
}