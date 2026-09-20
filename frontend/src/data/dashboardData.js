export const sidebarItems = [
  { label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
  { label: 'Live Operations', icon: 'Activity', path: '/live-operations' },
  { label: 'Ride Management', icon: 'CarFront', path: '/ride-management' },
  { label: 'Driver Management', icon: 'Users', path: '/driver-management' },
  { label: 'Customer Management', icon: 'UserRound', path: '/customer-management' },
  { label: 'Revenue & Payments', icon: 'DollarSign', path: '/revenue' },
  { label: 'Analytics', icon: 'BarChart3', path: '/analytics' },
  { label: 'Reports', icon: 'FileText', path: '/reports' },
  { label: 'Complaints & Support', icon: 'MessageSquare', path: '/support' },
  { label: 'Notifications', icon: 'Bell', path: '/notifications' },
  { label: 'Admin Users', icon: 'ShieldCheck', path: '/admin-users' },
  { label: 'Settings', icon: 'Settings', path: '/settings' },
]

export const dashboardMetrics = [
  { label: 'Total Rides', value: '18,420', delta: '+12.8%', trend: 'up', icon: 'CarFront' },
  { label: 'Active Drivers', value: '1,284', delta: '+4.1%', trend: 'up', icon: 'Users' },
  { label: 'Total Revenue', value: '$2.38M', delta: '+18.6%', trend: 'up', icon: 'DollarSign' },
  { label: 'Customer Rating', value: '4.8/5', delta: '+0.2', trend: 'up', icon: 'Star' },
  { label: 'Completed Rides', value: '16,204', delta: '+9.5%', trend: 'up', icon: 'CheckCircle2' },
  { label: 'Cancelled Rides', value: '542', delta: '-6.3%', trend: 'down', icon: 'XCircle' },
  { label: 'Total Customers', value: '48,900', delta: '+11.2%', trend: 'up', icon: 'UserRound' },
  { label: 'Average Ride Fare', value: '$24.80', delta: '+3.7%', trend: 'up', icon: 'Wallet' },
]

export const rideActivityData = [
  { name: 'Sep 07', completed: 240, cancelled: 22 },
  { name: 'Sep 08', completed: 270, cancelled: 18 },
  { name: 'Sep 09', completed: 310, cancelled: 25 },
  { name: 'Sep 10', completed: 290, cancelled: 21 },
  { name: 'Sep 11', completed: 360, cancelled: 30 },
  { name: 'Sep 12', completed: 420, cancelled: 33 },
  { name: 'Sep 13', completed: 390, cancelled: 28 },
  { name: 'Sep 14', completed: 335, cancelled: 24 },
  { name: 'Sep 15', completed: 352, cancelled: 26 },
  { name: 'Sep 16', completed: 378, cancelled: 23 },
  { name: 'Sep 17', completed: 404, cancelled: 31 },
  { name: 'Sep 18', completed: 448, cancelled: 35 },
  { name: 'Sep 19', completed: 472, cancelled: 29 },
  { name: 'Sep 20', completed: 436, cancelled: 27 },
]

export const revenueData = [
  { name: 'Jan', revenue: 320000 },
  { name: 'Feb', revenue: 370000 },
  { name: 'Mar', revenue: 345000 },
  { name: 'Apr', revenue: 410000 },
  { name: 'May', revenue: 460000 },
  { name: 'Jun', revenue: 520000 },
  { name: 'Jul', revenue: 548000 },
  { name: 'Aug', revenue: 575000 },
  { name: 'Sep', revenue: 612000 },
  { name: 'Oct', revenue: 640000 },
  { name: 'Nov', revenue: 681000 },
  { name: 'Dec', revenue: 724000 },
]

export const distributionData = [
  { name: 'Economy', value: 42 },
  { name: 'Premium', value: 25 },
  { name: 'XL', value: 18 },
  { name: 'Pool', value: 10 },
  { name: 'Airport', value: 5 },
]

export const driverPerformance = [
  { name: 'D-104', rides: 182, rating: 4.9 },
  { name: 'D-112', rides: 176, rating: 4.8 },
  { name: 'D-230', rides: 165, rating: 4.7 },
  { name: 'D-440', rides: 154, rating: 4.9 },
  { name: 'D-510', rides: 142, rating: 4.6 },
  { name: 'D-604', rides: 138, rating: 4.8 },
  { name: 'D-718', rides: 131, rating: 4.7 },
  { name: 'D-822', rides: 124, rating: 4.5 },
]

export const recentActivities = [
  { id: 1, title: 'New driver verification approved', detail: 'Driver #D-114 cleared KYC review', time: '2 min ago' },
  { id: 2, title: 'Refund dispute opened', detail: 'Ticket #TK-823 assigned for review', time: '14 min ago' },
  { id: 3, title: 'Payment batch processed', detail: '$84,230 sent to 146 drivers', time: '1 hour ago' },
  { id: 4, title: 'High-demand zone alert', detail: 'Airport corridor demand up 18%', time: '2 hours ago' },
]

export const systemAlerts = [
  { id: 1, severity: 'High', message: '3 payment failures require follow-up', time: '10 min ago' },
  { id: 2, severity: 'Medium', message: 'Route congestion in Midtown West', time: '37 min ago' },
  { id: 3, severity: 'Low', message: 'Driver onboarding queue reduced to 12', time: '1 hour ago' },
]

export const topDrivers = [
  { name: 'Maya Cooper', rides: 264, earnings: '$8,420', rating: 4.9 },
  { name: 'Luis Patel', rides: 248, earnings: '$7,980', rating: 4.8 },
  { name: 'Aria Chen', rides: 236, earnings: '$7,450', rating: 4.9 },
]

export const recentTransactions = [
  { id: 'TRX-4812', customer: 'Olivia Scott', driver: 'Luis Patel', amount: '$42.90', status: 'Paid' },
  { id: 'TRX-4813', customer: 'James Kim', driver: 'Maya Cooper', amount: '$67.20', status: 'Pending' },
  { id: 'TRX-4814', customer: 'Aisha Rahman', driver: 'Aria Chen', amount: '$31.40', status: 'Refunded' },
  { id: 'TRX-4815', customer: 'Noah Brooks', driver: 'Marcus Hill', amount: '$55.10', status: 'Paid' },
]

export const liveRides = [
  { id: 'R-20814', customer: 'Alice Johnson', driver: 'Maya Cooper', pickup: 'Midtown Station', drop: 'Hudson Yards', status: 'Active', fare: '$34.50', time: '09:15 AM' },
  { id: 'R-20815', customer: 'Noah Brooks', driver: 'Marcus Hill', pickup: 'Wall Street', drop: 'LaGuardia Airport', status: 'Pending', fare: '$58.20', time: '09:22 AM' },
  { id: 'R-20816', customer: 'Priya Shah', driver: 'Aria Chen', pickup: 'Brooklyn Heights', drop: 'Downtown Manhattan', status: 'Completed', fare: '$42.00', time: '08:40 AM' },
  { id: 'R-20817', customer: 'Daniel Martin', driver: 'Luis Patel', pickup: 'Times Square', drop: 'Chelsea', status: 'Cancelled', fare: '$0.00', time: '08:30 AM' },
]

export const rideTable = [
  { id: 'R-1001', customer: 'Lucas Moore', driver: 'Maya Cooper', pickup: 'Central Park', destination: 'SoHo', type: 'Economy', fare: '$28.40', payment: 'Paid', status: 'Completed', date: '2026-09-18' },
  { id: 'R-1002', customer: 'Emma Walker', driver: 'Luis Patel', pickup: 'Brooklyn', destination: 'JFK Airport', type: 'Airport', fare: '$62.10', payment: 'Pending', status: 'In Transit', date: '2026-09-18' },
  { id: 'R-1003', customer: 'Sofia Price', driver: 'Aria Chen', pickup: 'Harlem', destination: 'Upper East Side', type: 'Premium', fare: '$48.25', payment: 'Paid', status: 'Completed', date: '2026-09-17' },
  { id: 'R-1004', customer: 'Ethan Ross', driver: 'Marcus Hill', pickup: 'Queens', destination: 'Lower Manhattan', type: 'XL', fare: '$76.50', payment: 'Refunded', status: 'Cancelled', date: '2026-09-17' },
]

export const driverData = [
  { id: 'DRV-101', name: 'Maya Cooper', phone: '+1 555 410 2901', email: 'maya@ubercommand.demo', vehicle: 'Tesla Model 3', reg: 'NYC-4031', rides: 264, rating: 4.9, earnings: '$8,420', status: 'Online', verification: 'Verified' },
  { id: 'DRV-102', name: 'Luis Patel', phone: '+1 555 908 1208', email: 'luis@ubercommand.demo', vehicle: 'Hyundai Sonata', reg: 'NYC-7619', rides: 248, rating: 4.8, earnings: '$7,980', status: 'Busy', verification: 'Verified' },
  { id: 'DRV-103', name: 'Aria Chen', phone: '+1 555 873 1144', email: 'aria@ubercommand.demo', vehicle: 'BMW 5 Series', reg: 'NYC-2105', rides: 236, rating: 4.9, earnings: '$7,450', status: 'Online', verification: 'Pending' },
  { id: 'DRV-104', name: 'Marcus Hill', phone: '+1 555 220 7702', email: 'marcus@ubercommand.demo', vehicle: 'Mercedes C-Class', reg: 'NYC-6332', rides: 154, rating: 4.6, earnings: '$5,820', status: 'Offline', verification: 'Verified' },
]

export const fleetMetrics = [
  { label: 'Total Vehicles', value: '1,248', delta: '+8.4%', trend: 'up', icon: 'CarFront' },
  { label: 'Active Fleet', value: '934', delta: '+5.6%', trend: 'up', icon: 'CheckCircle2' },
  { label: 'Vehicle Types', value: '6', delta: '+1', trend: 'up', icon: 'BarChart3' },
  { label: 'Fleet Owners', value: '148', delta: '+12.1%', trend: 'up', icon: 'UserRound' },
]

export const vehicleTypeData = [
  { name: 'Sedan', count: 410, utilization: 82 },
  { name: 'SUV', count: 310, utilization: 76 },
  { name: 'EV', count: 245, utilization: 91 },
  { name: 'Luxury', count: 170, utilization: 68 },
  { name: 'Van', count: 80, utilization: 63 },
  { name: 'Bike', count: 33, utilization: 88 },
  { name: 'Hybrid', count: 72, utilization: 86 },
  { name: 'Wheelchair', count: 18, utilization: 54 },
]

export const fleetIntelligenceData = [
  { name: 'All Fleet', utilization: 81, completedRides: 16204, revenue: 2380000, cancellationRate: 2.9, hourlyDemand: [42, 58, 76, 94, 82, 68] },
  { name: 'Sedan', utilization: 82, completedRides: 5480, revenue: 724000, cancellationRate: 2.5, hourlyDemand: [18, 26, 38, 48, 42, 34] },
  { name: 'SUV', utilization: 76, completedRides: 3840, revenue: 612000, cancellationRate: 3.4, hourlyDemand: [10, 15, 22, 31, 26, 21] },
  { name: 'EV', utilization: 91, completedRides: 3260, revenue: 548000, cancellationRate: 1.8, hourlyDemand: [9, 13, 19, 27, 25, 18] },
  { name: 'Luxury', utilization: 68, completedRides: 1980, revenue: 436000, cancellationRate: 3.1, hourlyDemand: [5, 8, 12, 15, 14, 12] },
  { name: 'Van', utilization: 63, completedRides: 1040, revenue: 198000, cancellationRate: 4.2, hourlyDemand: [3, 5, 8, 10, 9, 7] },
  { name: 'Bike', utilization: 88, completedRides: 604, revenue: 92000, cancellationRate: 2.1, hourlyDemand: [4, 7, 9, 11, 10, 8] },
]

export const fleetOwnershipData = [
  { name: 'Maya Cooper', vehicles: 86 },
  { name: 'Luis Patel', vehicles: 74 },
  { name: 'Aria Chen', vehicles: 61 },
  { name: 'Marcus Hill', vehicles: 55 },
  { name: 'Fleet Group A', vehicles: 142 },
  { name: 'Fleet Group B', vehicles: 118 },
  { name: 'Fleet Group C', vehicles: 96 },
  { name: 'Other owners', vehicles: 616 },
]

export const vehicleFleet = [
  { id: 'VH-101', owner: 'Maya Cooper', type: 'EV', model: 'Tesla Model 3', plate: 'NYC-4031', driver: 'Maya Cooper', status: 'Active', mileage: '12,480 km', fuel: 'Electric' },
  { id: 'VH-204', owner: 'Luis Patel', type: 'Sedan', model: 'Hyundai Sonata', plate: 'NYC-7619', driver: 'Luis Patel', status: 'Assigned', mileage: '18,220 km', fuel: 'Petrol' },
  { id: 'VH-317', owner: 'Aria Chen', type: 'Luxury', model: 'BMW 5 Series', plate: 'NYC-2105', driver: 'Aria Chen', status: 'Active', mileage: '17,140 km', fuel: 'Petrol' },
  { id: 'VH-421', owner: 'Marcus Hill', type: 'SUV', model: 'Mercedes C-Class', plate: 'NYC-6332', driver: 'Marcus Hill', status: 'Maintenance', mileage: '22,760 km', fuel: 'Diesel' },
  { id: 'VH-510', owner: 'Fleet Group A', type: 'Van', model: 'Ford Transit', plate: 'NYC-1904', driver: 'Ravi Shah', status: 'Active', mileage: '28,990 km', fuel: 'Diesel' },
  { id: 'VH-628', owner: 'Fleet Group B', type: 'Bike', model: 'Royal Enfield', plate: 'NYC-4482', driver: 'Karan Mehta', status: 'Assigned', mileage: '9,450 km', fuel: 'Petrol' },
]

export const customerData = [
  { id: 'CUS-201', name: 'Olivia Scott', email: 'olivia@example.com', phone: '+1 555 800 8201', rides: 58, spend: '$1,244', date: '2025-02-14', status: 'Active' },
  { id: 'CUS-202', name: 'James Kim', email: 'jkim@example.com', phone: '+1 555 406 9238', rides: 44, spend: '$980', date: '2025-04-02', status: 'Active' },
  { id: 'CUS-203', name: 'Aisha Rahman', email: 'aisha@example.com', phone: '+1 555 902 5411', rides: 26, spend: '$610', date: '2025-07-12', status: 'Review' },
  { id: 'CUS-204', name: 'Noah Brooks', email: 'nbrooks@example.com', phone: '+1 555 610 4767', rides: 71, spend: '$1,630', date: '2024-12-19', status: 'Active' },
]

export const revenueKpis = [
  { label: 'Total Revenue', value: '$2.38M', delta: '+18.6%' },
  { label: 'Today\'s Revenue', value: '$84.2K', delta: '+7.1%' },
  { label: 'Monthly Revenue', value: '$684K', delta: '+12.4%' },
  { label: 'Pending Payouts', value: '$142K', delta: '-2.4%' },
  { label: 'Refund Amount', value: '$8.4K', delta: '-1.2%' },
  { label: 'Average Ride Revenue', value: '$24.80', delta: '+3.7%' },
]

export const tickets = [
  { id: 'TK-801', customer: 'Aisha Rahman', ride: 'R-1442', subject: 'Driver arrived late', priority: 'High', status: 'Open', assigned: 'Nina Patel', date: '2026-09-19' },
  { id: 'TK-802', customer: 'Noah Brooks', ride: 'R-1567', subject: 'Incorrect fare charged', priority: 'Medium', status: 'In Progress', assigned: 'David Cole', date: '2026-09-18' },
  { id: 'TK-803', customer: 'Olivia Scott', ride: 'R-1620', subject: 'Complaint about ride quality', priority: 'Low', status: 'Resolved', assigned: 'Mila Ortiz', date: '2026-09-17' },
]

export const notifications = [
  { id: 1, title: 'New driver registration', message: 'Driver D-604 has submitted onboarding docs', type: 'System', time: '3 minutes ago', read: false },
  { id: 2, title: 'Payment failed', message: 'Batch payment for region 2 pending review', type: 'Finance', time: '21 minutes ago', read: false },
  { id: 3, title: 'Support ticket update', message: 'Ticket TK-802 was reassigned to finance review', type: 'Support', time: '1 hour ago', read: true },
  { id: 4, title: 'Admin announcement', message: 'Weekend surge pricing policy updated', type: 'Operations', time: '2 hours ago', read: true },
]

export const users = [
  { name: 'Alicia Gomez', role: 'Super Admin', status: 'Active' },
  { name: 'Ravi Shah', role: 'Operations Admin', status: 'Active' },
  { name: 'Nina Patel', role: 'Support Admin', status: 'Active' },
  { name: 'David Cole', role: 'Finance Admin', status: 'Inactive' },
]

export const cancellationReasons = [
  { name: 'Long wait time', value: 34 },
  { name: 'Route issue', value: 23 },
  { name: 'Driver cancelled', value: 18 },
  { name: 'Customer no-show', value: 16 },
  { name: 'Weather', value: 9 },
  { name: 'Payment issue', value: 7 },
  { name: 'Wrong pickup', value: 6 },
  { name: 'Other', value: 4 },
]
