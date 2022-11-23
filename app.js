//>==> Selectors:

//==> Divs selector:
const colorDivs = document.querySelectorAll('.color');
const currentHexs = document.querySelectorAll('.color h2');
const copyPopup = document.querySelector('.copy-container');
const slidersContainers = document.querySelectorAll('.adjustment-sliders');

// Button selector:
const generateBtn = document.querySelector('.generate-Btn');
const sliders = document.querySelectorAll('input[type="range"]');
const adjustmentBtns = document.querySelectorAll('.adjust-Btn');
const lockBtns = document.querySelectorAll('.lock-Btn');
const adjustmentCloseBtns = document.querySelectorAll('.close-adjustment');

//>==> Variables:
let initialColors;

//>==> EventListners:

//=> 1. Sliders Input EventListener:
sliders.forEach((slider) => {
	slider.addEventListener('input', hslControls);
});

// 2. Update Hex Text on change:
colorDivs.forEach((colorDiv, index) => {
	colorDiv.addEventListener('change', () => {
		updateTextUI(index);
	});
});

// 3. Hex value Copy To Clipboard EventListener:
currentHexs.forEach((currentHex) => {
	currentHex.addEventListener('click', () => {
		copyToClipboard(currentHex);
	});
});

// 4. Copy popup EventListener:
copyPopup.addEventListener('transitionend', () => {
	const copyPopupBox = copyPopup.children[0];
	copyPopup.classList.remove('active');
	copyPopupBox.classList.remove('active');
});

// 5. Toggle Controls Panel by adjustBtn:
adjustmentBtns.forEach((Btn, index) => {
	Btn.addEventListener('click', () => {
		openAdjustmentPanel(index);
	});
});

// 6. Close Controls Panel by panel close Btn:
adjustmentCloseBtns.forEach((Btn, index) => {
	Btn.addEventListener('click', () => {
		closeAdjustmentPanel(index);
	});
});

//=>  Generae random Color Btn:
generateBtn.addEventListener('click', randomColors);

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

	//==> Random hex numbers generate by using Chroma JS Libaray:
	const hexColor = chroma.random();
	return hexColor;
}

//=> Random Colors Generator:
function randomColors() {
	initialColors = [];

	colorDivs.forEach((colorDiv, index) => {
		const hexText = colorDiv.children[0];
		const randomColor = generateHex();

		// Adding it to Array:

		if (colorDiv.classList.contains('locked')) {
			initialColors.push(hexText.innerText);
			return;
		} else {
			initialColors.push(chroma(randomColor).hex());
		}

		// Adding Color to BG and Hex text:
		colorDiv.style.backgroundColor = randomColor;
		hexText.innerText = randomColor;

		// Contrast Checking:
		textContrastCheck(randomColor, hexText);

		//Initial colorize slider:
		const color = chroma(randomColor);

		const sliders = colorDiv.querySelectorAll('.adjustment-sliders input');

		const hue = sliders[0];
		const brightness = sliders[1];
		const saturation = sliders[2];

		// Sliders Colorizing:
		colorizeSliders(color, hue, brightness, saturation);
	});

	//==> Reset Input value:
	resetInputs();

	//==> Check Adjust and Lock Btns Contrast:
	adjustmentBtns.forEach((Btn, index) => {
		textContrastCheck(initialColors[index], Btn);
		textContrastCheck(initialColors[index], lockBtns[index]);
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

//==> Sliders Colorizer:
function colorizeSliders(color, hue, brightness, saturation) {
	// Saturation Scale:
	const noSat = color.set('hsl.s', 0);
	const fullSat = color.set('hsl.s', 1);

	const scaleSet = chroma.scale([noSat, color, fullSat]);

	//Brightness Scale:
	const midBright = color.set('hsl.l', 0.5);

	//Hue Scale:
	//-->> we don't need to create a Hue Scale because hue colours is always going to be the same

	const hueColor = `rgb(204, 75, 75), rgb(204,204,75), rgb(75,204,75),rgb(75,204,204), rgb(75,75,204),rgb(204, 75, 204),rgb(204,75,75)`;

	const scaleBright = chroma.scale(['black', midBright, 'white']);

	// Update Inputs Color:
	//=> Saturation Input Color Update:
	saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSet(
		0
	)}, ${scaleSet(1)})`;

	//=> Brightness Input Color Update:
	brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(
		0
	)},${scaleBright(0.5)}, ${scaleBright(1)})`;

	//=> Hue Input Color Update:
	hue.style.backgroundImage = `linear-gradient(to right, ${hueColor})`;
}

//==> Slider Color position Controler and BG change:
function hslControls(event) {
	const index =
		event.target.getAttribute('data-hue') ||
		event.target.getAttribute('data-bright') ||
		event.target.getAttribute('data-sat');

	let sliders = event.target.parentElement.querySelectorAll(
		'input[type="range"]'
	);

	const Hue = sliders[0];
	const Brightness = sliders[1];
	const Saturation = sliders[2];

	let bgColor = initialColors[index];

	const color = chroma(bgColor)
		.set('hsl.h', Hue.value)
		.set('hsl.l', Brightness.value)
		.set('hsl.s', Saturation.value);

	colorDivs[index].style.backgroundColor = color;

	//=> Colorize Sliders Inputs:
	colorizeSliders(color, Hue, Brightness, Saturation);
}

//===> UI text updater:
function updateTextUI(index) {
	const activeDiv = colorDivs[index];
	const color = chroma(activeDiv.style.backgroundColor);
	const textHex = activeDiv.querySelector('h2');
	const icons = activeDiv.querySelectorAll('.controls button');

	textHex.innerText = color.hex();

	// Contrast Check:
	textContrastCheck(color, textHex);

	// Check For Icons:
	for (icon of icons) {
		textContrastCheck(color, icon);
	}
}

//==> Inputs Value Reseter:
function resetInputs() {
	const sliders = document.querySelectorAll('.adjustment-sliders input');

	sliders.forEach((slider) => {
		// Slider pointing to the palette color:
		//==> Hue Pointing:
		if (slider.name === 'hue') {
			// Create Hue Color and Value:
			const hueColor = initialColors[slider.getAttribute('data-hue')];
			const hueValue = chroma(hueColor).hsl()[0];

			// Set value:
			slider.value = Math.floor(hueValue);
		}

		//==> Brightness Pointing:
		if (slider.name === 'brightness') {
			// Create brightness Color and Value:
			const brightColor = initialColors[slider.getAttribute('data-bright')];
			const brightValue = chroma(brightColor).hsl()[2];

			// Set value:
			slider.value = Math.floor(brightValue * 100) / 100;
		}

		//==> Saturation Pointing:
		if (slider.name === 'saturation') {
			// Create saturation color and value:
			const satColor = initialColors[slider.getAttribute('data-sat')];
			const satValue = chroma(satColor).hsl()[1];

			// Set value:
			slider.value = Math.floor(satValue * 100) / 100;
		}
	});
}

// Hex color value Copier:
function copyToClipboard(currentHex) {
	// step-1: Create a Temporary element(textarea):
	const element = document.createElement('textarea');

	// step-2: Add a value to temp element:
	element.value = currentHex.innerText;

	// step-3: Now Temp element append to the body:
	document.body.appendChild(element);

	//step-4: Add a Select() method to it:
	element.select();

	//step-5: Add a spacial method called 'execCommand()' for copy value:
	document.execCommand('copy');

	//step-6: Finaly Remove the element from the body:
	document.body.removeChild(element);

	//==> Copy popup Show:
	const copyPopupBox = copyPopup.children[0];
	copyPopup.classList.add('active');
	copyPopupBox.classList.add('active');
}

//==> Adjustment panel Opener and Closer:
// Panel Opener(toggler):
function openAdjustmentPanel(index) {
	slidersContainers[index].classList.toggle('active');
}

//Panel Closer:
function closeAdjustmentPanel(index) {
	slidersContainers[index].classList.remove('active');
}

// //==> Lock color palette:
// function lockPalette(e, index) {

// }

randomColors();
