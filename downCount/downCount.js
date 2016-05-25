(function ($) {
    $.fn.downCount = function (options,endDownCount,beingDownCount) {
        var settings = $.extend({
                id:null,
                date: null,
                run:1000,
                content:'',
                serverOffset:0//,服务器偏移时间
                //offset: 8//表区时
            }, options);
        // dom节点和其他
        var $this   = this,
            setId   = settings.id,//商品的id
            setDate = settings.date.replace(/-/g, "/"),//格式化时间
            setRun  = settings.run,//定时器时间
            setContent = settings.content,//倒计时前缀
            setServerOffset = settings.serverOffset;//服务器偏移时间
            //setOffset  = settings.offset;//时间偏移小时
        // 抛异常
        if (!settings.date) {
            $.error('请设定时间');
        }
        // 抛异常
        if (!Date.parse(setDate)) {
            $.error('注意日期格式为 1992-09-21 12:00:00.');
        }      
        /**
         * 改变客户的本地日期匹配偏移的时间
         * @return 当前时间+本地时间
         */
        var currentDate = function () {
            var date = new Date();
            //var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
            //var new_date = new Date(utc + (3600000*setOffset));
            var new_date = new Date(date.getTime() + setServerOffset);
            return new_date;
        };

        /**
         *倒计时计算
         */
        function countdown () {
            var target_date = new Date(setDate), // 传入时间
                current_date = currentDate(); //得到固定的当前日期

            // 时间差
            var difference = target_date - current_date;

            // 如果时间过了或者节点被删除；停止定时器
            if (difference < 0||!$('.downCount[data-id='+setId+']').length) {
                clearInterval(interval);
                if (endDownCount && typeof endDownCount === 'function') endDownCount();//回调
                return;
            }
            //可以考虑加入正在进行的状态
            //if (beingDownCount && typeof beingDownCount === 'function') beingDownCount(setting.time);//回调
            var  _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;

            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second);
                mseconds = Math.floor((difference /10 % 100));
                //转格式
                days = (String(days).length >= 2) ? days : '0' + days;
                hours = (String(hours).length >= 2) ? hours : '0' + hours;
                minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;
                mseconds = (String(mseconds).length >= 2) ? mseconds : '0' + mseconds;

            var time=setContent+days+"天"+hours+"小时"+minutes+"分"+seconds+"秒"+(setRun==10?mseconds:'');
            $this.text(time);
        }       
        //开始定时器
        /*if(new Date(setDate)-currentDate()>0){
            countdown();存在问题；触发两次回调
        }*/
        var interval = setInterval(countdown, setRun);
    };
})(jQuery);