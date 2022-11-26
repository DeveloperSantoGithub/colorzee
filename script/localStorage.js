//==> Selectors:
// Button Selectors:
const saveBtn = document.querySelector('.save-Btn');
const saveCloseBtn = document.querySelector('.close-savePopup-Btn');
const saveSubmitBtn = document.querySelector('.submit-save');

// Divs Selectors:
const saveContainer = document.querySelector('.save-container');
const saveInput = document.querySelector('.save-container input');

// local Storage variables:
let savedPalettes = [];

//==> EventListener start:

//===> EL for Save Buutton:
//=> Open Save Palette:
saveBtn.addEventListener('click', openSavePalette);

//=> Close Save Palette:
saveCloseBtn.addEventListener('click', closeSavePalette);

//-------->> EventListener end <==||

//==> Funnction start:

//Open palette Saver:
function openSavePalette() {
	const savePopup = saveContainer.children[0];

	saveContainer.classList.add('active');
	savePopup.classList.add('active');
}

//Close palette saver:
function closeSavePalette() {
	const savePopup = saveContainer.children[0];

	saveContainer.classList.remove('active');
	savePopup.classList.remove('active');
}
//-------->> Function end <===||
