/**
 * multiTime 0.0.2
 * description：多功能时间插件，包括计时、倒计时、日期设定、日期差、转时间搓等功能。
 * author: Qzhou zqz@zlzkj.com
 * date: 2015-01-23 - 2015-03-30
 * Free to use under terms of MIT license
 */
define(function(require, exports, module) {
    'use strict';
    // 内部dom操作方法定义
    if (typeof jQuery === 'undefined') {
        var $ = function(selector) {
        	return document.querySelectorAll(selector)[0];
        };
    } else {
    	var $ = function(selector) {
        	return jQuery(selector)[0];
        };
    }
    var fixTime = function(t) {
        if (t < 10) {
            return '0' + t;
        } else {
            return t;
        }
    };
    function MultiTime() {

    }
    /**
     * 计时器
     * @param  {[type]} selector [dom的ID对象]
     * @param  {[type]} options  [配置对象]
     */
    MultiTime.prototype.timer = function(selector, options) {
		var _default = {
			mode: 'count', // 计时器模式：count:计数；countDown：倒计时
            symbol: ':,:,:', // 时间之间的连接符号
            seconds: 0, // 初始化的秒数
            format: 'hh:mm:ss', // 时间格式 'hh:mm:ss,mm:ss,ss'
            timeout: '', // 超时
            outTime: undefined, // 超时后的回调
		};
		var opts = options || {};
    	for (var k in _default) {
            if (typeof opts[k] === 'undefined') {
                opts[k] = _default[k];
            }
        }
        var gTimeout;
        var secondsCount = opts.seconds;
        var mode = opts.mode;
        var format = opts.format;
        var timeout = opts.timeout;
        var outTime = opts.outTime;
        var symbol = opts.symbol.split(',');
        if (typeof symbol[3] === 'undefined') {
            symbol[3] = '';
        }
        var _D,_H,_M,_S;
        var setTimeValue = function(time) {
            if ($(selector).type == 'text' || $(selector).type == 'textare') {
                $(selector).value = time;
                return false;
            }
            $(selector).innerHTML = time;
        };
        var Timer = function() {
            _D = fixTime(parseInt(secondsCount / 3600 / 24)) + symbol[0];
            _H = fixTime(parseInt(secondsCount / 3600)) + symbol[1];
            _M = fixTime(parseInt(secondsCount / 60% 60)) + symbol[2];  
            _S = fixTime(parseInt(secondsCount % 60)) + symbol[3];
            if (/dd:hh:mm:ss/i.test(format)) {
                 
            } else if (/hh:mm:ss/i.test(format)) {
                _D = '';  
            } else if (/mm:ss/i.test(format)) {
                _D = '';
                _H = '';
                _M = fixTime(parseInt(secondsCount / 60)) + symbol[2];  
            } else if (/ss/i.test(format)) {
                _D = '';
                _H = '';
                _M = '';
                _S = secondsCount;
            }
            if (secondsCount < 0) {
                clearTimeout(gTimeout);
                gTimeout = '';
                return false;
            }
            setTimeValue(_D + _H  + _M + _S);
            gTimeout = setTimeout(Timer,1000);
            if (timeout > -1 && secondsCount - timeout == 0) {
                outTime && outTime(handle);
            }
            if (mode == 'count') {
                secondsCount ++;
            } else if (mode == 'countDown') {
                secondsCount --;
            }
        };
        var handle = (function() {
            return {
                start: function() {
                    if (!gTimeout) {
                        clearTimeout(gTimeout);
                        Timer();
                    }
                },
                pause: function() {
                    clearTimeout(gTimeout);
                    gTimeout = '';
                },
                stop: function() {
                    clearTimeout(gTimeout);
                    gTimeout = '';
                    secondsCount = 0;
                    var _dd = _D?'00' + symbol[0]:'';
                    var _hh = _H?'00' + symbol[1]:'';
                    var _mm = _M?'00' + symbol[2]:'';
                    var _ss = _S?'00' + symbol[3]:'';
                    setTimeValue(_dd + _hh  + _mm + _ss);
                },
                reset: function() {
                    secondsCount = opts.seconds;
                }
            }
        }());
        Timer();
        return handle;
    };
    /**
     * 设定日期
     * @param {[type]} options [配置对象]
     */
    MultiTime.prototype.setDate = function(options) {
        var time = new Date();
        var _default = {
            day: 0, // 第n天
            format: 'YY-MM-DD' // 时间格式 'YY-MM-DD ww:hh:mm:ss'
        };
        var opts = options || {};
        for (var k in _default) {
            if (typeof opts[k] === 'undefined') {
                opts[k] = _default[k];
            }
        }

        var day = opts.day;
        var format = opts.format;
        time.setDate(time.getDate() + day); //获取day天后的日期
        var _Y = time.getFullYear();
        var _M = '-' + fixTime(time.getMonth() + 1);
        var _D = '-' + fixTime(time.getDate());
        var _w = '&nbsp;&nbsp;星期' + '日一二三四五六'.charAt(time.getDay());
        var _h = '&nbsp;&nbsp;' + fixTime(time.getHours());
        var _m = ':' + fixTime(time.getMinutes());
        var _s = ':' + fixTime(time.getSeconds());
        if (!/Y/i.test(format)) {
            _Y = '';
        }
        if (!/M/.test(format)) {
            _M = '';
        }
        if (!/D/i.test(format)) {
            _D = '';
        }
        if (!/w/i.test(format)) {
            _w = '';
        }
        if (!/h/i.test(format)) {
            _h = '';
        }
        if (!/m/.test(format)) {
            _m = '';
        }
        if (!/s/i.test(format)) {
            _s = '';
        }
        return (_Y + _M + _D + _h + _m + _s + _w).replace(/^-|^:|^&nbsp;&nbsp;/, '');
    };
    /**
     * 转时间戳
     * @param  {[type]} time [具体日期 需要以YY-MM:DD hh:mm:ss || YY-MM:DD hh:mm]
     */
    MultiTime.prototype.timestamp = function(time) {
        var timeFmt = time.replace(/-/g,"/");
        return new Date(timeFmt).getTime();
    };
   /**
    * 日期差
    * @param  {[type]} date1 [日期1时间戳]
    * @param  {[type]} data2  [日期2时间戳]
    * @param  {[type]} format ['D'只显示天数,'H'只显示小时,'M'只显示分钟,'S'只显示秒]
    */
    MultiTime.prototype.diff = function(date1, data2, format) {
        var format = format || 'DD:hh:mm:ss',
        	diffDate = data2 - date1, //时间差的毫秒数
        	_D = '',
        	_H = '',
        	_M = '',
        	_S = '';
        if (/DD:hh:mm:ss/i.test(format)) {
            _D = fixTime(Math.floor(diffDate / (1000 * 24 * 3600))) + '天'; // 天数相差
            var _Dodd = diffDate % (1000 * 24 * 3600);    //计算天数后剩余的毫秒数
            _H = fixTime(Math.floor(_Dodd / (3600 * 1000))) +'小时'; // 小时相差
            var _Hodd = _Dodd % (3600 * 1000);        //计算小时数后剩余的毫秒数
            _M = fixTime(Math.floor(_Hodd / (60 * 1000))) +'分钟';  // 分钟相差
            var _Modd = _Hodd % (60 * 1000);      //计算分钟数后剩余的毫秒数
            _S = fixTime(Math.round(_Modd / 1000)) + '秒'; // 秒相差
        } else if (/D/i.test(format)) {
            _D = fixTime(Math.floor(diffDate / (1000 * 24 * 3600)));
        } else if (/H/i.test(format)) {
            _H = fixTime(Math.floor(diffDate / (3600 * 1000)));;
        } else if (/M/i.test(format)) {
            _M = fixTime(Math.floor(diffDate / (1000 * 60)));;
            _S = '';
        } else if (/S/i.test(format)) {
            _S = fixTime(Math.floor(diffDate / 1000));
        }
        return _D + _H + _M + _S;
    };
    module.exports = new MultiTime();
});