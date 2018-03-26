module Cookie{
    // 配置 tsconfig target lib es6
    export class CookieError extends Error {}
    export interface ICookieOptions {
        readonly silent?: boolean;
        readonly days?: number;
        readonly secure?: boolean;
        readonly path?: string;
        readonly domain?: string;
    }

    const daysToMillis = 24 * 60 * 60 * 1000; // tslint:disable-line:no-magic-numbers
    const checkCookieSupport = (opts?: ICookieOptions): boolean => {
        if (typeof document === 'undefined' && (!opts || !opts.silent)) {
            throw new CookieError('Document is not defined! Are you trying to use this on the server?');
        }
        return typeof document !== 'undefined';
    };
    const write = (name: string, value: string, opts: any): boolean => {
        if (checkCookieSupport(opts)) {
            const date = new Date();
            const expires =
                !!opts && !!opts.days ? `; expires=${date.setTime(date.getTime() + opts.days * daysToMillis)}` : '';
            const secure = !!opts && opts.secure ? '; secure' : '';
            const path = !!opts && opts.path ? `; path=${opts.path}` : '';
            const domain = !!opts && opts.domain ? `; domain=${opts.domain}` : '';
            document.cookie = `${encodeURIComponent(name)}=${value}${expires}${secure}${path}${domain}`;
            return true;
        }
        return false;
    };
    const get = (name: string, opts?: ICookieOptions): string | null => {
        if (checkCookieSupport(opts)) {
            const res = document.cookie.match(`(?:^|; )${encodeURIComponent(name)}=([^;]*)`);
            return res ? decodeURI(res[1]) : '';
        }
        return '';
    };
    const remove = (name: string, opts?: ICookieOptions):boolean => {
        return write(name, '', {...opts, days: -1});
    };

    export function setcooke(name: string, value: string, opts?: ICookieOptions):boolean{
        return write(name, value, opts);
    }
    export function getcooke(name: string, opts?: ICookieOptions):string | null{
        return get(name, opts);
    }
    export function removecookie(name: string, opts?: ICookieOptions):boolean {
        return remove(name, opts);
    }
}


