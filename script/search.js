'use strict';

// 01. Add Animation when click on Sidebar
const sidebarTitleEl = document.getElementById('sidebar-title');
const sidebarEl = document.getElementById('sidebar');

sidebarTitleEl.addEventListener('click', function () {
  sidebarEl.classList.toggle('active');
});

/////////////////////////////////////////
// 06. Search function
/////////////////////////////////////////

// selecting DOM elements và declare
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const typeInput = document.getElementById('input-type');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const findBtn = document.getElementById('find-btn');
const tableBodyEl = document.querySelector('#tbody');

// retrieve data from localStorage
const petArr = getFromStorage('pets') || [];
renderTableData(petArr);
const breedArr = getFromStorage('breeds') || [];
renderBreed(breedArr);

function renderBreed(breedArr) {
  breedInput.innerHTML = `<option disabled selected>Select Breed</option>`;
  for (let i = 0; i < breedArr.length; i++) {
    const option = document.createElement('option');
    option.innerHTML = `${breedArr[i].name}`;
    breedInput.appendChild(option);
  }
}

// search pets when click "Find" button
findBtn.addEventListener('click', function () {
  let searchPetArr = petArr.slice();

  if (idInput.value !== '')
    searchPetArr = searchPetArr.filter(pet =>
      pet.id.toLowerCase().includes(idInput.value.toLowerCase())
    );

  if (nameInput.value !== '')
    searchPetArr = searchPetArr.filter(pet =>
      pet.name.toLowerCase().includes(nameInput.value.toLowerCase())
    );

  if (typeInput.value !== 'Select Type')
    searchPetArr = searchPetArr.filter(pet =>
      pet.type.includes(typeInput.value)
    );

  if (breedInput.value !== 'Select Breed')
    searchPetArr = searchPetArr.filter(pet =>
      pet.breed.includes(breedInput.value)
    );

  if (vaccinatedInput.checked)
    searchPetArr = searchPetArr.filter(pet => pet.vaccinated === true);
  if (dewormedInput.checked)
    searchPetArr = searchPetArr.filter(pet => pet.dewormed === true);
  if (sterilizedInput.checked)
    searchPetArr = searchPetArr.filter(pet => pet.sterilized === true);

  renderTableData(searchPetArr);
});

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
      <td>${petArr[i].date}</td>`;
    tableBodyEl.appendChild(row);
  }
}
