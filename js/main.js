requirejs.config({
	paths: {
		"jquery": "jquery-1.11.1.min",
		"vd": "validate"
	}
})

requirejs(["jquery", "vd"], function($, vd) {
	var flagName = false
	$(".txt1").blur(function() {
		txt1 = $(this).val()
		if(vd.checkName(txt1)) {
			$(this).next("i").css("display", "block")
			$(this).css("border", "")
			$(this).next().next().css("opacity", 0)
			flagName = true
		} else {
			$(this).next("i").css("display", "none")
			$(this).next().next().css("opacity", 1)
			$(this).css("border", "1px solid red")
			flagName = false
		}
	})
	var flagPass = false
	$(".txt2").blur(function() {
		var txt2 = $(this).val()
		if(vd.checkPass(txt2)) {
			$(this).next("i").css("display", "block")
			$(this).css("border", "")
			$(this).next().next().css("opacity", 0)
			flagPass = true
		} else {
			$(this).next("i").css("display", "none")
			$(this).next().next().css("opacity", 1)
			$(this).css("border", "1px solid red")
			flagPass = false
		}
	})
	$(".btn2").click(function() {
		if(flagName) {
			$(".mask").css("display", "block")
			var i = 10
			timer = setInterval(fn, 1000)

			function fn() {
				$(".btn2").val(i--)
				if(i == 0) {
					$(".btn2").val("获取验证码")
					clearInterval(timer)
					$(".mask").css("display", "none")
				}
			}
		} else {
			$(".txt1").next("i").css("display", "none")
			$(".txt1").next().next().css("opacity", 1)
			$(".txt1").css("border", "1px solid red")
			flagName = false
		}
	})

	function rand(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	function fun() {
		var arr = [];
		for(var i = 0; i < 4; i++) {
			var code = rand(48, 122);

			while(code >= 58 && code <= 64 || code >= 91 && code <= 96) {
				code = rand(48, 122);
			}

			arr.push(String.fromCharCode(code));

		}
		$(".yz").html(arr.join(""));
	}
	fun()
	$(".huan").click(function() {
		fun()
	})
	var flagYz = false
	$(".txt3").blur(function() {
		var txt3 = $(this).val()
		var yz = $(".yz").html()
		if(txt3 == yz) {
			$(this).next("i").css("display", "block")
			$(this).css("border", "")
			$(this).parent().find("span").css("opacity", 0)
			flagYz = true
		} else {
			$(this).next("i").css("display", "none")
			$(this).parent().find("span").css("opacity", 1)
			$(this).css("border", "1px solid red")
			flagYz = false
		}
	})

	$(".btn1").click(function() {
		if(flagName && flagPass && flagYz) {
			var deff = $.ajax({
				type: "get",
				url: "http://datainfo.duapp.com/shopdata/userinfo.php",
				data: {
					status: "register",
					userID: $(".txt1").val(),
					password: $(".txt2").val()
				}
			})
			deff.done(function(res) {
				switch(res) {
					case "0":
						alert("用户名被注册");
						break;
					case "1":
						alert("登录成功,3秒后跳转")
						setTimeout(function() {
							location.href = "http://127.0.0.1/sxf-mimile/enroll.html"
						}, 3000);
						break;
					case "2":
						alert("注册失败，电脑当机了，来生再试吧");
				}
			})

		} else {
			alert("注册失败")
		}
	})
})