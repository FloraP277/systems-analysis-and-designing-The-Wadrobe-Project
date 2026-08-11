// Dashboard JavaScript
// Charts and real-time data visualization

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    initializeCharts();
    loadRecentTransactions();
});

function initializeDashboard() {
    // Check if user is logged in
    const user = sessionStorage.getItem('user');
    if (!user) {
        // Redirect to home if not logged in
        // window.location.href = 'index.html';
    }
    
    // Update real-time data every 30 seconds
    setInterval(updateDashboardData, 30000);
}

// Initialize Chart.js charts
function initializeCharts() {
    // Sales Trend Chart
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Sales ($)',
                    data: [1850, 2300, 1950, 2450, 2847, 3100, 2650],
                    borderColor: 'rgb(102, 126, 234)',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Category Pie Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Vintage Denim', 'Outerwear', 'Dresses', 'Accessories', 'Tops'],
                datasets: [{
                    data: [28, 20, 18, 22, 12],
                    backgroundColor: [
                        'rgb(102, 126, 234)',
                        'rgb(0, 184, 148)',
                        'rgb(253, 203, 110)',
                        'rgb(116, 185, 255)',
                        'rgb(253, 121, 168)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

function loadRecentTransactions() {
    // Mock recent transactions data
    const transactions = [
        { time: '2:45 PM', id: 'TXN-1047', customer: 'Sarah Johnson', items: 3, total: 127.50, status: 'Completed' },
        { time: '2:32 PM', id: 'TXN-1046', customer: 'Michael Chen', items: 1, total: 85.00, status: 'Completed' },
        { time: '2:18 PM', id: 'TXN-1045', customer: 'Emma Davis', items: 5, total: 215.75, status: 'Completed' },
        { time: '1:55 PM', id: 'TXN-1044', customer: 'James Wilson', items: 2, total: 98.00, status: 'Completed' },
        { time: '1:42 PM', id: 'TXN-1043', customer: 'Lisa Anderson', items: 4, total: 156.25, status: 'Completed' }
    ];
    
    // Transactions are already in HTML, but this shows how to update dynamically
    const tbody = document.getElementById('recentTransactions');
    if (tbody && transactions.length > 0) {
        // Already populated in HTML
    }
}

function updateDashboardData() {
    // Simulate real-time updates
    console.log('Dashboard data updated at:', new Date().toLocaleString());
    
    // In a real application, this would fetch fresh data from the server
    // For demo purposes, we'll just log the update
}

function generateReport() {
    alert('Generating comprehensive sales report...\n\nReport includes:\n• Sales Summary\n• Inventory Status\n• Customer Analytics\n• Consignor Payouts\n\nReport will be downloaded as PDF.');
    
    // In a real application, this would generate and download a PDF
    console.log('Report generated at:', new Date().toLocaleString());
}

// Update time display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Update any time displays on the page
    document.querySelectorAll('.current-time').forEach(el => {
        el.textContent = timeString;
    });
}

// Update time every second
setInterval(updateTime, 1000);
updateTime();
