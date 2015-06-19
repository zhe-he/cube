document.addEventListener('DOMContentLoaded', function (){
	var speed = 5;				//键盘上下左右速度
	var speedM = 3;				//鼠标拖动速率(越小越快)

	var speedS = 60; 			//键盘+- 速度
	var speedSM = 2; 			//鼠标滚轮速率(越小越快)



	var oBox = document.getElementById('main');
	var oTab = document.getElementById('tab');
	var aUl = oBox.getElementsByClassName('cell');

	var initX = 20;
	var initY = -20;
	var initP = 1600;

	var bLeft,bRight,bTop,bBottom,bBig,bSmall,bCenter;
	var timer = null,ready;


	document.addEventListener('keydown', function (ev){
		setCode(ev, true, 'down');
	}, false);
	document.addEventListener('keyup', function (ev){
		setCode(ev, false, 'up');
	}, false);

	//切换
	oTab.addEventListener('click', function (){
		if(this.ready){
			this.ready = false;
			document.removeEventListener('mousedown', tototo, false);
			document.removeEventListener('contextmenu', tabFn, false);
			timer = setInterval(gogogo, 16.7);
			removeScrollMove(window, scrollMoveFn)
			this.innerHTML = '开启鼠标之旅（右键滚轮拖动）';
		}else{
			this.ready = true;
			clearInterval(timer);
			document.addEventListener('mousedown',tototo, false);
			document.addEventListener('contextmenu', tabFn, false);
			scrollMove(window,scrollMoveFn);
			this.innerHTML = '开启键盘之旅（上下左右空格+-）';
		}
	}, false);
	
	//定时器
	function gogogo(){
		if (bLeft) {
			initX -= speed;
		};
		if (bRight) {
			initX += speed;
		};
		if (bTop) {
			initY -= speed;
		};
		if (bBottom) {
			initY += speed;
		};
		if (bBig) {
			initP -= speedS;
		};
		if (bSmall) {
			initP += speedS;
		};
		if (bCenter) {
			for (var i = 0; i < aUl.length; i++) {
				aUl[i].classList.add('active');
			};
		} else {
			for (var i = 0; i < aUl.length; i++) {
				aUl[i].classList.remove('active');
			};
		}

		if (initP >= 3700) {
			initP = 3700;
		}else if(initP <= 460) {
			initP = 460;
		};
		oBox.style.transform = 'perspective('+initP+'px) rotateY('+initX+'deg) rotateX('+initY+'deg)';
	}
	function tototo(ev){
		ev.preventDefault();
		var oldX = ev.clientX;
		var oldY = ev.clientY;
		var lastX = 0;
		var lastY = 0;

		document.addEventListener('mousemove', move, false);
		document.addEventListener('mouseup', up, false);

		//move
		function move(ev){
			
			var disX = ev.clientX - oldX;
			var disY = ev.clientY - oldY;

			lastX = disX/speedM;
			lastY = disY/speedM;
			
			oBox.style.transform = 'perspective('+initP+'px) rotateY('+(initX+lastX)+'deg) rotateX('+(initY+lastY)+'deg)';
		}
		//end
		function up(ev){

			initX += (ev.clientX - oldX)/speedM;
			initY += (ev.clientY - oldY)/speedM;
			oBox.style.transform = 'perspective('+initP+'px) rotateY('+initX+'deg) rotateX('+initY+'deg)';
			document.removeEventListener('mousemove', move, false);
			document.removeEventListener('mouseup', up, false);
		}
	}

	//检测键值
	function setCode(ev,bool,type){
		switch(ev.keyCode){
			case 37:
				bLeft = bool;
				break;
			case 38:
				bTop = bool;
				break;	
			case 39:
				bRight = bool;
				break;
			case 40:
				bBottom = bool;
				break;
			case 107:
				bBig = bool;
				break;
			case 109:
				bSmall = bool;
				break;
			case 32:
				if(type === 'down'){
					bCenter = !bCenter;
				}
				break;
		}
		if (ev.shiftKey && ev.keyCode === 187) {
			bBig = bool;
		};
		if (ev.shiftKey && ev.keyCode === 189) {
			bSmall = bool;
		};
	}

	//滚动兼容
	function scrollMove(obj, Wheelfn){
		var mouse = 'onmousewheel' in window?'mousewheel':'DOMMouseScroll';
		obj.addEventListener(mouse, Wheelfn, false);
	}
	function removeScrollMove(obj, Wheelfn){
		var mouse = 'onmousewheel' in window?'mousewheel':'DOMMouseScroll';
		obj.removeEventListener(mouse, Wheelfn, false);
	}
	//滚动
	function scrollMoveFn(ev) {
		var down;
		down = ev.wheelDelta?-ev.wheelDelta:ev.detail*40;
		initP+=down/speedSM;
		if (initP >= 3700) {
			initP = 3700;
		}else if(initP <= 460) {
			initP = 460;
		};
		oBox.style.transform = 'perspective('+initP+'px) rotateY('+initX+'deg) rotateX('+initY+'deg)';
		ev.preventDefault();
	}

	//鼠标右键
	function tabFn(ev){
		for (var i = 0; i < aUl.length; i++) {
			//contains
			aUl[i].classList.toggle('active');
		};
		ev.preventDefault();
	}

	//运行
	oTab.click();
}, true);