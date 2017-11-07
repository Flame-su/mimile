/*---------------------顶部二级下拉菜单-----------------------------*/
	$(".header_right>li").mouseover(function(){
		$(this).css("background","#fff");
		$(this).children(".hd_nv").css("display","block")
	})
	$(".header_right>li").mouseout(function(){
		$(this).css("background","");
		$(this).children(".hd_nv").css("display","")
	})
/*---------------------轮播图-----------------------------*/	
	$(function(){
		var timer=setInterval(auto,3000)
		var index=0
		function auto(){
			index++
			if(index==$(".wrapper ul>li").size()){
				index=0
			}
			$(".wrapper ul>li").eq(index).fadeIn(1500).siblings().fadeOut(1500)
			$(".wrapper ol>li").eq(index).addClass("lbbj").siblings().removeClass("lbbj")
		}
		$(".wrapper ol").on("mouseover","li",function(){
			clearInterval(timer)
			index=$(this).index()
			$(".wrapper ul>li").eq(index).stop().show().siblings().stop().hide()
			$(".wrapper ol>li").eq(index).addClass("lbbj").siblings().removeClass("lbbj")
			
		})
		$(".wrapper ol").on("mouseout","li",function(){
			 clearInterval(timer)
			 timer=setInterval(auto,3000)
		})
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
	
	/*-----------------文本第一段-----------------------*/
	$.ajax({
		type:"get",
		url:"json/content.json",
		success:function(res){
			var arr=res.content_top
			var brr=res.content_box
			var crr=res.content_bottom
			var html=""
			var src=""
			var img=""
			for(var i=0;i<arr.length;i++){
				html+=`<li><img src="img/${arr[i]}" alt="" /></li>`
			}
			for(var i=0;i<brr.length;i++){
				src+=`<li><img src="img/${brr[i]}" alt="" /></li>`
			}
			for(var i=0;i<crr.length;i++){
				img+=`<li><img src="img/${crr[i]}" alt="" /></li>`
			}
			$(".content_top_aside").html(html)
			$(".iphone").html(src)
			$(".content_bottom").html(img)
		}
	})
	/*--------------------1F-------------------------*/
	$.ajax({
		type:"get",
		url:"json/floor.json",
		success:function(res){
			one=res.first.nav;
			two=res.first.lun
			html=""
			src=""
			for(var i in one){
					html+=`<li>${one[i]}</li>`
			}
			for(var i in two){
					src+=`<li><img src="img/${two[i]}" alt="" /></li>`
			}
			$(".floor_aside_top").html(html)
			$(".floor_aside_bottom ul").html(src)
		}
	})
	/*------------------------控制内容选项卡-------------------------------------*/
	$(".first_nav>ul li").mouseover(function(){
		index=$(this).index()
		$(this).addClass("first_bj").siblings().removeClass("first_bj")
		first(index)
		if(index==0){
			$(".first_page").css("display","block")
		}else{
			$(".first_page").css("display","none")
		}
	})
	

	
	/*------------------------控制左下方无缝滚动-------------------------------------*/
	$(function(){
	     var timer=setInterval(auto,3000)
	     function auto(){
	     	$(".floor_aside_bottom ul").animate({"margin-top":"-53"},1000,function(){
	     		$(".floor_aside_bottom ul").css("margin-top","0").find("li:first").appendTo(".floor_aside_bottom ul")
	     	})
	     }
	     $(".floor_aside_bottom").mouseover(function(){
	     	clearInterval(timer)
	     })
		 $(".floor_aside_bottom").mouseout(function(){
	     	timer=setInterval(auto,3000)
	    })
		 $(".nv_right").click(function(){
		 	auto()
		 })
		  $(".nv_left").click(function(){
		  	$(".floor_aside_bottom ul").find("li:last").prependTo(".floor_aside_bottom ul")
		 	$(".floor_aside_bottom ul").css("margin-top",-53)
		 $(".floor_aside_bottom ul").animate({"margin-top":0},1000)
		})
	})
	
	

	first(1)
	function first(index){
		$.ajax({
			type:"get",
			url:"json/floor.json",
			success:function(res){
				var html=""
					pageNum = 6
						var arr=res.first.content
						console.log(index)
						for(var i=(index-1)*pageNum;i<index*pageNum;i++){	
							
							var name=arr[i].name
							var img=arr[i].img	
							var price=arr[i].price		
							var pid=arr[i].id	
							html+=`	
								<li>
									<a href="http://127.0.0.1/sxf-mimile/page.html?src=${img}&pid=${pid}" target="_blank">
										<img src="img/${img}" alt="" />
										<h3>${name}</h3>
										<p>￥${price}</p>
									</a>
								</li>
							`
						}
					$(".floor_centent>ul").html(html)
					$(".s_box5").html(html)
				}
			})
	}
	/*----------------------图片跳动--------------------------*/
	$(".floor_centent>ul").on("mouseover","img",function(){
		
		$(this).stop().animate({"top":5},1000)
	})
	$(".floor_centent>ul").on("mouseout","img",function(){
		
		$(this).stop().animate({"top":20},1000)
	})
	/*---------------------回到顶部--------------------------------*/
	$(".TOP").click(function(){
		$("body,html").animate({"scrollTop":0},1000)
	})
	/*----------------------图片跳动--------------------------*/
	$(".s_box5").on("mouseover","img",function(){
			
			$(this).stop().animate({"top":10},1000)
		})
		$(".s_box5").on("mouseout","img",function(){
			
			$(this).stop().animate({"top":20},1000)
		})
		
	/*------------------轮播图------------------------*/
	$(function(){
			var timer=setInterval(autoplay,3000)
			
			function autoplay(){
				$(".lunbo2_box").animate({"left":-389},1500,function(){
					$(this).css({"left":0}).find("li:first").appendTo($(".lunbo2_box"))
					flag = true;
				})
			}
			
			$(".lunbo2").hover(
				function(){
					clearInterval(timer)},
				function(){
					timer=setInterval(autoplay,3000)
				}
			)
			var flag = true;
			$(".lunbo2_right").click(function(){
				
				if( flag ){
						autoplay()
				}
				flag = false;
			})
			$(".lunbo2_left").click(function(){
				if(flag){
					$(".lunbo2_box").find("li:last").prependTo(".lunbo2_box")
					$(".lunbo2_box").css("left",-389)
					$(".lunbo2_box").stop().animate({"left":0},1500,function(){
						flag = true
					})
					
				}
				
				
				flag = false
			})
		})