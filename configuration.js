let persons = [];

function getCurrentConfiguration() {
	let generalInfo = getGeneralInfo();
	return {
		roomNumber: generalInfo.roomNumber,
		roomName: generalInfo.roomName,
		blocks: {
			persons: getPersonsBlockInfo(),
			warning: getWarningBlockInfo(),
			image: getImageBlockInfo(),
		},
	};
}

const personBlockEnableInput = document.getElementById("displayPersonsBlock");
const warningBlockEnableInput = document.getElementById("displayWarningBlock");
const imageBlockEnableInput = document.getElementById("displayImageBlock");

personBlockEnableInput.addEventListener("change", updateConfigurationDisplay);
warningBlockEnableInput.addEventListener("change", updateConfigurationDisplay);
imageBlockEnableInput.addEventListener("change", updateConfigurationDisplay);

function updateConfigurationDisplay() {
	if (personBlockEnableInput.checked) {
		document
			.getElementById("personsBlockSettings")
			.classList.remove("disabled");
	} else {
		document
			.getElementById("personsBlockSettings")
			.classList.add("disabled");
	}

	if (warningBlockEnableInput.checked) {
		document
			.getElementById("warningBlockSettings")
			.classList.remove("disabled");
	} else {
		document
			.getElementById("warningBlockSettings")
			.classList.add("disabled");
	}

	if (imageBlockEnableInput.checked) {
		document
			.getElementById("imageBlockSettings")
			.classList.remove("disabled");
	} else {
		document.getElementById("imageBlockSettings").classList.add("disabled");
	}
}

function getGeneralInfo() {
	return {
		roomNumber: document.getElementById("roomNumberInput").value,
		roomName: document.getElementById("roomNameInput").value,
	};
}
function getWarningBlockInfo() {
	return {
		enabled: warningBlockEnableInput.checked,
		heading: document.getElementById("warningHeadingInput").value,
		text: document.getElementById("warningTextInput").value,
	};
}

function getImageBlockInfo() {
	return {
		enabled: imageBlockEnableInput.checked,
		src: document.getElementById("imageSrcInput").value,
	};
}

function getPersonsBlockInfo() {
	return {
		enabled: personBlockEnableInput.checked,
		entries: persons,
	};
}

function addPerson(name, position, important) {
	persons.push({
		name: name,
		position: position,
		important: important,
	});
}
// listen to add person button

const addPersonButton = document.getElementById("addPersonButton");
addPersonButton.addEventListener("click", () => {
	let nameInput = document.getElementById("personNameInput");
	let positionInput = document.getElementById("personPositionInput");
	let importantInput = document.getElementById("personImportantInput");

	addPerson(nameInput.value, positionInput.value, importantInput.checked);

	nameInput.value = "";
	positionInput.value = "";
	importantInput.checked = false;

	renderPersonList();
});

function renderPersonList() {
	let personListDiv = document.getElementById("personList");
	// Clear existing content
	personListDiv.innerHTML = "";

	persons.forEach((person, index) => {
		let entryDiv = document.createElement("div");
		entryDiv.classList.add("entry");
		entryDiv.textContent = `${person.name} - ${person.position}${
			person.important ? " (Wichtig)" : ""
		}`;

		// Add delete button
		let deleteButton = document.createElement("button");
		deleteButton.textContent = "Löschen";
		deleteButton.addEventListener("click", () => {
			persons.splice(index, 1);
			renderPersonList();
		});
		entryDiv.appendChild(deleteButton);

		// if not first, add up button
		if (index > 0) {
			let upButton = document.createElement("button");
			upButton.textContent = "↑";
			upButton.addEventListener("click", () => {
				[persons[index - 1], persons[index]] = [
					persons[index],
					persons[index - 1],
				];
				renderPersonList();
			});
			entryDiv.appendChild(upButton);
		}

		// if not last, add down button
		if (index < persons.length - 1) {
			let downButton = document.createElement("button");
			downButton.textContent = "↓";
			downButton.addEventListener("click", () => {
				[persons[index + 1], persons[index]] = [
					persons[index],
					persons[index + 1],
				];
				renderPersonList();
			});
			entryDiv.appendChild(downButton);
		}

		personListDiv.appendChild(entryDiv);
	});
}
