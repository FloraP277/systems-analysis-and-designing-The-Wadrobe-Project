// Inventory Management JavaScript
// Handle inventory operations, filtering, and CRUD operations

// Mock inventory data
const inventoryData = [
    { id: 1, sku: 'WP-VD-001', name: 'Vintage Levi\'s 501 Jeans', category: 'vintage-denim', source: 'consignment', size: '32x34', price: 65.00, stock: 12, status: 'in-stock', consignor: 'Maria Garcia' },
    { id: 2, sku: 'WP-OW-015', name: '80s Leather Jacket', category: 'outerwear', source: 'owner', size: 'L', price: 125.00, stock: 5, status: 'in-stock', consignor: null },
    { id: 3, sku: 'WP-DR-032', name: 'Floral Summer Dress', category: 'dresses', source: 'partner', size: 'M', price: 45.00, stock: 8, status: 'in-stock', consignor: 'Partner Store' },
    { id: 4, sku: 'WP-AC-087', name: 'Designer Handbag - Coach', category: 'accessories', source: 'consignment', size: 'One Size', price: 120.00, stock: 3, status: 'low-stock', consignor: 'Emily Johnson' },
    { id: 5, sku: 'WP-TP-042', name: 'Vintage Band T-Shirt', category: 'tops', source: 'flea', size: 'L', price: 25.00, stock: 15, status: 'in-stock', consignor: null },
    { id: 6, sku: 'WP-VD-018', name: 'High-Waisted Mom Jeans', category: 'vintage-denim', source: 'consignment', size: '28x30', price: 55.00, stock: 7, status: 'in-stock', consignor: 'John Smith' },
    { id: 7, sku: 'WP-AC-102', name: 'Vintage Scarves Collection', category: 'accessories', source: 'owner', size: 'Various', price: 15.00, stock: 3, status: 'low-stock', consignor: null },
    { id: 8, sku: 'WP-OW-029', name: '90s Windbreaker', category: 'outerwear', source: 'consignment', size: 'M', price: 48.00, stock: 5, status: 'low-stock', consignor: 'David Lee' },
    { id: 9, sku: 'WP-DR-045', name: 'Vintage Maxi Dress', category: 'dresses', source: 'partner', size: 'S', price: 52.00, stock: 10, status: 'in-stock', consignor: 'Partner Store' },
    { id: 10, sku: 'WP-AC-115', name: 'Retro Sunglasses', category: 'accessories', source: 'flea', size: 'One Size', price: 22.00, stock: 7, status: 'low-stock', consignor: null },
    { id: 11, sku: 'WP-TP-067', name: 'Vintage Graphic Tee', category: 'tops', source: 'consignment', size: 'M', price: 28.00, stock: 12, status: 'in-stock', consignor: 'Sophie Martinez' },
    { id: 12, sku: 'WP-SH-021', name: '70s Platform Shoes', category: 'shoes', source: 'owner', size: '8', price: 75.00, stock: 6, status: 'low-stock', consignor: null },
    { id: 13, sku: 'WP-VD-033', name: 'Vintage Denim Jacket', category: 'vintage-denim', source: 'consignment', size: 'L', price: 85.00, stock: 4, status: 'in-stock', consignor: 'Maria Garcia' },
    { id: 14, sku: 'WP-AC-130', name: 'Vintage Belt Collection', category: 'accessories', source: 'flea', size: 'Various', price: 18.00, stock: 2, status: 'low-stock', consignor: null },
    { id: 15, sku: 'WP-DR-058', name: 'Polka Dot Vintage Dress', category: 'dresses', source: 'consignment', size: 'L', price: 48.00, stock: 9, status: 'in-stock', consignor: 'Emily Johnson' },
];

let filteredData = [...inventoryData];

document.addEventListener('DOMContentLoaded', function() {
    loadInventory();
    setupEventListeners();
});

function setupEventListeners() {
    // Search
    document.getElementById('searchInput')?.addEventListener('input', filterInventory);
    
    // Filters
    document.getElementById('categoryFilter')?.addEventListener('change', filterInventory);
    document.getElementById('sourceFilter')?.addEventListener('change', filterInventory);
    document.getElementById('stockFilter')?.addEventListener('change', filterInventory);
}

function loadInventory() {
    renderInventoryTable(filteredData);
}

function renderInventoryTable(data) {
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        
        // Status badge
        let statusBadge = '';
        if (item.status === 'in-stock') {
            statusBadge = '<span class="badge bg-success">In Stock</span>';
        } else if (item.status === 'low-stock') {
            statusBadge = '<span class="badge bg-warning">Low Stock</span>';
        } else {
            statusBadge = '<span class="badge bg-danger">Out of Stock</span>';
        }
        
        // Category badge
        const categoryBadges = {
            'vintage-denim': 'primary',
            'outerwear': 'success',
            'dresses': 'info',
            'accessories': 'warning',
            'tops': 'secondary',
            'shoes': 'dark'
        };
        const categoryBadge = `<span class="badge bg-${categoryBadges[item.category] || 'secondary'}">${formatCategory(item.category)}</span>`;
        
        // Source badge
        const sourceBadges = {
            'owner': '<span class="badge bg-primary">Store Owned</span>',
            'consignment': '<span class="badge bg-info">Consignment</span>',
            'partner': '<span class="badge bg-success">Partner</span>',
            'flea': '<span class="badge bg-warning">Flea Market</span>'
        };
        
        row.innerHTML = `
            <td><code>${item.sku}</code></td>
            <td><strong>${item.name}</strong></td>
            <td>${categoryBadge}</td>
            <td>${sourceBadges[item.source]}</td>
            <td>${item.size}</td>
            <td><strong>$${item.price.toFixed(2)}</strong></td>
            <td><span class="badge ${item.stock < 5 ? 'bg-warning' : 'bg-success'}">${item.stock}</span></td>
            <td>${statusBadge}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="editItem(${item.id})" title="Edit">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="deleteItem(${item.id})" title="Delete">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Update item count
    document.getElementById('itemCount').textContent = data.length;
}

function formatCategory(category) {
    return category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function filterInventory() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const sourceFilter = document.getElementById('sourceFilter')?.value || '';
    const stockFilter = document.getElementById('stockFilter')?.value || '';
    
    filteredData = inventoryData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                            item.sku.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        const matchesSource = !sourceFilter || item.source === sourceFilter;
        const matchesStock = !stockFilter || item.status === stockFilter;
        
        return matchesSearch && matchesCategory && matchesSource && matchesStock;
    });
    
    renderInventoryTable(filteredData);
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('sourceFilter').value = '';
    document.getElementById('stockFilter').value = '';
    
    filteredData = [...inventoryData];
    renderInventoryTable(filteredData);
}

function addItem() {
    alert('New item added successfully!\n\nIn a production environment, this would:\n• Validate form data\n• Send to backend API\n• Update inventory database\n• Refresh the table');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addItemModal'));
    modal?.hide();
    
    // In real implementation, would add to inventoryData and re-render
}

function editItem(id) {
    const item = inventoryData.find(i => i.id === id);
    if (!item) return;
    
    // Populate edit form
    document.getElementById('editItemId').value = item.id;
    document.getElementById('editItemName').value = item.name;
    document.getElementById('editItemSKU').value = item.sku;
    document.getElementById('editItemPrice').value = item.price;
    document.getElementById('editItemStock').value = item.stock;
    document.getElementById('editItemStatus').value = item.status;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('editItemModal'));
    modal.show();
}

function updateItem() {
    const id = parseInt(document.getElementById('editItemId').value);
    const item = inventoryData.find(i => i.id === id);
    
    if (item) {
        item.name = document.getElementById('editItemName').value;
        item.sku = document.getElementById('editItemSKU').value;
        item.price = parseFloat(document.getElementById('editItemPrice').value);
        item.stock = parseInt(document.getElementById('editItemStock').value);
        item.status = document.getElementById('editItemStatus').value;
        
        // Re-render table
        filterInventory();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editItemModal'));
        modal?.hide();
        
        alert('Item updated successfully!');
    }
}

function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item from inventory?')) {
        const index = inventoryData.findIndex(i => i.id === id);
        if (index > -1) {
            inventoryData.splice(index, 1);
            filterInventory();
            alert('Item deleted successfully!');
        }
    }
}

function exportInventory() {
    alert('Exporting inventory to CSV...\n\nFile will include:\n• All item details\n• Current stock levels\n• Pricing information\n• Source and consignor data');
    
    console.log('Inventory exported:', filteredData);
}
