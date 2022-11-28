//==> Selectors:
// Button Selectors:
const saveBtn = document.querySelector('.save-Btn');
const saveCloseBtn = document.querySelector('.close-savePopup-Btn');
const saveSubmitBtn = document.querySelector('.submit-save');

const libraryBtn = document.querySelector('.library-Btn');
const libraryCloseBtn = document.querySelector('.close-libraryPopup-Btn');

// Divs Selectors:
const saveContainer = document.querySelector('.save-container');
const saveInput = document.querySelector('.save-container input');

const libraryContainer = document.querySelector('.library-container');

// local Storage variables:
let savedPalettes = [];

//==> EventListener start:

//===> EL for Save Button:
//=> Open Save Palette:
saveBtn.addEventListener('click', openSavePalette);

//=> Close Save Palette:
saveCloseBtn.addEventListener('click', closeSavePalette);

//=> Submit Save Palette:
saveSubmitBtn.addEventListener('click', submitSavePalette);

//===> El for Library:
//=> Open Library:
libraryBtn.addEventListener('click', openLibrary);

//=> Close Library:

//-------->> EventListener end <==||

//==> Funnction start:

//Open palette Saver:
function openSavePalette(event) {
	const savePopup = saveContainer.children[0];

	saveContainer.classList.add('active');
	savePopup.classList.add('active');
}

//Close palette saver:
function closeSavePalette(event) {
	const savePopup = saveContainer.children[0];

	saveContainer.classList.remove('active');
	savePopup.classList.remove('active');
}

//Submit palette saver:
function submitSavePalette(event) {
	//Remove Popup:
	const savePopup = saveContainer.children[0];

	saveContainer.classList.remove('active');
	savePopup.classList.remove('active');

	//Create variables and set values:
	const name = saveInput.value;
	const colors = [];

	currentHexs.forEach((hex) => {
		colors.push(hex.innerText);
	});

	// Generate Palettes Object:
	let paletteNr = savedPalettes.length;

	const paletteObj = { name, colors, Nr: paletteNr };
	savedPalettes.push(paletteObj);

	// Save to localStorage:
	saveToLocalStorage(paletteObj);
	saveInput.value = '';

	// Generate palette for the Library:
}

// Local Storage data Saver:
function saveToLocalStorage(paletteObj) {
	let localPalettes;

	if (localStorage.getItem('palettes') === null) {
		localPalettes = [];
	} else {
		localPalettes = JSON.parse(localStorage.getItem('palettes'));
	}

	localPalettes.push(paletteObj);
	localStorage.setItem('palettes', JSON.stringify(localPalettes));
}

// Library opener:
function openLibrary() {
	const libraryPopup = libraryContainer.children[0];

	libraryContainer.classList.add('active');
	libraryPopup.classList.add('active');
}

// Library Closer:
function closeLibrary() {
	const libraryPopup = libraryContainer.children[0];

	libraryContainer.classList.remove('active');
	libraryPopup.classList.remove('active');
}

//-------->> Function end <===||
