"use strict"
// 路由的匹配正则表达式
// Thanks to Sammy.js
const   PATH_REPLACER = "([^\/\\?]+)",
	    PATH_NAME_MATCHER = /:([\w\d]+)/g,
	    PATH_EVERY_MATCHER = /\/\*(?!\*)/,
	    PATH_EVERY_REPLACER = "\/([^\/\\?]+)",
	    PATH_EVERY_GLOBAL_MATCHER = /\*{2}/,
	    PATH_EVERY_GLOBAL_REPLACER = "(.*?)\\??",
	    LEADING_BACKSLASHES_MATCH = /\/*$/

class Router {

    constructor() {
    	this._routes = [];
        // this._paused = false;
        this._hasChangeHandler = this._onHashchange.bind(this);
        window.addEventListener('hashchange', this._hasChangeHandler);
    }

    // hashchange`s callback
    _onHashchange(){
    	if(!this._paused){
    		this._route(window.location.hash || '#/');
    	}
    }
    // the route will go
    _route(fragmentUrl){
    	if(!fragmentUrl || fragmentUrl.length === 0 ){
    		return;
    	}
    	console.log(fragmentUrl);
    	let url = fragmentUrl.replace(LEADING_BACKSLASHES_MATCH, ''),
    		urlForTest = url.split('?')[0].replace(LEADING_BACKSLASHES_MATCH, ''),
    		matchRoute;

    	console.log(urlForTest);
    	this._routes.forEach((v) => {
    		if(v.path.test(urlForTest)){
    			matchRoute = v;
    		}
    	});
    	if(matchRoute){
    		// 把这段hash按照之前的正则表达式解析了
    		let match = url.match(matchRoute.path);
    		let params = {};
    		for(let i = 0; i < matchRoute.paramNames.length; ++i){
    			params[matchRoute.paramNames[i]] = match[i + 1];
    		}
    		matchRoute.routeAction(params);
    	}else{
    		console.log('not found 404!');
    	}


    }
    run(){
    	this._route(window.location.hash || '#/');
    }
    redirect(hash){
    	if(typeof hash == 'string' && hash.indexOf('#') === 0){
            window.location.hash = hash
            this._route(hash)
        }
    }
    // pause(){
    // 	this._paused = true
    //     return this
    // }
    destroy(){
    	window.removeEventListener('hashchange', this._hasChangeHandler)
    }
    // add the route
    route(path, callback){
    	let match,
    		paramNames = [];

    	if(typeof path == 'string'){
    		path = path.replace(LEADING_BACKSLASHES_MATCH, '');

    		while(match = PATH_NAME_MATCHER.exec(path) !== null){
    			// match[1] 就是去除冒号的参数名
    			paramNames.push(match[1]);
    		}

    		// 将链接转化成RegExp对象。为了判断url是不是符合规范
    		path = new RegExp(path
                    .replace(PATH_NAME_MATCHER, PATH_REPLACER) // /:([\w\d]+)/g  "([^\/\\?]+)"
                    .replace(PATH_EVERY_MATCHER, PATH_EVERY_REPLACER) // /\/\*(?!\*)/  "\/([^\/\\?]+)"
                    .replace(PATH_EVERY_GLOBAL_MATCHER, PATH_EVERY_GLOBAL_REPLACER) + '(?:\\?.+)?$');
    	}

    	this._routes.push({
    		path: path,
    		paramNames: paramNames,
    		routeAction: callback
    	});
    	console.log(this._routes);
    	return this;
    }
}
