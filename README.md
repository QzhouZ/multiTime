# multiTime
多功能时间插件，包括计时、倒计时、日期设定、日期差、转时间搓等功能。

### 使用方法
	seajs.use("multiTime", function(time) {

        // 倒计时
        var t = time.timer('#t1', {
            seconds: 15000,
            mode: 'countDown',
            format: 'hh:mm:ss'
        });
		// 暂停
        $('#pause').on('click', function() {
            t.pause();
        });
		// 开始
        $('#start').on('click', function() {
            t.start();
        });
		// 计时
        var t2 = time.timer('#t2', {
            seconds: 15,
            mode: 'count'
        });
		// 暂停
        $('#pause2').on('click', function() {
            t2.pause();
        });
		// 开始
        $('#start2').on('click', function() {
            t2.start();
        });
		// 停止
        $('#stop2').on('click', function() {
            t2.stop();
        });

        // 设定日期
        $("#set_today").html(time.setDate({
            format: 'YY-MM-DD ww:hh:mm:ss'
        }));
		// 7天前
        $("#set_today-7").html(time.setDate({
            day: -7
        }));
		// 7天后
        $("#set_today7").html(time.setDate({
            day: 7,
            format: 'YY-MM-DD ww:hh:mm'
        }));

        // 转时间戳
        var timestamp1 = time.timestamp('2015-01-03 10:10:11');
        var timestamp2 = time.timestamp('2015-02-13 11:25:33');
        $("#timestamp1").html(timestamp1);
        $("#timestamp2").html(timestamp2);

        // 日期差
        var diff = time.diff(timestamp1, timestamp2);
        $("#diff").html(diff);
    });