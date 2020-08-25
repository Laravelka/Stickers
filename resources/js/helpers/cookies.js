
function getCookie(name) {
	var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	if (match) 
		return match[2];
	else
		return false;
}

function setCookie(name, value, minutes = 60) {
	var expires = "";
	if (minutes) {
		var date = new Date();
		date.setTime(date.getTime() + (minutes * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function deleteCookie(name) {
	setCookie(name, '', -1);
}

export {setCookie, getCookie, deleteCookie};