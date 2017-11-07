/*---------------------顶部二级下拉菜单-----------------------------*/
	$(".header_right>li").mouseover(function(){
		$(this).css("background","#fff");
		$(this).children(".hd_nv").css("display","block")
	})
	$(".header_right>li").mouseout(function(){
		$(this).css("background","");
		$(this).children(".hd_nv").css("display","")
	})
/*---------------------回到顶部--------------------------------*/
	$(".TOP").click(function(){
		$("body,html").animate({"scrollTop":0},1000)
	})
	
