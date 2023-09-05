'use strict';

// 01. Add Animation when click on Sidebar
const sidebarTitleEl = document.getElementById('sidebar-title');
const sidebarEl = document.getElementById('sidebar');

sidebarTitleEl.addEventListener('click', function () {
  sidebarEl.classList.toggle('active');
});

/////////////////////////////////////////
// 05. Edit function
/////////////////////////////////////////

// selecting DOM elements và declare
let idInput = document.getElementById('input-id');
let nameInput = document.getElementById('input-name');
let ageInput = document.getElementById('input-age');
let typeInput = document.getElementById('input-type');
let weightInput = document.getElementById('input-weight');
let lengthInput = document.getElementById('input-length');
let colorInput = document.getElementById('input-color-1');
let breedInput = document.getElementById('input-breed');
let vaccinatedInput = document.getElementById('input-vaccinated');
let dewormedInput = document.getElementById('input-dewormed');
let sterilizedInput = document.getElementById('input-sterilized');

const submitBtn = document.getElementById('submit-btn');
const tableBodyEl = document.querySelector('#tbody');
const formEl = document.querySelector('.hide');

// retrieve data from localStorage
const petArr = getFromStorage('pets') || [];
renderTableData(petArr);
const breedArr = getFromStorage('breeds') || [];

function renderTableData(petArr) {
  tableBodyEl.innerHTML = '';

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
        <button type="button" class="btn btn-warning" 
          onclick="editPet('${petArr[i].id}')">Edit
        </button>
      </td>`;
    tableBodyEl.appendChild(row);
  }
}

// show edit form when click "Edit" button
function editPet(petId) {
  formEl.classList.remove('hide');
  startEditPet(petId);
}

function startEditPet(petId) {
  const petNeedEdit = petArr.find(pet => pet.id === petId);
  filterBreed(petNeedEdit.type);

  idInput.value = petNeedEdit.id;
  nameInput.value = petNeedEdit.name;
  ageInput.value = petNeedEdit.age;
  typeInput.value = petNeedEdit.type;
  weightInput.value = petNeedEdit.weight;
  lengthInput.value = petNeedEdit.length;
  colorInput.value = petNeedEdit.color;
  breedInput.value = petNeedEdit.breed;
  vaccinatedInput.checked = petNeedEdit.vaccinated;
  dewormedInput.checked = petNeedEdit.dewormed;
  sterilizedInput.checked = petNeedEdit.sterilized;
}

function filterBreed(petType) {
  const breedFiltered = breedArr.filter(breed => breed.type === petType);

  breedInput.innerHTML = `<option disabled selected>Select Breed</option>`;
  for (let i = 0; i < breedFiltered.length; i++) {
    const option = document.createElement('option');
    option.innerHTML = `${breedFiltered[i].name}`;
    breedInput.appendChild(option);
  }
}

// validate the input data and save when click "Submit" button
submitBtn.addEventListener('click', function () {
  if (nameInput.value.length < 1 || nameInput.value.length > 20) {
    alert('The Pet Name must be between 1 and 20 characters!');
  } else if (
    isNaN(ageInput.value) ||
    ageInput.value < 1 ||
    ageInput.value > 15
  ) {
    alert('Age must be between 1 and 15!');
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
  } else {
    const data = {
      id: idInput.value,
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

    formEl.classList.add('hide');
    const index = petArr.findIndex(pet => pet.id === idInput.value);
    petArr.fill(data, index, index + 1);
    renderTableData(petArr);
    saveToStorage('pets', petArr);
  }
});
