// Authentication utility for Wardrobe
// Shared authentication logic across all pages

// Logout handler
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
}

// Setup logout links
document.addEventListener('DOMContentLoaded', function() {
    // Find all logout links
    const logoutLinks = document.querySelectorAll('a[href="index.html"]');
    
    logoutLinks.forEach(link => {
        const text = link.textContent.toLowerCase();
        if (text.includes('logout') || text.includes('log out')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                handleLogout();
            });
        }
    });
});
