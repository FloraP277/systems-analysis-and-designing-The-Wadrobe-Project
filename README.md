# Wardrobe - Inventory Management System

A comprehensive static website demonstrating an integrated inventory management system for vintage and modern consignment stores.

## 🎯 Purpose

Wardrobe addresses critical challenges faced by independent vintage clothing boutiques:

- **Disconnected Systems:** Eliminates the need for separate Square POS, Google Sheets, and manual records
- **Manual Calculations:** Automates consignor payout calculations (previously taking 2-3 days monthly)
- **No Customer Insights:** Provides data-driven customer preference tracking and targeted marketing
- **Inventory Inaccuracy:** Improves from 70% to 99% stock accuracy through real-time synchronization

## 🚀 Features

### 1. Dashboard
- Real-time sales metrics and KPIs
- Interactive sales trend charts (Chart.js)
- Category-based sales analysis
- Top-selling items tracking
- Low stock alerts
- Recent transaction history

### 2. Inventory Management
- Comprehensive product catalog with 1,247+ items
- Advanced filtering by category, source, and stock level
- Search functionality (SKU, name, tags)
- CRUD operations for inventory items
- Real-time stock status tracking
- Automated low-stock notifications

### 3. Point of Sale (POS)
- Barcode scanning simulation
- Visual product grid with images
- Shopping cart with quantity management
- Automatic tax calculation (8.5%)
- Discount application
- Multiple payment methods (Cash/Card)
- Receipt generation
- Customer association

### 4. Customer Relationship Management (CRM)
- Customer profile management (892 customers)
- Purchase history tracking
- Customer segmentation (VIP, Regular, New, Inactive)
- Preference-based filtering
- Lifetime value calculation
- Targeted marketing capabilities
- Loyalty program integration

### 5. Consignor Management
- Automated commission calculations
- Multi-source tracking (Owner, Consignment, Partner, Flea Market)
- Pending payout tracking
- Batch payout processing
- Historical earnings reports
- Multiple payment method support
- Consignment item tracking

## 🛠️ Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom styling with vintage boutique aesthetic
- **Bootstrap 5.3.2** - Responsive framework
- **JavaScript (ES6)** - Interactive functionality
- **Chart.js 4.4.0** - Data visualization
- **Bootstrap Icons 1.11.1** - Icon library

## 📁 Project Structure

```
Wadrobe Project/
├── index.html              # Homepage with hero section and features
├── dashboard.html          # Analytics dashboard with charts
├── inventory.html          # Inventory management interface
├── pos.html               # Point of sale system
├── customers.html         # Customer relationship management
├── consignors.html        # Consignor tracking and payouts
├── css/
│   └── style.css          # Custom styling
└── js/
    ├── main.js            # Homepage interactions
    ├── dashboard.js       # Dashboard charts and data
    ├── inventory.js       # Inventory CRUD operations
    ├── pos.js             # POS cart and checkout
    ├── customers.js       # Customer management
    └── consignors.js      # Consignor payout logic
```

## 🎨 Design Features

- **Gradient primary colors:** Purple (#667eea) to violet (#764ba2)
- **Responsive design:** Mobile-first approach
- **Card-based layout:** Modern, clean interface
- **Smooth animations:** Fade-in effects and hover states
- **Vintage aesthetic:** Gold accents and warm colors
- **Accessibility:** Semantic HTML and ARIA labels

## 💾 Mock Data

The system includes realistic demonstration data:

- **15 inventory items** with varied categories, prices, and stock levels
- **6 customers** with purchase history and preferences
- **6 consignors** with commission rates and pending payouts
- **8 POS products** with images and real-time availability
- **Sales analytics** showing weekly trends and category distribution

## 🔐 Demo Login

For demonstration purposes, use these credentials:

- **Username:** admin
- **Password:** password

*(Note: This is for demo only; no actual authentication is implemented)*

## 📊 Key Metrics Demonstrated

- **Total Inventory Items:** 1,247
- **Monthly Revenue:** $45,680
- **Active Customers:** 892
- **Active Consignors:** 43
- **Today's Sales:** $2,847
- **Average Transaction:** $60.57

## 🌟 Key Functionalities

### Automated Workflows
1. **Sale Processing:** POS → Inventory Update → CRM Update → Commission Calculation
2. **Stock Alerts:** Automatic notifications when items fall below threshold
3. **Payout Calculation:** Instant commission calculations based on item source and rate
4. **Real-time Sync:** All modules update simultaneously

### User Benefits
- **Store Owners:** Data-driven inventory decisions, reduced manual work
- **Staff:** Streamlined checkout process, mobile POS capability
- **Customers:** Personalized marketing, better product availability
- **Consignors:** Transparent tracking, automated accurate payouts

## 🚦 Getting Started

1. **Open the project:**
   ```
   Simply open index.html in any modern web browser
   ```

2. **Navigate the system:**
   - Start at the homepage to see the overview
   - Click "View Dashboard" to see analytics
   - Explore Inventory, POS, Customers, and Consignors pages
   - Use the login modal (admin/password) for demonstration

3. **Try interactive features:**
   - Add items to POS cart
   - Filter inventory by category
   - View customer purchase history
   - Process consignor payouts

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🎓 Educational Context

This project demonstrates understanding of:

- **Requirements Analysis:** Stakeholder identification, use case diagrams
- **System Design:** Interface integration, data flow modeling
- **User Experience:** Responsive design, intuitive navigation
- **Business Logic:** Commission calculations, inventory tracking
- **Data Visualization:** Charts, metrics, dashboards

## 📝 Documentation

The system addresses all requirements outlined in the project document:

- ✅ Requirements determination through interviews and questionnaires
- ✅ Use case diagrams showing actor interactions
- ✅ Activity diagrams for workflow processes
- ✅ Stakeholder analysis and system interfaces
- ✅ Mock data for realistic demonstration

## 🔄 Future Enhancements

While this is a static demonstration, a production version would include:

- Backend API integration
- Database persistence
- Real authentication and authorization
- Email notifications
- Payment gateway integration
- Barcode scanner hardware support
- Mobile app companion
- Advanced analytics and ML-based recommendations

## 📄 License

This is an educational project created for academic purposes.

## 🙏 Acknowledgments

- **Instructor:** Dr. William Lee Meeks for guidance and requirements
- **The Wardrobe Project:** For the real-world use case
- **Bootstrap Team:** For the excellent framework
- **Chart.js:** For data visualization capabilities
- **Unsplash:** For product imagery

## 📞 Contact

For questions about this project, please contact Group 2 members through the university system.

---

**Note:** This is a demonstration website using mock data. All customer names, transactions, and financial data are fictional and for educational purposes only.
