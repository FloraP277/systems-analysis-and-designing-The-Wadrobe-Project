// Customer Management JavaScript
// Handle customer profiles, purchase history, and preferences

const customersData = [
    {
        id: 1,
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.j@email.com',
        phone: '(555) 123-4567',
        segment: 'vip',
        preferences: ['vintage-denim', 'dresses'],
        totalSpent: 845.50,
        visits: 23,
        lastVisit: '2025-12-05',
        purchases: [
            { date: '2025-12-05', items: 'Vintage Jeans, Leather Jacket', total: 127.50 },
            { date: '2025-11-28', items: 'Floral Dress', total: 45.00 },
            { date: '2025-11-15', items: 'Designer Handbag', total: 120.00 }
        ]
    },
    {
        id: 2,
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'mchen@email.com',
        phone: '(555) 234-5678',
        segment: 'regular',
        preferences: ['outerwear', 'accessories'],
        totalSpent: 532.00,
        visits: 15,
        lastVisit: '2025-12-04',
        purchases: [
            { date: '2025-12-04', items: '90s Windbreaker', total: 85.00 },
            { date: '2025-11-20', items: 'Vintage Scarf, Sunglasses', total: 37.00 }
        ]
    },
    {
        id: 3,
        firstName: 'Emma',
        lastName: 'Davis',
        email: 'emma.davis@email.com',
        phone: '(555) 345-6789',
        segment: 'vip',
        preferences: ['dresses', 'accessories', 'tops'],
        totalSpent: 1240.75,
        visits: 34,
        lastVisit: '2025-12-06',
        purchases: [
            { date: '2025-12-06', items: 'Summer Dress, Handbag, Scarf', total: 215.75 },
            { date: '2025-12-01', items: 'Vintage T-Shirts (3)', total: 75.00 },
            { date: '2025-11-25', items: 'Maxi Dress, Belt', total: 68.00 }
        ]
    },
    {
        id: 4,
        firstName: 'James',
        lastName: 'Wilson',
        email: 'jwilson@email.com',
        phone: '(555) 456-7890',
        segment: 'regular',
        preferences: ['vintage-denim', 'tops'],
        totalSpent: 387.50,
        visits: 11,
        lastVisit: '2025-12-03',
        purchases: [
            { date: '2025-12-03', items: 'Vintage Jeans', total: 98.00 },
            { date: '2025-11-18', items: 'Band T-Shirt', total: 25.00 }
        ]
    },
    {
        id: 5,
        firstName: 'Lisa',
        lastName: 'Anderson',
        email: 'lisa.a@email.com',
        phone: '(555) 567-8901',
        segment: 'vip',
        preferences: ['outerwear', 'dresses', 'shoes'],
        totalSpent: 1567.25,
        visits: 42,
        lastVisit: '2025-12-05',
        purchases: [
            { date: '2025-12-05', items: 'Leather Jacket, Dress, Shoes', total: 156.25 },
            { date: '2025-11-29', items: 'Platform Shoes', total: 75.00 },
            { date: '2025-11-22', items: 'Winter Coat', total: 185.00 }
        ]
    },
    {
        id: 6,
        firstName: 'Robert',
        lastName: 'Taylor',
        email: 'rtaylor@email.com',
        phone: '(555) 678-9012',
        segment: 'new',
        preferences: ['vintage-denim'],
        totalSpent: 65.00,
        visits: 1,
        lastVisit: '2025-12-06',
        purchases: [
            { date: '2025-12-06', items: 'Vintage Jeans', total: 65.00 }
        ]
    }
];

let selectedCustomerId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadCustomerList();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('customerSearch')?.addEventListener('input', filterCustomers);
    document.getElementById('segmentFilter')?.addEventListener('change', filterCustomers);
    document.getElementById('preferenceFilter')?.addEventListener('change', filterCustomers);
}

function loadCustomerList() {
    renderCustomerList(customersData);
}

function renderCustomerList(customers) {
    const listDiv = document.getElementById('customerList');
    if (!listDiv) return;
    
    listDiv.innerHTML = '';
    
    customers.forEach(customer => {
        const segmentColors = {
            'vip': 'warning',
            'regular': 'primary',
            'new': 'success',
            'inactive': 'secondary'
        };
        
        const listItem = document.createElement('a');
        listItem.href = '#';
        listItem.className = 'list-group-item list-group-item-action';
        listItem.onclick = (e) => {
            e.preventDefault();
            selectCustomer(customer.id);
        };
        
        listItem.innerHTML = `
            <div class="d-flex align-items-center">
                <div class="customer-avatar me-3">
                    ${customer.firstName.charAt(0)}${customer.lastName.charAt(0)}
                </div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="mb-0">${customer.firstName} ${customer.lastName}</h6>
                            <small class="text-muted">${customer.email}</small>
                        </div>
                        <span class="badge bg-${segmentColors[customer.segment]}">${customer.segment.toUpperCase()}</span>
                    </div>
                    <small class="text-muted">
                        <i class="bi bi-bag"></i> ${customer.visits} visits | 
                        <i class="bi bi-cash"></i> $${customer.totalSpent.toFixed(2)}
                    </small>
                </div>
            </div>
        `;
        
        listDiv.appendChild(listItem);
    });
}

function selectCustomer(customerId) {
    selectedCustomerId = customerId;
    const customer = customersData.find(c => c.id === customerId);
    if (!customer) return;
    
    // Highlight selected customer
    document.querySelectorAll('#customerList .list-group-item').forEach((item, index) => {
        item.classList.toggle('active', customersData[index].id === customerId);
    });
    
    // Display customer details
    displayCustomerDetails(customer);
}

function displayCustomerDetails(customer) {
    const detailsCard = document.getElementById('customerDetailsCard');
    if (!detailsCard) return;
    
    const segmentColors = {
        'vip': 'warning',
        'regular': 'primary',
        'new': 'success',
        'inactive': 'secondary'
    };
    
    const preferenceLabels = {
        'vintage-denim': 'Vintage Denim',
        'outerwear': 'Outerwear',
        'dresses': 'Dresses',
        'accessories': 'Accessories',
        'tops': 'Tops',
        'shoes': 'Shoes'
    };
    
    detailsCard.innerHTML = `
        <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
                <i class="bi bi-person-circle"></i> ${customer.firstName} ${customer.lastName}
            </h5>
            <span class="badge bg-${segmentColors[customer.segment]}">${customer.segment.toUpperCase()}</span>
        </div>
        <div class="card-body">
            <div class="row mb-4">
                <div class="col-md-6">
                    <h6 class="text-muted mb-3">Contact Information</h6>
                    <p class="mb-2">
                        <i class="bi bi-envelope text-primary"></i>
                        <a href="mailto:${customer.email}">${customer.email}</a>
                    </p>
                    <p class="mb-2">
                        <i class="bi bi-telephone text-primary"></i>
                        <a href="tel:${customer.phone}">${customer.phone}</a>
                    </p>
                    <p class="mb-0">
                        <i class="bi bi-calendar text-primary"></i>
                        Last visit: ${new Date(customer.lastVisit).toLocaleDateString()}
                    </p>
                </div>
                <div class="col-md-6">
                    <h6 class="text-muted mb-3">Customer Metrics</h6>
                    <div class="mb-2">
                        <strong>Total Spent:</strong> 
                        <span class="text-success fs-5">$${customer.totalSpent.toFixed(2)}</span>
                    </div>
                    <div class="mb-2">
                        <strong>Total Visits:</strong> ${customer.visits}
                    </div>
                    <div class="mb-2">
                        <strong>Avg. Purchase:</strong> $${(customer.totalSpent / customer.visits).toFixed(2)}
                    </div>
                </div>
            </div>
            
            <div class="mb-4">
                <h6 class="text-muted mb-3">Preferences</h6>
                ${customer.preferences.map(pref => 
                    `<span class="badge bg-info me-2 mb-2">${preferenceLabels[pref]}</span>`
                ).join('')}
            </div>
            
            <div class="mb-3">
                <h6 class="text-muted mb-3">Purchase History</h6>
                <div class="table-responsive">
                    <table class="table table-sm table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${customer.purchases.map(purchase => `
                                <tr>
                                    <td>${new Date(purchase.date).toLocaleDateString()}</td>
                                    <td>${purchase.items}</td>
                                    <td><strong>$${purchase.total.toFixed(2)}</strong></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="d-grid gap-2">
                <button class="btn btn-primary" onclick="sendMarketingEmail(${customer.id})">
                    <i class="bi bi-envelope"></i> Send Marketing Email
                </button>
                <button class="btn btn-success" onclick="addLoyaltyPoints(${customer.id})">
                    <i class="bi bi-star"></i> Add Loyalty Points
                </button>
                <button class="btn btn-outline-secondary" onclick="editCustomer(${customer.id})">
                    <i class="bi bi-pencil"></i> Edit Customer
                </button>
            </div>
        </div>
    `;
}

function filterCustomers() {
    const searchTerm = document.getElementById('customerSearch')?.value.toLowerCase() || '';
    const segmentFilter = document.getElementById('segmentFilter')?.value || '';
    const preferenceFilter = document.getElementById('preferenceFilter')?.value || '';
    
    const filtered = customersData.filter(customer => {
        const matchesSearch = 
            customer.firstName.toLowerCase().includes(searchTerm) ||
            customer.lastName.toLowerCase().includes(searchTerm) ||
            customer.email.toLowerCase().includes(searchTerm) ||
            customer.phone.includes(searchTerm);
        
        const matchesSegment = !segmentFilter || customer.segment === segmentFilter;
        const matchesPreference = !preferenceFilter || customer.preferences.includes(preferenceFilter);
        
        return matchesSearch && matchesSegment && matchesPreference;
    });
    
    renderCustomerList(filtered);
}

function addCustomer() {
    alert('New customer added successfully!\n\nCustomer profile created with:\n• Contact information\n• Preferences tracked\n• Ready for first purchase\n• Marketing opt-in recorded');
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('addCustomerModal'));
    modal?.hide();
}

function sendMarketingEmail(customerId) {
    const customer = customersData.find(c => c.id === customerId);
    if (!customer) return;
    
    alert(`Sending personalized email to ${customer.firstName} ${customer.lastName}\n\nEmail will include:\n• New arrivals matching their preferences\n• Exclusive discount code\n• Upcoming sales information`);
}

function addLoyaltyPoints(customerId) {
    const customer = customersData.find(c => c.id === customerId);
    if (!customer) return;
    
    alert(`Adding loyalty points for ${customer.firstName} ${customer.lastName}\n\nCurrent tier: ${customer.segment.toUpperCase()}\nPoints earned from recent purchases\nRewards available for redemption`);
}

function editCustomer(customerId) {
    alert('Customer edit form would open here.\n\nAllows updating:\n• Contact information\n• Preferences\n• Marketing opt-in status\n• Customer notes');
}
