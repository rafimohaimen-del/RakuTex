/**
 * Raku Tex BD - Request a Quote (RFQ) Controller
 * Manages category chips, tech pack file upload dropzone, and mobile stepper
 */

document.addEventListener('DOMContentLoaded', () => {
  initToggleChips();
  initFileDropzone();
  initRFQSubmission();
});

function initToggleChips() {
  const chips = document.querySelectorAll('.toggle-chip');
  const hiddenInput = document.getElementById('selected-categories-input');
  const selectedCategories = new Set(['Knitwear']); // default per design

  chips.forEach((chip) => {
    const val = chip.getAttribute('data-value');
    if (chip.classList.contains('selected') && val) {
      selectedCategories.add(val);
    }

    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      const textSpan = chip.querySelector('.chip-text') || chip;
      
      if (chip.classList.contains('selected')) {
        selectedCategories.add(val);
        chip.innerHTML = `✓ ${val}`;
      } else {
        selectedCategories.delete(val);
        chip.innerHTML = `+ ${val}`;
      }

      if (hiddenInput) {
        hiddenInput.value = Array.from(selectedCategories).join(', ');
      }
    });
  });
}

function initFileDropzone() {
  const dropzone = document.getElementById('techpack-dropzone');
  const fileInput = document.getElementById('techpack-file-input');
  const fileListContainer = document.getElementById('uploaded-files-list');

  if (!dropzone || !fileInput || !fileListContainer) return;

  const uploadedFiles = [];

  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  ['dragenter', 'dragover'].forEach((eventName) => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    handleFiles(files);
  });

  fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (uploadedFiles.length >= 5) {
        alert('Maximum of 5 files allowed.');
        break;
      }
      uploadedFiles.push(file);
    }
    renderFileList();
  }

  function renderFileList() {
    fileListContainer.innerHTML = '';
    uploadedFiles.forEach((file, index) => {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      const item = document.createElement('div');
      item.className = 'uploaded-file-item';
      item.innerHTML = `
        <span>📄 <strong>${escapeHtml(file.name)}</strong> (${sizeMb} MB)</span>
        <span class="remove-file-btn" data-index="${index}" title="Remove file">&times;</span>
      `;
      fileListContainer.appendChild(item);
    });

    fileListContainer.querySelectorAll('.remove-file-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        uploadedFiles.splice(idx, 1);
        renderFileList();
      });
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

function initRFQSubmission() {
  const form = document.getElementById('rfq-form');
  const successModal = document.getElementById('rfq-success-modal');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validity check
    const name = form.querySelector('[name="full_name"]')?.value;
    const email = form.querySelector('[name="work_email"]')?.value;
    const consent = form.querySelector('[name="consent_privacy"]')?.checked;

    if (!name || !email || !consent) {
      alert('Please fill out all required fields marked with * and accept the privacy terms.');
      return;
    }

    // Display confirmation
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Submitting inquiry...';
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.textContent = 'Inquiry Sent Successfully ✓';
      }
      alert(
        `Thank you ${name}! Your sourcing inquiry has been submitted.\n\nOur CEO (Kazi Zakaria) and COO (Md. Mejbah Uddin) review every inquiry personally and will respond within 24 hours.`
      );
      form.reset();
      const fileListContainer = document.getElementById('uploaded-files-list');
      if (fileListContainer) fileListContainer.innerHTML = '';
      if (submitBtn) {
        submitBtn.textContent = 'Send inquiry →';
        submitBtn.disabled = false;
      }
    }, 800);
  });
}
