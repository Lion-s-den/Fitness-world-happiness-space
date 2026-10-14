// Shared Footer - Injected on every page

function renderFooter() {
  const footerContainer = document.getElementById('footer');
  if (!footerContainer) return;

  const year = new Date().getFullYear();

  footerContainer.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-inner">
        <p>&copy; ${year} Fitness World Happiness Space. All rights reserved.</p>
        <p class="footer-tagline">Move better. Feel happier.</p>
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', renderFooter);
