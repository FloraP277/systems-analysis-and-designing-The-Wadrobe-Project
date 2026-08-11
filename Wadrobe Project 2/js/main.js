// Main JavaScript for The Wardrobe Project
// Homepage animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Animate stat numbers on page load
    animateStats();
    
    // Handle login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Animate stat counters
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (!target) return;
        
        const increment = target / 50;
        let current = 0;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current).toLocaleString();
                setTimeout(updateCount, 30);
            } else {
                stat.textContent = target.toLocaleString();
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.disconnect();
                }
            });
        });
        
        observer.observe(stat);
    });
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Demo authentication
    if (username === 'admin' && password === 'password') {
        // Store user session in localStorage for persistence
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({
            username: username,
            role: 'admin',
            loginTime: new Date().toISOString()
        }));
        
        // Show success message
        alert('Login successful! Redirecting to dashboard...');
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials. Please use: admin / password');
    }
}

// Check login status and update UI
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
    
    if (isLoggedIn && loginBtn) {
        const user = JSON.parse(localStorage.getItem('user'));
        loginBtn.innerHTML = '<i class="bi bi-person-circle"></i> ' + user.username;
        loginBtn.removeAttribute('data-bs-toggle');
        loginBtn.removeAttribute('data-bs-target');
        loginBtn.onclick = handleLogout;
    }
}

// Handle logout
function handleLogout(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation to sections as they come into view
const observeElements = document.querySelectorAll('.feature-card, .stat-card, .team-card');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

observeElements.forEach(el => fadeObserver.observe(el));

// Check login on page load
checkLoginStatus();
