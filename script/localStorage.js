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
libraryCloseBtn.addEventListener('click', closeLibrary);

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
	let paletteNr;
	const paletteObjects = JSON.parse(localStorage.getItem('palettes'));

	if (paletteObjects) {
		paletteNr = paletteObjects.length;
	} else {
		paletteNr = savedPalettes.length;
	}

	const paletteObj = { name, colors, Nr: paletteNr };
	savedPalettes.push(paletteObj);

	// Save to localStorage:
	saveToLocalStorage(paletteObj);
	saveInput.value = '';

	// Generate palette for the Library:
	//1. Create Palette Div:
	const palette = document.createElement('div');
	palette.classList.add('custom-palette');

	//2. Create title Div:
	const title = document.createElement('h4');
	title.innerText = paletteObj.name;

	//3. Create palette colors preview Div:
	const preview = document.createElement('div');
	preview.classList.add('colors-preview');

	paletteObj.colors.forEach((colorPreview) => {
		const singleColorDiv = document.createElement('div');
		singleColorDiv.style.backgroundColor = colorPreview;

		// Append to Preview Div:
		preview.appendChild(singleColorDiv);
	});

	//4. Create palette Picker Btn:
	const palettePickerBtn = document.createElement('button');
	palettePickerBtn.classList.add('palette-picker-Btn');
	palettePickerBtn.classList.add(paletteObj.Nr);
	palettePickerBtn.innerText = 'Pick';

	//Delete palette Btn:
	const paletteDeleteBtn = document.createElement('button');
	paletteDeleteBtn.classList.add('palette-delete-Btn');
	paletteDeleteBtn.classList.add(paletteObj.Nr);
	paletteDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

	//5. Add EventListner to palettePickerBtn:
	palettePickerBtn.addEventListener('click', (event) => {
		//Close Library:
		closeLibrary();

		//Get the palette Index:
		const paletteIndex = event.target.classList[1];

		//Reset initial Colors:
		initialColors = [];

		//Get all the colors from saved Palette and looping over it:
		savedPalettes[paletteIndex].colors.forEach((color, index) => {
			//set Initial Colors to saved palette colors:
			initialColors.push(color);

			//Set saved colors to the colorDivs:
			colorDivs[index].style.backgroundColor = color;

			//Get Hex text nad update it:
			const text = colorDivs[index].children[0];
			updateTextUI(index);

			//Contrast update:
			textContrastCheck(color, text);
		});

		//Reset all controls sliders input value:
		resetInputs();
	});

	// Add EventListner to paletteDeleteBtn:
	paletteDeleteBtn.addEventListener('click', (event) => {
		const customPaletteItem = event.target;
		const customPalette = customPaletteItem.parentElement;

		removeLocalPalettes(event);

		customPalette.remove();
	});

	//6. Append to Main Library:
	palette.appendChild(title);
	palette.appendChild(preview);
	palette.appendChild(palettePickerBtn);
	palette.appendChild(paletteDeleteBtn);

	libraryContainer.children[0].appendChild(palette);
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

// Local Storage data Geter:
function getFromLocalStorage() {
	if (localStorage.getItem('palettes') === null) {
		localPalettes = [];
	} else {
		const paletteObjects = JSON.parse(localStorage.getItem('palettes'));

		//savedPalettes *2:
		savedPalettes = [...paletteObjects];

		paletteObjects.forEach((paletteObj) => {
			// Generate palette for the Library:
			//1. Create Palette Div:
			const palette = document.createElement('div');
			palette.classList.add('custom-palette');

			//2. Create title Div:
			const title = document.createElement('h4');
			title.innerText = paletteObj.name;

			//3. Create palette colors preview Div:
			const preview = document.createElement('div');
			preview.classList.add('colors-preview');

			paletteObj.colors.forEach((colorPreview) => {
				const singleColorDiv = document.createElement('div');
				singleColorDiv.style.backgroundColor = colorPreview;

				// Append to Preview Div:
				preview.appendChild(singleColorDiv);
			});

			//4. Create palette Picker Btn:
			const palettePickerBtn = document.createElement('button');
			palettePickerBtn.classList.add('palette-picker-Btn');
			palettePickerBtn.classList.add(paletteObj.Nr);
			palettePickerBtn.innerText = 'Pick';

			//Delete palette Btn:
			const paletteDeleteBtn = document.createElement('button');
			paletteDeleteBtn.classList.add('palette-delete-Btn');
			paletteDeleteBtn.classList.add(paletteObj.Nr);
			paletteDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

			//5. Add EventListner to palettePickerBtn:
			palettePickerBtn.addEventListener('click', (event) => {
				//Close Library:
				closeLibrary();

				//Get the palette Index:
				const paletteIndex = event.target.classList[1];

				//Reset initial Colors:
				initialColors = [];

				//Get all the colors from saved Palette and looping over it:
				paletteObjects[paletteIndex].colors.forEach((color, index) => {
					//set Initial Colors to saved palette colors:
					initialColors.push(color);

					//Set saved colors to the colorDivs:
					colorDivs[index].style.backgroundColor = color;

					//Get Hex text nad update it:
					const text = colorDivs[index].children[0];
					updateTextUI(index);

					//Contrast update:
					textContrastCheck(color, text);
				});

				//Reset all controls sliders input value:
				resetInputs();
			});

			// Add EventListner to paletteDeleteBtn:
			paletteDeleteBtn.addEventListener('click', (event) => {
				const customPaletteItem = event.target;
				const customPalette = customPaletteItem.parentElement;

				customPalette.remove();

				removeLocalPalettes(event);
			});

			//6. Append to Main Library:
			palette.appendChild(title);
			palette.appendChild(preview);
			palette.appendChild(palettePickerBtn);
			palette.appendChild(paletteDeleteBtn);

			libraryContainer.children[0].appendChild(palette);
		});
	}
}

//  Local storage data Remover:
function removeLocalPalettes(event) {
	let localPalettes;

	if (localStorage.getItem('palettes') === null) {
		localPalettes = [];
	} else {
		localPalettes = JSON.parse(localStorage.getItem('palettes'));
	}

	const paletteIndex = localPalettes.length;

	localPalettes.splice(localPalettes.indexOf(paletteIndex), 1);
	localStorage.setItem('palettes', JSON.stringify(localPalettes));
}

// Library opener:
function openLibrary(event) {
	const libraryPopup = libraryContainer.children[0];

	libraryContainer.classList.add('active');
	libraryPopup.classList.add('active');
}

// Library Closer:
function closeLibrary(event) {
	const libraryPopup = libraryContainer.children[0];

	libraryContainer.classList.remove('active');
	libraryPopup.classList.remove('active');
}

//-------->> Function end <===||

getFromLocalStorage();

// localStorage.clear();
