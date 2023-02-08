'use strict';

// 01. Add Animation when click on Sidebar
const sidebarTitleEl = document.getElementById('sidebar-title');
const sidebarEl = document.getElementById('sidebar');

sidebarTitleEl.addEventListener('click', function () {
  sidebarEl.classList.toggle('active');
});

/////////////////////////////////////////////////
// 07. (Advance) Import / Export Data function
/////////////////////////////////////////////////

// selecting DOM elements và declare
const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');
const fileInput = document.getElementById('input-file');

// Export Data
exportBtn.addEventListener('click', function () {
  const petArrExport = getFromStorage('pets') || [];
  let blob = new Blob([JSON.stringify(petArrExport)], {
    type: 'application/json',
  });
  saveAs(blob, 'pets-data.json');
});

// Import Data
importBtn.addEventListener('click', function () {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = function (e) {
      const petArrImport = JSON.parse(e.target.result);

      // import pets data
      const petArrCur = getFromStorage('pets') || [];
      petArrImport.forEach(petImport => {
        const index = petArrCur.findIndex(pet => pet.id === petImport.id);
        if (index !== -1) petArrCur.fill(petImport, index, index + 1);
        else petArrCur.push(petImport);
      });

      // import breeds data
      const breedArrCur = getFromStorage('breeds') || [];
      const breedArrImport = petArrImport.map(pet => ({
        name: pet.breed,
        type: pet.type,
      }));
      breedArrImport.forEach(breed => breedArrCur.push(breed));
      const breedArrMix = [
        ...new Set(breedArrCur.map(breed => JSON.stringify(breed))),
      ].map(breed => JSON.parse(breed));

      saveToStorage('pets', petArrCur);
      saveToStorage('breeds', breedArrMix);
      alert('Import Data Successfully!');
    };

    reader.onerror = function (e) {
      if (!e.target.result) alert('Import Data Failed!');
    };
  }
});
