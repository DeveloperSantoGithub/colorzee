//>==> Selectors:
const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate-Btn');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexs = document.querySelectorAll('.color h2');

//>==> Variables:
let initialColors;

//>==> Function:

//==>> Random Color and Hex Gererator Function:

//=> Random Hex number Generator:
function generateHex() {
	//==> Custom created colors Generator:

	// const letters = '0123456789ABCDEF';
	// let hash = '#';
	// for (let i = 0; i < 6; i++) {
	// 	hash += letters[Math.floor(Math.random() * 16)];
	// }
	// return hash;

	//==> Random Colors generate by using Chroma JS Libaray:
	const hexColor = chroma.random();
	return hexColor;
}

//=> Random Colors Generator:
function randomColors() {
	colorDivs.forEach((colorDiv, index) => {
		const hexText = colorDiv.children[0];
		const randomColor = generateHex();

		// Adding Color to BG and Hex text:
		colorDiv.style.backgroundColor = randomColor;
		hexText.innerText = randomColor;

		// Contrast Checking:
		textContrastCheck(randomColor, hexText);
	});
}

//==> Contrast Checker:
function textContrastCheck(color, text) {
	const luminance = chroma(color).luminance();

	if (luminance > 0.5) {
		text.style.color = 'black';
	} else {
		text.style.color = 'white';
	}
}

randomColors();
