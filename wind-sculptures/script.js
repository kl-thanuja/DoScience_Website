// Minimal functional script complying with strict guardrails
document.addEventListener('DOMContentLoaded', () => {
  // Handles quiet download trigger for catalogue
  const downloadBtn = document.querySelector('a[href="#"]');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Placeholder interaction for downloading catalogue document
      console.log('Catalogue download requested.');
    });
  }
});