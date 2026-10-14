// Protect pages that require authentication
// Include this script on dashboard.html and profile.html

(async function protectPage() {
  const session = await window.auth.getSession();

  if (!session) {
    // Not logged in → redirect to login
    window.location.href = 'login.html';
    return;
  }

  // Optional: listen for auth state changes
  window.supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || !session) {
      window.location.href = 'login.html';
    }
  });
})();
