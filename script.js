const hexToRgb = (hex) => {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	  } : null;
}

const componentToHex = (c) => {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);


var color1 = document.querySelector("#color1");
var rgbcolor1 = hexToRgb(color1.value);
var body = document.getElementById("gradient");
var header = document.getElementById("header");
var text = document.getElementById("text");
var data = {
	model : "default",
	input : ["N","N","N","N","N"]
}
var url = "http://colormind.io/api/";
var http = new XMLHttpRequest();

color1.addEventListener("input", function setGradient() {
	data.input[0] = Object.values(hexToRgb(color1.value));
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			var palette = JSON.parse(http.responseText).result;
			body.style.background =
				"linear-gradient(to right, "
				+ rgbToHex(palette[0][0], palette[0][1], palette[0][2])
				+ ", "
				+ rgbToHex(palette[1][0], palette[1][1], palette[1][2])
				+")";
			text.style.background =
				"linear-gradient(to left, "
				+ rgbToHex(palette[2][0], palette[2][1], palette[2][2])
				+ ", "
				+ rgbToHex(palette[3][0], palette[3][1], palette[3][2])
				+")";

		}
	};
	http.open("POST", url, true);
	http.send(JSON.stringify(data));

})
