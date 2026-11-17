/**
 * Raku Tex BD - Tabs & Gallery Controller
 * Handles 4-phase work model stepper and product image thumbnail switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  initPhaseStepper();
  initGallerySwitcher();
});

function initPhaseStepper() {
  const tabBtns = document.querySelectorAll('.phase-tab-btn');
  const phasePanes = document.querySelectorAll('.phase-pane');
  const prevBtn = document.getElementById('phase-prev-btn');
  const nextBtn = document.getElementById('phase-next-btn');

  if (!tabBtns.length || !phasePanes.length) return;

  let currentPhaseIndex = 0;

  function setPhase(index) {
    if (index < 0) index = 0;
    if (index >= phasePanes.length) index = phasePanes.length - 1;
    currentPhaseIndex = index;

    tabBtns.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    phasePanes.forEach((pane, i) => {
      pane.style.display = i === index ? 'grid' : 'none';
    });

    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === phasePanes.length - 1;
  }

  tabBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => setPhase(i));
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      setPhase(currentPhaseIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      setPhase(currentPhaseIndex + 1);
    });
  }

  // Initialize first phase
  setPhase(0);
}

function initGallerySwitcher() {
  const thumbBtns = document.querySelectorAll('.gallery-thumb-btn');
  const previewCaption = document.getElementById('gallery-active-caption');
  const previewIcon = document.getElementById('gallery-active-icon');

  if (!thumbBtns.length) return;

  thumbBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const captionText = btn.getAttribute('data-caption') || `Gallery image ${i + 1} of 4 — supplied by Raku Tex`;
      if (previewCaption) {
        previewCaption.textContent = captionText;
      }
    });
  });
}
