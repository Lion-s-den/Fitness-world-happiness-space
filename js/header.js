// Shared Header - Injected on every page

async function renderHeader() {
  const headerContainer = document.getElementById('header');
  if (!headerContainer) return;

  const session = await window.auth.getSession();
  const isLoggedIn = !!session;

  let navLinks = '';

  if (isLoggedIn) {
    navLinks = `
      <a href="dashboard.html" class="nav-link">Dashboard</a>
      <a href="profile.html" class="nav-link">Profile</a>
      <button onclick="window.auth.signOut()" class="btn btn-outline">Logout</button>
    `;
  } else {
    navLinks = `
      <a href="login.html" class="nav-link">Login</a>
      <a href="signup.html" class="btn btn-primary">Sign Up</a>
    `;
  }

  headerContainer.innerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a href="index.html" class="logo">
          <span class="logo-icon">🏋️</span>
          <span class="logo-text">Fitness World Happiness Space</span>
        </a>
        <nav class="nav">
          ${navLinks}
        </nav>
        <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Toggle menu">
          ☰
        </button>
      </div>
      <div class="mobile-nav" id="mobileNav">
        ${navLinks}
      </div>
    </header>
  `;
}

function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) {
    mobileNav.classList.toggle('open');
  }
}

// Auto-render when DOM is ready
document.addEventListener('DOMContentLoaded', renderHeader);
