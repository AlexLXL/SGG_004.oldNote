/**
*用途：封装的函数
*作者：Alex浪、联系方式：www.@l738367@tom.com
*制作日期：2019-5-13
**/
(function(w){
	var mousetimer = null;
	var isAnimation = false;
    w.lang = {};
	
	//================
	// 拖拽封装
	//================
    function drop(Ele,callBack1){/*记得开position*//*callback是回调函数，也是一个对象*/
        Ele.onmousedown = function(ev){
            Ele.setCapture?Ele.setCapture():"";//兼容ie678的全局捕获、主要是ie678全选的时候无法拖动,把鼠标事件强制绑定给当前浏览器线程，当前Ele一直被绑定
            ev = ev||event; /*support IE*/
            var EleIni = {left:0,top:0};
            var mouseIni = {left:0,top:0};
            mouseIni.top = ev.clientY;
            mouseIni.left = ev.clientX;
            EleIni.top = Ele.offsetTop;
            EleIni.left = Ele.offsetLeft;
			if(callBack1&&typeof callBack1["down"] ==="function"){//如果放在onclick里面是异步函数，会延迟加载，放在外面会第一时间加载
                   callBack1["down"]();
            }

            document.onmousemove = function (ev) {
                ev = ev||event;
                ev.preventDefault?ev.preventDefault():ev.returnValue = false; /*support IE*/
                var mouseTs = {left:0,top:0};
                mouseTs.top = ev.clientY;
                mouseTs.left = ev.clientX;

                var T = EleIni.top + mouseTs.top - mouseIni.top;
                var L = EleIni.left + mouseTs.left - mouseIni.left;
                T = T<0?0:T;
                L = L<0?0:L;
                T = T>Ele.parentNode.offsetHeight-Ele.offsetHeight?Ele.parentNode.offsetHeight-Ele.offsetHeight:T;
                L = L>Ele.parentNode.offsetWidth-Ele.offsetWidth?Ele.parentNode.offsetWidth-Ele.offsetWidth:L;

                // Ele.style.top = T + "px";
                Ele.style.left = L + "px";

                if(callBack1&&typeof callBack1["move"] ==="function"){//如果放在onclick里面是异步函数，会延迟加载，放在外面会第一时间加载
                    callBack1["move"]();
                }
            };

            document.onmouseup = function () {
                document.releaseCapture?document.releaseCapture():""; /*support IE*/
                document.onmousemove = document.onmouseup =null;
				if(callBack1&&typeof callBack1["up"] ==="function"){//如果放在onclick里面是异步函数，会延迟加载，放在外面会第一时间加载
                    callBack1["up"]();
                }

            }
        }
    }
	
	//================
	//滚轮封装
	//================
	function mousescroll(mousetimer) {/*传一个全局的变量用来存定时器[有关定时器的都放在全局，*/
										/*不然后面局部和全局的会乱一团,*/
										/*var mousetimer = null；]*/
		document.onmousewheel = function (event) {	
			clearTimeout(mousetimer);				//滚轮优化，清除异步队列，只执行最后一次滚动:思想，多次运行的时候,选择第一次有效或最后一次有效
			mousetimer = setTimeout(function () {
				scrollMove(event);
			},200)
		};
		if(document.addEventListener){
			document.addEventListener('DOMMouseScroll',function (event) {
				clearTimeout(mousetimer);
				mousetimer = setTimeout(function () {
					scrollMove(event);
				},200)
			})
		}

		function scrollMove(event) {
			event = event || window.event;

			var flag = '';
			if(event.wheelDelta){
				if(event.wheelDelta > 0){
					flag = 'up';	//滚轮向上滚
				}else {
					flag = 'down'	
				}
			}else if(event.detail){
				if(event.detail < 0){
					flag = 'up';
				}else {
					flag = 'down'
				}
			}

			switch (flag){
				case 'up':
					alert("向上滚动时的操作");
					move(mouseIndex);
					break;
				case 'down':
					alert("向下滚动时的操作");
					move(mouseIndex);
					break;
			}

			//取消默认行为
			event.preventDefault && event.preventDefault();
			return false;
		}
	}
		
	//================
	//检测动画执行状态
	//================
	function Check(time){
		if(isAnimation){                /*动画播放过程中禁止点击*/
                return;
        }
        isAnimation = true;
        setTimeout(function () {
            isAnimation = false;
        },time);
	}
	
	//================
	//transform封装
	//================
	function setTransform(Node,name,value) {
        if(!Node.obj){
            Node.obj = {};
        }

        if(arguments.length > 2){
            Node.obj[name] = value;
            var result = '';
            for(var key in Node.obj){
                switch (key) {
                    case 'translateX':
                    case 'translateY':
                    case 'translateZ':
                    case 'translate':
                        result += key + '(' + Node.obj[key] + 'px) ';
                        break;

                    case 'rotateX':
                    case 'rotateY':
                    case 'rotateZ':
                    case 'rotate':
                    case 'skewX':
                    case 'skewY':
                    case 'skew':
                        result += key + '(' + Node.obj[key] + 'deg) ';
                        break;

                    case 'scaleX':
                    case 'scaleY':
                    case 'scale':
                        result += key + '(' + Node.obj[key] + ') ';
                        break;
                }
            }
            Node.style.transform = result;
        }else{
            var result2 = '';
            if(Node.obj[name] === undefined){
                if(name === 'scaleX' || name === 'scaleY' || name === 'scale'){
                    result2 = 1;
                }else{
                    result2 = 0;
                }
            }else {
                result2 = Node.obj[name];
            }
            return result2;
            // return Node.obj[name];
        }
    }
    
	
	w.lang.drop = drop;
	w.lang.mousescroll = mousescroll;
	w.lang.Check = Check;
	w.lang.setTransform = setTransform;
	
	/*
	w.lang = {
		drop:drop,
		mousescroll:mousescroll,
		Check:Check,
		setTransform:setTransform
	};
	*/
	
})(window);