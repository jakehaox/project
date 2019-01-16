//显示空购物车
cartEmpty();
function cartEmpty(){
	var oCartContent = document.querySelector('.cart-empty');
	var oCart11 = document.querySelector('.cart11');
	oCart11.onmouseenter = function(){
		animate(oCartContent,{height:314},true);
	}
	oCart11.onmouseleave = function(){
		animate(oCartContent,{height:0},true);
	}
}
//处理导航
handleNav();
function handleNav(){
	//1获取导航列表
	var aNavItem = document.querySelectorAll('.header .header-nav .nav-item');
	var oNavContent = document.querySelector('.header .header-nav-content');
	var oNavContentContainer = oNavContent.querySelector('.container');
	var hideTimer = 0;
	var loadTimer = 0;
	//2批量监听导航列表事件
	for(var i=0;i<aNavItem.length-3;i++){
		aNavItem[i].index = i;
		aNavItem[i].onmouseenter = function(){
			clearTimeout(hideTimer);			
			oNavContent.style.borderTop = '1px solid #ccc';
			oNavContentContainer.innerHTML = '<div class="loader"></div>';
			animate(oNavContent,{height:300},true,function(){
				oNavContent.style.overflow = 'visible';
			});
			//模拟加载数据
			var index = this.index;
			clearTimeout(loadTimer);
			loadTimer = setTimeout(function(){
				switch(index){
					case 0:
					case 3:
					case 6:
						if(index==3){
							index=1;
						}else if(index==6){
							index=2;
						}
						loadData2(index);
						if(index==0){
							document.querySelectorAll('.nav-goods-list2>li')[1].style.width = '404px';
						}						
						break;
					default:
						loadData(index);
				}
			},500)
		}
		//2鼠标移除事件
		aNavItem[i].onmouseleave = function(){
			hideNavContent();
		}
	}
	oNavContent.onmouseenter = function(){
		clearTimeout(hideTimer);
	}
	oNavContent.onmouseleave = function(){
		hideNavContent();
	}

	function hideNavContent(){
		hideTimer = setTimeout(function(){
			oNavContent.style.overflow = 'hidden';
			animate(oNavContent,{height:0},true,function(){
				oNavContent.style.borderTop = 'none';
			});	
		},500)
	}
	function loadData(index){
		var data = aNavItemData[index];
		var html = '<ul class="nav-goods-list clearfix">';
		for(var i = 0;i<data.length;i++){
			html += '<li>';
			html +=	'	<a href="#"></a>';
			html +=	'	<img src="'+data[i].img+'" alt="">';
			html +=	'<h6 class="pro-name">'+ data[i].proName +'</h6>';
			html +=	'<span class="price">'+ data[i].price +'</span>';
			html +=	'</li>';
		}
		html += '</ul>';
		oNavContentContainer.innerHTML = html;
	}	
	function loadData2(index){
		console.log('0:3:6::'+index);
		var data = aNavItemData2Title[index];
		var data2 = aNavItemData2[index];
		var html = '<ul class="nav-goods-list2">';
		for(var i = 0;i<data.length;i++){
			html += '<li>';
			html += '<h5>'+ data[i].title +'</h5>';
			for(var j=0;j<data2[i].length;j++){
			html += '<span class="goods-li">';
			html += '<a href="#"></a>';
			html += '<img src="'+ data2[i][j].img +'" alt="">';
			html += '<span>'+ data2[i][j].dir +'</span>';
			html += '</span>';
			}
			html += '</li>';
		}
		html += '</ul>';
		oNavContentContainer.innerHTML = html;
	}		
}
// handleNav2();
function handleNav2(){
	//1获取导航列表
	var aNavItem = document.querySelectorAll('.header .header-nav .nav-item');
	var oNavContent = document.querySelector('.header .header-nav-content');
	var oNavContentContainer = oNavContent.querySelector('.container');
	var hideTimer = 0;
	var loadTimer = 0;
	//2批量监听导航列表事件
	for(var i=0;i<aNavItem.length-3;i++){
		aNavItem[i].index = i;
		aNavItem[i].onmouseenter = function(){
			clearTimeout(hideTimer);			
			oNavContent.style.borderTop = '1px solid #ccc';
			oNavContentContainer.innerHTML = '<div class="loader"></div>';
			animate(oNavContent,{height:222},false,function(){
				oNavContent.style.overflow = 'visible';
			});
			//模拟加载数据
			var index = this.index;
			//去除不必要的加载
			clearTimeout(loadTimer);
			loadTimer = setTimeout(function(){
				loadData2(index);
			},60)
		}
		//2鼠标移除事件
		aNavItem[i].onmouseleave = function(){
			hideNavContent();
		}
	}
	oNavContent.onmouseenter = function(){
		clearTimeout(hideTimer);
	}
	oNavContent.onmouseleave = function(){
		hideNavContent();
	}

	function hideNavContent(){
		hideTimer = setTimeout(function(){
			oNavContent.style.overflow = 'hidden';
			animate(oNavContent,{height:0},false,function(){
				oNavContent.style.borderTop = 'none';
			});	
		},60)
	}
	function loadData2(index){
		console.log(index);
		var data = aNavItemData2Title[index];
		console.log(data);
		var data2 = aNavItemData2;
		console.log(data2.length);
		var html = '<ul class="nav-goods-list2">';
		for(var i = 0;i<data.length;i++){
			html += '<li>';
			html += '<h5>'+ data[i].title +'</h5>';
			for(var j=0;j<data2[i].length;j++){
			html += '<span class="goods-li">';
			html += '<a href="#"></a>';
			html += '<img src="'+ data2[i][j].img +'" alt="">';
			html += '<span>'+ data2[i][j].dir +'</span>';
			html += '</span>';
			}
			html += '</li>';
		}
		html += '</ul>';
		oNavContentContainer.innerHTML = html;
	}		
}