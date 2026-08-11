// Consignor Management JavaScript
// Handle consignor tracking, commission calculations, and payouts

const consignorsData = [
    {
        id: 1,
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.garcia@email.com',
        phone: '(555) 111-2222',
        commission: 40,
        paymentMethod: 'bank',
        activeItems: 15,
        soldItems: 28,
        pendingPayout: 847.20,
        totalEarned: 3240.50,
        status: 'active'
    },
    {
        id: 2,
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@email.com',
        phone: '(555) 222-3333',
        commission: 50,
        paymentMethod: 'cash',
        activeItems: 8,
        soldItems: 45,
        pendingPayout: 1125.50,
        totalEarned: 5680.00,
        status: 'active'
    },
    {
        id: 3,
        firstName: 'Emily',
        lastName: 'Johnson',
        email: 'emily.j@email.com',
        phone: '(555) 333-4444',
        commission: 40,
        paymentMethod: 'bank',
        activeItems: 22,
        soldItems: 18,
        pendingPayout: 456.80,
        totalEarned: 1890.25,
        status: 'active'
    },
    {
        id: 4,
        firstName: 'David',
        lastName: 'Lee',
        email: 'david.lee@email.com',
        phone: '(555) 444-5555',
        commission: 45,
        paymentMethod: 'check',
        activeItems: 12,
        soldItems: 32,
        pendingPayout: 892.40,
        totalEarned: 4120.75,
        status: 'active'
    },
    {
        id: 5,
        firstName: 'Sophie',
        lastName: 'Martinez',
        email: 'sophie.m@email.com',
        phone: '(555) 555-6666',
        commission: 40,
        paymentMethod: 'paypal',
        activeItems: 18,
        soldItems: 24,
        pendingPayout: 624.30,
        totalEarned: 2456.00,
        status: 'active'
    },
    {
        id: 6,
        firstName: 'Rachel',
        lastName: 'Brown',
        email: 'rachel.b@email.com',
        phone: '(555) 666-7777',
        commission: 40,
        paymentMethod: 'bank',
        activeItems: 6,
        soldItems: 12,
        pendingPayout: 288.50,
        totalEarned: 945.80,
        status: 'active'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    loadConsignors();
});

function loadConsignors() {
    renderConsignorTable(consignorsData);
}

function renderConsignorTable(consignors) {
    const tbody = document.getElementById('consignorTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    consignors.forEach(consignor => {
        const row = document.createElement('tr');
        
        const statusBadge = consignor.status === 'active' 
            ? '<span class="badge bg-success">Active</span>'
            : '<span class="badge bg-secondary">Inactive</span>';
        
        const paymentBadges = {
            'bank': '<span class="badge bg-primary">Bank</span>',
            'cash': '<span class="badge bg-success">Cash</span>',
            'check': '<span class="badge bg-info">Check</span>',
            'paypal': '<span class="badge bg-warning">PayPal</span>'
        };
        
        row.innerHTML = `
            <td>
                <strong>${consignor.firstName} ${consignor.lastName}</strong>
            </td>
            <td>
                <small class="text-muted d-block">${consignor.email}</small>
                <small class="text-muted">${consignor.phone}</small>
            </td>
            <td><span class="badge bg-primary">${consignor.activeItems}</span></td>
            <td><span class="badge bg-success">${consignor.soldItems}</span></td>
            <td><strong>${consignor.commission}%</strong></td>
            <td class="text-warning fw-bold">$${consignor.pendingPayout.toFixed(2)}</td>
            <td>${statusBadge}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="viewConsignorDetails(${consignor.id})" title="View Details">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-success" onclick="processSinglePayout(${consignor.id})" title="Process Payout">
                        <i class="bi bi-cash"></i>
                    </button>
                    <button class="btn btn-outline-secondary" onclick="editConsignor(${consignor.id})" title="Edit">
                        <i class="bi bi-pencil"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function viewConsignorDetails(consignorId) {
    const consignor = consignorsData.find(c => c.id === consignorId);
    if (!consignor) return;
    
    const modalContent = document.getElementById('consignorDetailsContent');
    if (!modalContent) return;
    
    // Mock consignment items
    const items = [
        { sku: 'WP-VD-001', name: 'Vintage Levi\'s Jeans', price: 65.00, status: 'Active' },
        { sku: 'WP-DR-045', name: 'Floral Dress', price: 45.00, status: 'Active' },
        { sku: 'WP-AC-087', name: 'Designer Handbag', price: 120.00, status: 'Sold' }
    ];
    
    modalContent.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-6">
                <h6 class="text-muted mb-3">Consignor Information</h6>
                <p><strong>Name:</strong> ${consignor.firstName} ${consignor.lastName}</p>
                <p><strong>Email:</strong> ${consignor.email}</p>
                <p><strong>Phone:</strong> ${consignor.phone}</p>
                <p><strong>Commission Rate:</strong> ${consignor.commission}%</p>
                <p><strong>Payment Method:</strong> ${consignor.paymentMethod.toUpperCase()}</p>
            </div>
            <div class="col-md-6">
                <h6 class="text-muted mb-3">Financial Summary</h6>
                <p><strong>Active Items:</strong> ${consignor.activeItems}</p>
                <p><strong>Items Sold:</strong> ${consignor.soldItems}</p>
                <p><strong>Pending Payout:</strong> <span class="text-warning fs-5">$${consignor.pendingPayout.toFixed(2)}</span></p>
                <p><strong>Total Earned:</strong> <span class="text-success fs-5">$${consignor.totalEarned.toFixed(2)}</span></p>
            </div>
        </div>
        
        <h6 class="text-muted mb-3">Consignment Items</h6>
        <div class="table-responsive">
            <table class="table table-sm">
                <thead class="table-light">
                    <tr>
                        <th>SKU</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Commission</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(item => `
                        <tr>
                            <td><code>${item.sku}</code></td>
                            <td>${item.name}</td>
                            <td>$${item.price.toFixed(2)}</td>
                            <td>$${(item.price * consignor.commission / 100).toFixed(2)}</td>
                            <td><span class="badge bg-${item.status === 'Active' ? 'primary' : 'success'}">${item.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('consignorDetailsModal'));
    modal.show();
}

function processSinglePayout(consignorId) {
    const consignor = consignorsData.find(c => c.id === consignorId);
    if (!consignor) return;
    
    if (consignor.pendingPayout === 0) {
        alert('No pending payout for this consignor.');
        return;
    }
    
    if (confirm(`Process payout of $${consignor.pendingPayout.toFixed(2)} for ${consignor.firstName} ${consignor.lastName}?\n\nPayment method: ${consignor.paymentMethod.toUpperCase()}`)) {
        // Update totals
        consignor.totalEarned += consignor.pendingPayout;
        consignor.pendingPayout = 0;
        consignor.soldItems = 0; // Reset sold items counter
        
        // Re-render table
        renderConsignorTable(consignorsData);
        
        alert(`Payout processed successfully!\n\nAmount: $${consignor.pendingPayout.toFixed(2)}\nMethod: ${consignor.paymentMethod.toUpperCase()}\n\nReceipt has been generated.`);
        
        console.log('Payout processed for:', consignor);
    }
}

function processAllPayouts() {
    const consignorsWithPending = consignorsData.filter(c => c.pendingPayout > 0);
    
    if (consignorsWithPending.length === 0) {
        alert('No pending payouts to process.');
        return;
    }
    
    const totalPayout = consignorsWithPending.reduce((sum, c) => sum + c.pendingPayout, 0);
    
    if (confirm(`Process payouts for ${consignorsWithPending.length} consignors?\n\nTotal amount: $${totalPayout.toFixed(2)}\n\nThis will:\n• Calculate all commissions\n• Generate payment records\n• Send notifications to consignors`)) {
        consignorsWithPending.forEach(consignor => {
            consignor.totalEarned += consignor.pendingPayout;
            consignor.pendingPayout = 0;
            consignor.soldItems = 0;
        });
        
        renderConsignorTable(consignorsData);
        
        alert(`All payouts processed successfully!\n\n${consignorsWithPending.length} consignors paid\nTotal: $${totalPayout.toFixed(2)}\n\nPayment confirmations sent.`);
    }
}

function addConsignor() {
    alert('New consignor added successfully!\n\nConsignor account created with:\n• Contact information\n• Commission rate\n• Payment preferences\n• Ready to accept items');
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('addConsignorModal'));
    modal?.hide();
}

function editConsignor(consignorId) {
    const consignor = consignorsData.find(c => c.id === consignorId);
    if (!consignor) return;
    
    alert(`Editing consignor: ${consignor.firstName} ${consignor.lastName}\n\nCan update:\n• Contact information\n• Commission rate\n• Payment method\n• Account status`);
}

function exportConsignorReport() {
    alert('Exporting consignor report...\n\nReport includes:\n• All consignor details\n• Pending payouts\n• Historical earnings\n• Item statistics\n\nFile will be downloaded as CSV.');
    
    console.log('Consignor report exported:', consignorsData);
}

function processPayout() {
    alert('Processing payout for selected consignor...\n\nThis would:\n• Calculate final commission\n• Generate payment\n• Send confirmation\n• Update records');
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('consignorDetailsModal'));
    modal?.hide();
}
