export const operators = ["John", "Maria", "Alex"];

export const dummyBatches = [
  {
    id: "B-001",
    product: "Chocolate Syrup 10L",
    targetQty: 1000,
    uom: "L",
    status: "Planned",
    startTime: null,
    endTime: null,
    materials: [
      { name: "Cocoa Powder", expectedQty: 200, actualQty: 0 },
      { name: "Sugar", expectedQty: 300, actualQty: 0 },
      { name: "Milk", expectedQty: 500, actualQty: 0 },
    ],
  },
  {
    id: "B-002",
    product: "Vanilla Mix 5L",
    targetQty: 500,
    uom: "L",
    status: "In Process",
    startTime: "2025-11-05T08:00",
    endTime: null,
    materials: [
      { name: "Vanilla Extract", expectedQty: 50, actualQty: 0 },
      { name: "Sugar", expectedQty: 150, actualQty: 0 },
      { name: "Milk", expectedQty: 300, actualQty: 0 },
    ],
  },
  {
    id: "B-003",
    product: "Strawberry Shake 20L",
    targetQty: 2000,
    uom: "L",
    status: "Planned",
    startTime: null,
    endTime: null,
    materials: [
      { name: "Strawberry Puree", expectedQty: 400, actualQty: 0 },
      { name: "Sugar", expectedQty: 300, actualQty: 0 },
      { name: "Milk", expectedQty: 1300, actualQty: 0 },
    ],
  },
  {
    id: "B-004",
    product: "Caramel Sauce 15L",
    targetQty: 1500,
    uom: "L",
    status: "In Process",
    startTime: "2025-11-06T10:00",
    endTime: null,
    materials: [
      { name: "Sugar", expectedQty: 600, actualQty: 0 },
      { name: "Butter", expectedQty: 300, actualQty: 0 },
      { name: "Cream", expectedQty: 600, actualQty: 0 },
    ],
  },
  {
    id: "B-005",
    product: "Mint Syrup 10L",
    targetQty: 1000,
    uom: "L",
    status: "Completed",
    startTime: "2025-11-04T07:00",
    endTime: "2025-11-04T13:30",
    materials: [
      { name: "Mint Extract", expectedQty: 100, actualQty: 95 },
      { name: "Sugar", expectedQty: 300, actualQty: 295 },
      { name: "Water", expectedQty: 600, actualQty: 590 },
    ],
  },
  {
    id: "B-006",
    product: "Coffee Mix 8L",
    targetQty: 800,
    uom: "L",
    status: "Planned",
    startTime: null,
    endTime: null,
    materials: [
      { name: "Coffee Powder", expectedQty: 150, actualQty: 0 },
      { name: "Sugar", expectedQty: 250, actualQty: 0 },
      { name: "Milk", expectedQty: 400, actualQty: 0 },
    ],
  },
];

export const dummyLots = [
  {
    lot: "LOT-B001-01",
    product: "Chocolate Syrup 10L",
    yield: 980,
    completedAt: "2025-11-06T15:30:00Z",
    durationSeconds: 7200,
    completedBy:"John",
    inputs: [
      { material: "Cocoa Powder", qty: 200 },
      { material: "Sugar", qty: 300 },
      { material: "Milk", qty: 500 },
    ],
  },
  {
    lot: "LOT-B002-01",
    product: "Vanilla Mix 5L",
    yield: 490,
    completedAt: "2025-11-06T16:00:00Z",
    durationSeconds: 5400,
    completedBy:"Maria",
    inputs: [
      { material: "Vanilla Extract", qty: 50 },
      { material: "Sugar", qty: 150 },
      { material: "Milk", qty: 300 },
    ],
  },
  
];
