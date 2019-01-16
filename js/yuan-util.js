/*
* @Author: TomChen
* @Date:   2018-12-09 17:11:35
* @Last Modified by:   TomChen
* @Last Modified time: 2018-12-11 18:46:30
*/


/**
 * @param  {object} obj    [DOM节点对象]
 * @param  {object} options   [属性和目标值的对象]
 * @param  {boolean} isLinear [是否是匀速动画]
 * @param  {function} fnEnd [动画结束时执行的函数]
 */
function animate(obj,options,isLinear,fnEnd){
	//设置默认是匀速动画
	if(isLinear == undefined){
		isLinear = true;
	}
	//防止多次操作开启多个定时器
	clearInterval(obj.timer);
	//速度/步长
	var iSpeed = 0;

	obj.timer = setInterval(function(){
		//代表是否终止所有的动画
		var isStopAll = true;
		for(var attr in options){
			//isStopCurrent代表是否终止当前动画,由于在循环定时器中,所以每次执行都会变为false,代表不终止当前动画
			var isStopCurrent = false;
			//获取当前的最新的值
			var current = parseFloat(getComputedStyle(obj,false)[attr]);
			
			//opacity属性的处理
			if(attr == 'opacity'){
				//1.乘以100是为了计算
				//2.四舍五入是为了处理小数
				current = Math.round(current*100);
			}
			//匀速动画的处理
			if(isLinear){
				//确定匀速动画的速度
				if(current > options[attr]){
					iSpeed = -20;
				}else{
					iSpeed = 20;
				}
				//匀速动画终止条件
				if(Math.abs(options[attr] - current) < Math.abs(iSpeed)){
					//匀速动画终止后的处理:如果最后一次动画不够一个速度的话,直接到达目标值
					if(attr == 'opacity'){
						obj.style.opacity = options[attr] / 100;
					}else{
						obj.style[attr] = options[attr] + 'px';
					}
					//代表终止当前的动画					
					isStopCurrent = true;
				}else{
					//代表当前的动画还没有结束,所以不能终止所有的动画
					isStopAll = false;
				}
			//减速动画的处理
			}else{
				//确定减速动画的速度
				iSpeed = (options[attr] - current)/10;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				//减速动画的终止条件
				if(!iSpeed){
					//代表终止当前的动画
					isStopCurrent = true;
				}else{
					//代表当前的动画还没有结束,所以不能终止所有的动画
					isStopAll = false;
				}
			}
			//如果不终止当前动画,运动
			if(!isStopCurrent){
				if(attr == 'opacity'){
					obj.style.opacity = (current + iSpeed)/100 ;
				}else{
					obj.style[attr] = current + iSpeed + 'px';
				}	
			}
		}
		//如果终止所有动画,清除定时器
		if(isStopAll){
			clearInterval(obj.timer);
			//动画执行完毕后的执行函数
			typeof fnEnd == 'function' && fnEnd();				
		}		
	},30)
}
function getScrollTop(){
	return  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;	
}
function getScrollLeft(){
	return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
}


//处理轮播图
function Carousel(options){
	//1.罗列属性
	this.oBox = document.getElementById(options.id);
	this.aImg = options.aImg;
	this.width = options.width;
	this.height = options.height;
	this.oLeftArrow = null;
	this.oRightArrow = null;
	this.oUlBtn = null;
	this.playDuration = options.playDuration;
	this.now = 0;//显示当前图片的下标
	//初始化DOM节点
	this.init();
	//3.绑定事件
	this.bindEvent();
	//自动播放
	if(this.playDuration){
		this.auto();
	}
}
Carousel.prototype.init = function(){
	this.oBox.style.width = this.width + 'px';
	this.oBox.style.height = this.height + 'px';
	this.oBox.style.position = 'relative';
	//添加图片的容器到外层父容器中
	this.oUlImg = document.createElement('ul');
	this.oBox.appendChild(this.oUlImg);
	//3.生成底部指示按钮
	this.oUlBtn = document.createElement('ul');
	this.oUlBtn.style.zIndex = 99;
	this.oUlBtn.className = 'bottomBtn';
	this.oBox.appendChild(this.oUlBtn);
	for(var i=0;i<this.aImg.length;i++){
		//图片li
		var oLi = document.createElement('li');
		this.oUlImg.appendChild(oLi);
		oLi.style.position = 'absolute';
		oLi.style.left = '0px';
		oLi.style.top = 'opx';
		//底部按钮li
		var oBtn = document.createElement('li');
		this.oUlBtn.appendChild(oBtn);
		if(i == 0){
			oLi.style.zIndex = 1;
			oLi.style.opacity = 1;
			oBtn.className = 'active';
		}else{
			oLi.style.zIndex = 0;
			oLi.style.opacity = 0.5;
		}
		var oImg = document.createElement('img');
		oImg.src = 'images/forum-b' + (i+1) + '.png';
		oImg.style.width = this.width + 'px';
		oImg.style.height = this.height + 'px';
		oLi.appendChild(oImg);
	}
	this.oUlBtn.style.position = 'absolute';
	this.oUlBtn.style.left = this.width * 0.5 + 'px';
	this.oUlBtn.style.bottom = '20px';
	// console.log(this.oUlBtn.offsetWidth);
	this.oUlBtn.style.marginLeft = - this.oUlBtn.offsetWidth * 0.5 +'px';

	//2.生成左右按钮
	this.oLeftArrow = document.createElement('span');
	this.oRightArrow = document.createElement('span');
	this.oLeftArrow.className = 'leftArrow';
	this.oLeftArrow.style.zIndex = 99;
	this.oLeftArrow.innerHTML = '&gt;';
	this.oRightArrow.className = 'rightArrow';
	this.oRightArrow.style.zIndex = 99;
	this.oRightArrow.innerHTML = '&gt;';
	//添加左右按钮到外层父容器中
	this.oBox.appendChild(this.oLeftArrow);
	this.oBox.appendChild(this.oRightArrow);
}
Carousel.prototype.bindEvent = function(){
	var _this = this;
	//绑定右按钮
	// console.log(this);
	this.oRightArrow.onclick = function(){
		//显示下一张
		_this.now++;
		if(_this.now>=_this.aImg.length){
			_this.now = 0;
		}
		_this.tab();
	}
	//绑定左按钮
	this.oLeftArrow.onclick = function(){
		//显示下一张
		_this.now--;
		if(_this.now < 0){
			_this.now = _this.aImg.length -1;
		}
		_this.tab();
	}
	//绑定底部指示按钮
	for(var i=0;i<this.oUlBtn.children.length;i++){
		this.oUlBtn.children[i].index = i;
		this.oUlBtn.children[i].onclick = function(){
			if(!(_this.now==this.index)){
				_this.now = this.index;
				_this.tab();
			}
		}
	}
	
}
Carousel.prototype.tab = function(){
	//1.清除所有(图片的zIndex和底部按钮的active和opacity)
	for(var i=0;i<this.aImg.length;i++){
			this.oUlImg.children[i].style.zIndex = 0;
			this.oUlImg.children[i].style.opacity = 0.5;//this.oUlImg.children是oLi
			this.oUlBtn.children[i].className = '';
		}
	this.oUlImg.children[this.now].style.zIndex = 1;
	// this.oUlImg.children[this.now].style.opacity = 1;
	animate(this.oUlImg.children[this.now],{opacity:100});
	this.oUlBtn.children[this.now].className = 'active';
}
Carousel.prototype.auto =function(){
	var timer = 0;
	var _this = this;
	timer = setInterval(this.oRightArrow.onclick,this.playDuration);

	this.oBox.onmouseover = function(){
		clearInterval(timer);
	}
	this.oBox.onmouseout = function(){
		timer = setInterval(_this.oRightArrow.onclick,_this.playDuration);
	}
}



