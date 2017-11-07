/*---------------------顶部二级下拉菜单-----------------------------*/
	$(".header_right>li").mouseover(function(){
		$(this).css("background","#fff");
		$(this).children(".hd_nv").css("display","block")
	})
	$(".header_right>li").mouseout(function(){
		$(this).css("background","");
		$(this).children(".hd_nv").css("display","")
	})

	/*---------------------三级目录-----------------------------*/
	$.ajax({
		type:"get",
		url:"json/nav.json",
		success:function(res){
			var str=""
			var html=""
			for(var i in res){
				str+=`<li>${i}</li>`
				var html1=""
				for(var j in res[i]){
					var html2=""
					for(var m in res[i][j]){
						html2+=`<span><a href="">${res[i][j][m]}</a></span>`
					}
					html1+=`<li><a href="">${j}<i>></i></a> <div>`+html2+`</div></li>`
				}
				html+=`<ul><h3>${i}</h3>`+html1+`</ul>`
			}
			$(".nav_first").html(str)
			$(".nav_second").html(html)
		}
	})
	$(".nav_first").on("mouseover","li",function(){
		var h=$(this).index()*50
		$(".nav_second").css({"display":"block","top":h})
		$(".nav_second>ul").eq($(this).index()).css("display","block").siblings().css("display","none")
	})
	$(".nav_first").mouseout(function(){
		$(".nav_second").css("display","none")
	})
	$(".nav_second").mouseover(function(){
		
		$(".nav_second").css("display","block")
	})
	$(".nav_second").mouseout(function(){
		$(".nav_second").css("display","none")
	})
	
	/*---------------------回到顶部--------------------------------*/
	$(".TOP").click(function(){
		$("body,html").animate({"scrollTop":0},1000)
	})
	
	