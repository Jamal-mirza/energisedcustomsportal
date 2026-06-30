export const users = [
  {
    email: 'nathan@energizedcustoms.co.uk',
    name: 'Nathan',
    role: 'Operations Director',
    avatar: 'N'
  },
  {
    email: 'jamal@energizedcustoms.co.uk',
    name: 'Jamal',
    role: 'Tech & AI Innovation Associate',
    avatar: 'J'
  }
];

export const mockOrders = [
  {
    id: 'EC-9401',
    customer: 'David Miller',
    vehicle: '2018 BMW 320d (MW18 TXZ)',
    parts: 'Gloss Black M-Style Mirror Covers (Pair)',
    total: 34.99,
    status: 'Auto-Dispatched',
    time: '10 mins ago',
    shippingMethod: 'DPD Next-Day',
    trackingNumber: 'DPD-9842018'
  },
  {
    id: 'EC-9400',
    customer: 'Sarah Thompson',
    vehicle: '2017 Volkswagen Golf GTI (GT17 GTI)',
    parts: 'Brembo coated Front Brake Discs + Pads',
    total: 129.98,
    status: 'Auto-Dispatched',
    time: '25 mins ago',
    shippingMethod: 'DPD Next-Day',
    trackingNumber: 'DPD-9482019'
  },
  {
    id: 'EC-9399',
    customer: 'Mark Higgins',
    vehicle: '2018 Renault Trafic (TR18 TRA)',
    parts: 'Electric Mirror Assembly Passenger Side',
    total: 42.95,
    status: 'Auto-Dispatched',
    time: '45 mins ago',
    shippingMethod: 'DPD Next-Day',
    trackingNumber: 'DPD-9210482'
  },
  {
    id: 'EC-9398',
    customer: 'Alex Carter',
    vehicle: '2022 Tesla Model 3 (TS22 EEE)',
    parts: 'Bosch Cabin Filter (Sourcing Request)',
    total: 22.99,
    status: 'Awaiting Sourcing',
    time: '1 hour ago',
    shippingMethod: 'Pending Sourcing',
    trackingNumber: 'N/A'
  },
  {
    id: 'EC-9397',
    customer: 'Emma Watson',
    vehicle: '2021 Ford Fiesta (EN71 CUS)',
    parts: 'Powerflex Front Wishbone Rear Bush Kit',
    total: 68.50,
    status: 'Auto-Dispatched',
    time: '2 hours ago',
    shippingMethod: 'DPD Next-Day',
    trackingNumber: 'DPD-9104829'
  }
];

export const initialSourcingQueue = [
  {
    id: 'sourc-1',
    customer: 'Alex Carter',
    email: 'alex.carter@gmail.com',
    vehicle: '2022 Tesla Model 3 (Long Range)',
    partRequested: 'Bosch Cabin Filter (activated charcoal)',
    timeReceived: '1 hour ago',
    status: 'Pending AI Match',
    matchedPart: null,
    supplierCost: null,
    retailPrice: null,
    margin: null,
    emailDraft: ''
  },
  {
    id: 'sourc-2',
    customer: 'George Bentley',
    email: 'gbentley@yahoo.co.uk',
    vehicle: '2020 Land Rover Range Rover Velar 2.0D',
    partRequested: 'Gloss Black Rear Bumper Diffuser Upgrade',
    timeReceived: '3 hours ago',
    status: 'Pending AI Match',
    matchedPart: null,
    supplierCost: null,
    retailPrice: null,
    margin: null,
    emailDraft: ''
  },
  {
    id: 'sourc-3',
    customer: 'Claire Jenkins',
    email: 'clairej@outlook.com',
    vehicle: '2019 Mercedes A-Class A180d',
    partRequested: 'Dynamic LED Smoked Mirror Indicator Lenses',
    timeReceived: '5 hours ago',
    status: 'Quote Sent',
    matchedPart: 'OSRAM Dynamic Mirror Indicator (LED)',
    supplierCost: 18.20,
    retailPrice: 34.99,
    margin: 48.0,
    emailDraft: 'Hi Claire, we have successfully sourced the Dynamic LED Smoked Mirror Indicator Lenses for your 2019 Mercedes A-Class. We can supply this for £34.99 with free next-day shipping. Click the link to secure your order...'
  }
];

export const automationLogSteps = [
  { timeOffset: 500, message: '📥 New Order #EC-9402 received from Shopify webhook.', type: 'info' },
  { timeOffset: 1200, message: '🔍 Running automated fraud risk analysis...', type: 'info' },
  { timeOffset: 1800, message: '✅ Fraud check passed. Risk Score: 0.02 (Low).', type: 'success' },
  { timeOffset: 2500, message: '📦 Querying warehouse inventory management system (ERP)...', type: 'info' },
  { timeOffset: 3000, message: '✅ Part in stock: Loc-A4-Shelf12 (Fiesta Mirror Assembly).', type: 'success' },
  { timeOffset: 3800, message: '🎫 Calling DPD Shipping API to book consignment...', type: 'info' },
  { timeOffset: 4500, message: '🚚 DPD consignment created. Tracking ID: DPD-9482012.', type: 'success' },
  { timeOffset: 5200, message: '💬 Sending SMS tracking notification to customer via Twilio API...', type: 'info' },
  { timeOffset: 5800, message: '📲 SMS sent successfully to +44 7700 900077.', type: 'success' },
  { timeOffset: 6500, message: '🔄 Updating Shopify Order Status: Marked as FULFILLED.', type: 'info' },
  { timeOffset: 7200, message: '🎉 Order #EC-9402 fully automated! Total Time: 6.7 seconds.', type: 'complete' }
];
