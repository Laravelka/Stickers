function cutText(text, limit) {
	text = text.trim();
	if (text.length <= limit) return text;
	
	text = text.slice(0, limit);
	let lastSpace = text.lastIndexOf(" ");
	
	if (lastSpace > 0) { // нашлась граница слов, ещё укорачиваем
		text = text.substr(0, lastSpace);
	}
	return text + "...";
}

function isJson(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

function fullScreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.webkitrequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if (element.mozRequestFullscreen) {
		element.mozRequestFullScreen();
	}
}

function fullScreenCancel() {
	if (document.requestFullscreen) {
		document.requestFullscreen();
	} else if (document.webkitRequestFullscreen) {
		document.webkitRequestFullscreen();
	} else if (document.mozRequestFullscreen) {
		document.mozRequestFullScreen();
	}
}

function ucFirst(str) {
	if (!str) return str;

	return str[0].toUpperCase() + str.slice(1);
}

function randomInt(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

function ArrUnset(array, value) {
	let i = 0;
	let response = false;

	array.filter(function(object) {
		const newArray = Object.values(object);

		if (newArray.indexOf(value) !== -1)
		{
			array.splice(i, 1);
			response = true;
		}
		i++;
	});
	return response;
}

export {
	isJson,
	cutText,
	ucFirst,
	ArrUnset,
	randomInt,
	fullScreen,
	fullScreenCancel
};