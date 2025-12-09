const convert_to_base64 = (file) =>
	new Promise((response) => {
		const file_reader = new FileReader();
		file_reader.readAsDataURL(file);
		file_reader.onload = () => response(file_reader.result);
	});

async function renderPreview(configuration) {
	// fill the header
	let roomNameElement = document.getElementById("roomName");
	roomNameElement.textContent = configuration.roomName;

	if (configuration.roomName.length >= 28) {
		roomNameElement.classList.add("smallest");
		roomNameElement.classList.remove("smaller");
	} else if (configuration.roomName.length >= 20) {
		roomNameElement.classList.add("smaller");
		roomNameElement.classList.remove("smallest");
	} else {
		roomNameElement.classList.remove("smaller");
		roomNameElement.classList.remove("smallest");
	}

	let roomNumberElement = document.getElementById("roomNumber");
	roomNumberElement.textContent = configuration.roomNumber;

	let renderFrame = document.createElement("div");
	renderFrame.classList.add("mainArea");
	renderFrame.id = "mainArea";

	// Add blocks based on configuration

	let bc = 0;

	if (configuration.blocks.persons.enabled) {
		let personsBlock = generatePersonsBlock(configuration.blocks.persons);
		renderFrame.appendChild(personsBlock);
		bc++;
	}

	if (configuration.blocks.warning.enabled) {
		let warningBlock = generateWarningBlock(configuration.blocks.warning);
		renderFrame.appendChild(warningBlock);
		bc++;
	}

	if (configuration.blocks.image.enabled) {
		let imageBlock = await generateImageBlock(configuration.blocks.image);
		renderFrame.appendChild(imageBlock);
		bc++;
	}

	// fill the main Area
	let mainArea = document.getElementById("mainArea");

	if (bc === 1) {
		renderFrame.classList.add("singleChild");
	} else {
		renderFrame.classList.remove("singleChild");
	}

	mainArea.parentNode.replaceChild(renderFrame, mainArea);
}

// Generates a table element representing the persons block
function generatePersonsBlock(persons) {
	let table = document.createElement("table");
	table.classList.add("persons");
	persons.entries.forEach((entry) => {
		let row = document.createElement("tr");

		let nameCell = document.createElement("td");
		nameCell.textContent = entry.name;
		nameCell.classList.add("name");
		if (entry.important) {
			nameCell.classList.add("important");
		}
		row.appendChild(nameCell);

		let positionCell = document.createElement("td");
		positionCell.textContent = entry.position;
		positionCell.classList.add("position");
		row.appendChild(positionCell);

		table.appendChild(row);
	});
	return table;
}

// Generates a div element representing the warning block
function generateWarningBlock(warning) {
	let warningDiv = document.createElement("div");
	warningDiv.classList.add("warning");

	let heading = document.createElement("h2");
	heading.textContent = warning.heading;
	warningDiv.appendChild(heading);

	let text = document.createElement("p");
	text.textContent = warning.text;
	warningDiv.appendChild(text);

	return warningDiv;
}

// Generates a div element representing the image block
async function generateImageBlock(image) {
	let imageDiv = document.createElement("div");
	imageDiv.classList.add("image");

	const my_image = await convert_to_base64(image.file);

	let img = document.createElement("img");
	img.src = my_image;
	img.alt = "Bild";
	imageDiv.appendChild(img);

	return imageDiv;
}
