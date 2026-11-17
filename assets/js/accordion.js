/**
 * Raku Tex BD - Accessible Accordion Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');

    if (!trigger || !content) return;

    // Check initial state
    if (item.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + 'px';
      trigger.setAttribute('aria-expanded', 'true');
    } else {
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Optional: Close siblings if desired (keeping clean single or multi toggle)
      accordionItems.forEach((sibling) => {
        if (sibling !== item && sibling.classList.contains('active')) {
          sibling.classList.remove('active');
          const sibContent = sibling.querySelector('.accordion-content');
          const sibTrigger = sibling.querySelector('.accordion-trigger');
          if (sibContent) sibContent.style.maxHeight = null;
          if (sibTrigger) sibTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        content.style.maxHeight = null;
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
