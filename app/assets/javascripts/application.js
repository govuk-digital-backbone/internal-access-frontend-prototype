window.GOVUKPrototypeKit.documentReady(() => {

  const selectAllCheckbox = document.getElementById('select-all-apps');
  const appCheckboxes = document.querySelectorAll('.app-checkbox');
  const batchBar = document.getElementById('batch-control-bar');
  const selectedCountSpan = document.getElementById('selected-count');
  const clearSelectionLink = document.getElementById('clear-selection');

  function updateBatchBar() {
    const checkedCount = document.querySelectorAll('.app-checkbox:checked').length;
    
    if (checkedCount > 0) {
      selectedCountSpan.textContent = checkedCount;
      batchBar.style.display = 'flex';
    } else {
      batchBar.style.display = 'none';
    }

    // Keep the master checkbox sync'd if all row items are manually checked
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = (checkedCount === appCheckboxes.length);
    }
  }

  // Master "Select All" click event
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      appCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
      });
      updateBatchBar();
    });
  }

  // Row Checkboxes click event
  appCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateBatchBar);
  });

  // "Clear selection" link event
  if (clearSelectionLink) {
    clearSelectionLink.addEventListener('click', function(e) {
      e.preventDefault();
      if (selectAllCheckbox) selectAllCheckbox.checked = false;
      appCheckboxes.forEach(checkbox => checkbox.checked = false);
      updateBatchBar();
    });
  }
})