define(function() {
	return {
		checkName: function(name) {
			var reg = /^1[35789]\d{9}/;
			if(reg.test(name)) {
				return true;
			} else {
				return false;
			}
		},
		checkPass: function(pas) {
			var reg = /^\w{6,20}/;
			if(reg.test(pas)) {
				return true;
			} else {
				return false
			}
		}
	}
})