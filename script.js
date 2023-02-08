'use strict';

// 01. Add Animation when click on Sidebar
const sidebarTitleEl = document.getElementById('sidebar-title');
const sidebarEl = document.getElementById('sidebar');

sidebarTitleEl.addEventListener('click', function () {
  sidebarEl.classList.toggle('active');
});

// selecting DOM elements và declare
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');

const submitBtn = document.getElementById('submit-btn');
const tableBodyEl = document.querySelector('#tbody');
const messageEl = document.querySelector('.message');
const healthyBtn = document.getElementById('healthy-btn');
let healthyCheck = false;
let healthyPetArr = [];

// retrieve data from localStorage
const petArr = getFromStorage('pets') || [];

if (petArr.length !== 0) {
  renderTableData(petArr);
  healthyPetArr = petArr.filter(
    pet =>
      pet.vaccinated === true &&
      pet.dewormed === true &&
      pet.sterilized === true
  );
}
saveToStorage('healthy-pets', healthyPetArr);

function renderTableData(petArr) {
  tableBodyEl.innerHTML = '';
  messageEl.classList.add('hidden');

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `<th>${petArr[i].id}</th>
      <td>${petArr[i].name}</td>
      <td>${petArr[i].age}</td>
      <td>${petArr[i].type}</td>
      <td>${petArr[i].weight} kg</td>
      <td>${petArr[i].length} cm</td>
      <td>${petArr[i].breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
      </td>
      <td><i class="bi ${
        petArr[i].vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
      }"></i></td>
      <td><i class="bi ${
        petArr[i].dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
      }"></i></td>
      <td><i class="bi ${
        petArr[i].sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
      }"></i></td>
      <td>${petArr[i].date}</td>
      <td>
        <button type="button" class="btn btn-danger" 
          onclick="deletePet('${petArr[i].id}')">Delete
        </button>
      </td>`;
    tableBodyEl.appendChild(row);
  }
}

/////////////////////////////////////////////////////
// 04. Display Breeds in the Pet management screen
/////////////////////////////////////////////////////
const breedArr = getFromStorage('breeds') || [];

saveToStorage('breeds', breedArr);
renderBreed(breedArr);

function renderBreed(breedArr) {
  breedInput.innerHTML = `<option disabled selected>Select Breed</option>`;
  for (let i = 0; i < breedArr.length; i++) {
    const option = document.createElement('option');
    option.innerHTML = `${breedArr[i].name}`;
    breedInput.appendChild(option);
  }
}

// activated when onchange petType
function filterBreed(petType) {
  const breedFiltered = breedArr.filter(breed => breed.type === petType);
  renderBreed(breedFiltered);
}

// validate the input data and save when click "Submit" button
submitBtn.addEventListener('click', function () {
  if (
    petArr.some(pet => pet.id.toLowerCase() === idInput.value.toLowerCase()) ||
    idInput.value.length !== 4 ||
    idInput.value.toLowerCase().indexOf('p') !== 0
  ) {
    alert('ID must unique, consist of 4 characters and start with "P"!');
  } else if (nameInput.value.length < 1 || nameInput.value.length > 20) {
    alert('The Pet Name must be between 1 and 20 characters!');
  } else if (
    isNaN(ageInput.value) ||
    ageInput.value < 1 ||
    ageInput.value > 15
  ) {
    alert('Age must be between 1 and 15!');
  } else if (typeInput.value === 'Select Type') {
    alert('Please select Type!');
  } else if (
    isNaN(weightInput.value) ||
    weightInput.value < 1 ||
    weightInput.value > 15
  ) {
    alert('Weight must be between 1 and 15 (kg)!');
  } else if (
    isNaN(lengthInput.value) ||
    lengthInput.value < 1 ||
    lengthInput.value > 100
  ) {
    alert('Length must be between 1 and 100 (cm)!');
  } else if (breedInput.value === 'Select Breed') {
    alert('Please select Breed!');
  } else {
    const data = {
      id: idInput.value
        .replace(/^./, str => str.toUpperCase())
        .replace(/(\B)[^ ]*/g, str => str.toLowerCase()),
      name: nameInput.value,
      age: parseInt(ageInput.value),
      type: typeInput.value,
      weight: weightInput.value,
      length: lengthInput.value,
      color: colorInput.value,
      breed: breedInput.value,
      vaccinated: vaccinatedInput.checked,
      dewormed: dewormedInput.checked,
      sterilized: sterilizedInput.checked,
      date: new Date().toLocaleDateString(),
    };

    clearInput();
    petArr.push(data);
    renderTableData(petArr);
    saveToStorage('pets', petArr);

    if (data.vaccinated && data.dewormed && data.sterilized) {
      healthyPetArr.push(data);
      saveToStorage('healthy-pets', healthyPetArr);
    }
  }
});

// empty the data just entered out the form
function clearInput() {
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  typeInput.value = 'Select Type';
  weightInput.value = '';
  lengthInput.value = '';
  breedInput.value = 'Select Breed';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// delete a pet
const deletePet = petId => {
  if (confirm('Are you sure?')) {
    let petArrIndex = petArr.findIndex(pet => pet.id === petId);
    let healthyPetArrIndex = healthyPetArr.findIndex(pet => pet.id === petId);

    petArr.splice(petArrIndex, 1);
    saveToStorage('pets', petArr);
    if (healthyPetArrIndex !== -1) {
      healthyPetArr.splice(healthyPetArrIndex, 1);
      console.log(healthyPetArr);
      saveToStorage('healthy-pets', healthyPetArr);
    }

    if (!healthyCheck) {
      renderTableData(petArr);
      if (petArr.length === 0) messageEl.classList.remove('hidden');
    } else if (healthyCheck) {
      renderTableData(healthyPetArr);
      if (healthyPetArr.length === 0) messageEl.classList.remove('hidden');
    }
  }
};

// display healthy pets
healthyBtn.addEventListener('click', function () {
  if (healthyCheck) {
    healthyCheck = false;
    healthyBtn.textContent = 'Show Healthy Pet';
    renderTableData(petArr);
    if (petArr.length === 0) messageEl.classList.remove('hidden');
  } else {
    healthyCheck = true;
    healthyBtn.textContent = 'Show All Pet';
    renderTableData(healthyPetArr);
    if (healthyPetArr.length === 0) messageEl.classList.remove('hidden');
  }
});
