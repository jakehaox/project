//论坛版块
boxForum();
function boxForum(){
	var hideTimer = 0;
	var boxHeader = document.getElementById('box-header');
	var headerContent = document.querySelector('.header-content');
	boxHeader.onmouseenter = function(){
		clearTimeout(hideTimer);
		headerContent.style.display = 'block';
	}
	boxHeader.onmouseleave = function(){
		hideTimer = setTimeout(function(){
			headerContent.style.display = 'none';
		},500)
	}
	headerContent.onmouseenter = function(){
		clearTimeout(hideTimer);
		headerContent.style.display = 'block';
	}
	headerContent.onmouseleave = function(){
		hideTimer = setTimeout(function(){
			headerContent.style.display = 'none';
		},500)
	}
}
//轮播图
carousel();
//加减
foldBtn();
backTop();
function carousel(){
	new Carousel({
		id:'box1',
		aImg:['images/forum-b1.png','images/forum-b2.png'],
		width:1120,
		height:460,
		playDuration:3000
	});
}
function foldBtn(){
	var aFoldBtn = document.querySelectorAll('.fold-btn');
	var aFoldHide = document.querySelectorAll('.foldbleBox');
	for(var i=0;i<aFoldBtn.length;i++){
		aFoldBtn[i].index = i;
		aFoldBtn[i].onclick = function(ev){
			if(ev.target.className == 'fold-btn'){
				var imgUrl = ev.target.style.backgroundImage;
				if(imgUrl == 'url("images/forum-line.png")'){
					ev.target.style.backgroundImage = "url('images/forum-btn-plus.png')";
					aFoldHide[this.index].style.height = '59px';
				}else{
					ev.target.style.backgroundImage = "url('images/forum-line.png')";
					aFoldHide[this.index].style.height = 'auto';
				}
			}
		}
	}
}

//处理翻页数据
handleList();
function handleList(){
	//1获取元素
	var aTabPg = document.querySelectorAll('.forum-list-pager .pg .pg-item');
	var oPre = document.querySelector('.forum-list-pager .pg .pre');
	var oNex = document.querySelector('.forum-list-pager .pg .nex');
	var oJsList = document.querySelector('.foldbleBox .js-list');
	var nPgLength = document.querySelector('.forum-list-pager .pg');
	//初始化加载
	loadData(0);
	//2添加事件
	var now = 0;//当前页
	//显示隐藏上一页下一页
	function hiddenTab(){
		if(now<aTabPg.length-1){
			oNex.style.display = 'block';
		}else{
			oNex.style.display = 'none';
		}
		if(now){
			oPre.style.display = 'block';
		}else{
			oPre.style.display = 'none';
		}	
	}
	function backJsList(){
			var scrollToJsList = window.setInterval(function() {
			    var pos = window.pageYOffset;
			    if ( pos > oJsList.offsetTop-59 ) {
			        window.scrollTo( 0, pos - 50 ); // how far to scroll on each step
			    } else {
			        window.clearInterval( scrollToJsList );
			    }
			}, 10); // how fast to scroll (this equals roughly 60 fps)	
	}
	for(var i=0;i<aTabPg.length;i++){
		aTabPg[i].index = i;
		aTabPg[i].onclick = function(){
			//排它
			for(var j=0;j<aTabPg.length;j++){
				aTabPg[j].className = 'pg-item';
			}
			this.className = 'pg-item active-pg';
			//加载数据
			loadData(this.index);
			now = this.index;
			hiddenTab();
			backJsList();
		}
		//上一页
		oPre.onclick = function(){
			for(var j=0;j<aTabPg.length;j++){
				aTabPg[j].className = 'pg-item';
			}
			var pgNow = --now;
			if(!(pgNow<0)){
				loadData(pgNow);
				aTabPg[pgNow].className = 'pg-item active-pg';
			}else if(pgNow==0){
				console.log('aa')
				oPre.style.display = 'none';
			}
			hiddenTab();
			backJsList();			
		}
		//下一页
		oNex.onclick = function(){
			for(var j=0;j<aTabPg.length;j++){
				aTabPg[j].className = 'pg-item';
			}
			var pgNow = ++now;
			loadData(pgNow);
			aTabPg[pgNow].className = 'pg-item active-pg';
			hiddenTab();
			backJsList();				
		}

	
	}
	//居中
	nPgLength.style.left = oJsList.offsetWidth*0.5 + 'px';
	nPgLength.style.marginLeft = -nPgLength.offsetWidth*0.5 + 'px';
	function loadData(index){
		var data = aPgItemData[index];
		// console.log(data[0].bImg)
		var html = '';
		//根据数据构建html
		for(var i=0;i<data.length;i++){
			html += '<div class="discuss-box">';
			html += '	<div class="portrait">';
			html += '		<a href="#"><img src="' + data[i].bImg + '" alt=""></a>';
			html += '		<div class="avatar-level-icon"><img src="'+ data[i].sImg +'" alt=""></div>';
			html += '	</div>';
			html += '	<div class="discuss-content">';
			html += '		<h5>';
			html += '			<a href="#">';
			html += 	data[i].head;
			html += '			</a>';
			html += '		</h5>';
			html += '		<ul class="post-info">';
			html += '			<li class="author"><a href="/?50">'+ data[i].author +'</a></li>';
			html += '			<li class="time">'+ data[i].time +'</li>';
			html += '			<li class="review">'+data[i].review+'</li>';
			html += '			<li class="browse">'+data[i].browse+'</li>';
			html += '		</ul>';
			html += '	</div>';
			html += '</div>	';
		}
		oJsList.innerHTML = html;
	}
	
}
//返回顶部
function backTop(){
	var oBtn11 = document.querySelector('.back-top')
	oBtn11.onclick = function(){
		var scrollToTop = window.setInterval(function() {
		    var pos = window.pageYOffset;
		    if ( pos > 0 ) {
		        window.scrollTo( 0, pos - 88 ); // how far to scroll on each step
		    } else {
		        window.clearInterval( scrollToTop );
		    }
		}, 10); // how fast to scroll (this equals roughly 60 fps)	
	}
}