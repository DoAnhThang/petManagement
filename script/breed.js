'use strict';

// 01. Add Animation when click on Sidebar
const sidebarTitleEl = document.getElementById('sidebar-title');
const sidebarEl = document.getElementById('sidebar');

sidebarTitleEl.addEventListener('click', function () {
  sidebarEl.classList.toggle('active');
});

/////////////////////////////////////////
// 03. Breed Management
/////////////////////////////////////////

// selecting DOM elements và declare
const submitBtn = document.getElementById('submit-btn');
const breedInput = document.getElementById('input-breed');
const typeInput = document.getElementById('input-type');
const tableBodyEl = document.querySelector('#tbody');
const messageEl = document.querySelector('.message');

// retrieve data from localStorage
const breedArr = getFromStorage('breeds') || [];
if (breedArr.length !== 0) renderBreedTable(breedArr);

function renderBreedTable(breedArr) {
  tableBodyEl.innerHTML = '';
  messageEl.classList.add('hidden');

  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `<th>${i + 1}</th>
      <td>${breedArr[i].name}</td>
      <td>${breedArr[i].type}</td>
      <td>
        <button type="button" class="btn btn-danger" 
          onclick="deleteBreed('${breedArr[i].name}', '${
      breedArr[i].type
    }')">Delete
        </button>
      </td>`;

    tableBodyEl.appendChild(row);
  }
}

// validate the input data and save
submitBtn.addEventListener('click', function () {
  if (
    breedArr.some(
      breed => breed.name === breedInput.value && breed.type === typeInput.value
    ) ||
    breedInput.value.length < 3
  ) {
    alert('Breed already exists or not real.\nPlease enter again!');
  } else if (typeInput.value === 'Select Type') {
    alert('Please select Type!');
  } else {
    const data = {
      name: breedInput.value,
      type: typeInput.value,
    };

    clearInput();
    breedArr.push(data);
    renderBreedTable(breedArr);
    saveToStorage('breeds', breedArr);
  }
});

// empty the data just entered out the form
function clearInput() {
  breedInput.value = '';
  typeInput.value = 'Select Type';
}

// delete a breed
const deleteBreed = (breedName, breedType) => {
  if (confirm('Are you sure?')) {
    let breedArrIndex = breedArr.findIndex(
      breed => breed.name === breedName && breed.type === breedType
    );
    breedArr.splice(breedArrIndex, 1);
    saveToStorage('breeds', breedArr);
    renderBreedTable(breedArr);
    if (breedArr.length === 0) messageEl.classList.remove('hidden');
  }
};
