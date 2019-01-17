//郝鑫宁   js部分

/*
   处理导航栏部分
*/

// headleElecProduct();
// function headleElecProduct(){
// 	//获取元素
// 	var oDescribeList = document.querySelectorAll('.describe-list img');
// 	var aLeftArrow = document.querySelector('.left-arrow');
// 	var aRightArrow = document.querySelector('.right-arrow');
// 	var aName = document.querySelector('.name');
// 	var oTxt4 = document.querySelector('.txt4');
// 	var oTxt5 = document.querySelector('.txt5');
// 	var aYear = document.querySelector('.year');
// 	//添加事件
// 	aLeftArrow.oncilck = function(){
// 		for(var i =0;i<oDescribeList.length;i++){
// 		console.log(oDescribeList);
// 	    }
// 	}

// }
//处理顶部	
var oUserInfo = document.getElementById('user-info');
var oUserInfoRight = document.getElementById('user-info-right');
window.onscroll = function(){
	getScrollTop();
	if(getScrollTop() >= 100){
		oUserInfo.style.position = 'fixed';
		oUserInfo.style.top = '0px';
		oUserInfo.style.zIndex = '99';
	}else{
        oUserInfo.style.position = '';

	}
}
// 顶部导航购物车js
	var oLink = document.getElementById('link');
	var oTankuang = document.getElementById('tankuang');
	oLink.onmouseover = function(){
		oTankuang.style.display = 'block';
	}
	oLink.onmouseout = function(){
		oTankuang.style.display = 'none';
	}
	

// 底部锤子应用js
	var oFootBox = document.querySelector('.foot .foot-nav .right-nav');
	var oFootBtn = document.querySelector('.foot .foot-nav .right-nav .link i');
	var oFootYing = document.querySelector('.foot .foot-nav .right-nav .ying');
	var oFootZhong = document.querySelector('.foot .foot-nav .right-nav .link');
	// console.log(oFootBox);
	var isShow = false;
	oFootBox.onclick = function(){
		if (!isShow) {
			oFootBox.className = 'right-nav active';
			oFootBtn.style.transform = 'rotate(180deg)';
			oFootYing.style.visibility = 'visible';
			oFootYing.style.opacity = '1';
			oFootZhong.className = 'link active';
			isShow = true;
		}else{
			if (isShow) {
				oFootBox.className = 'right-nav';
				oFootBtn.style.transform = 'rotate(0deg)';
				oFootYing.style.visibility = 'hidden';
				oFootYing.style.opacity = '0';
				oFootZhong.className = 'link';
				isShow = false;
			}
		}
		
	}
