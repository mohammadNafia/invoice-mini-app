export const initialInvoice = {
  number: "1",
  created: "January 1, 2026",
  due: "February 1, 2026",
  logoUrl:
    "data:image/png;base64,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",
  from: {
    name: "Muqla, CEO and co-founder",
    street: " 8C7C+JW7",
    city: "Baghdad, Iraq",
  },
  to: {
    company: "ITS",
    name: "Mohammed Nafia",
    email: "mohammadnafia1@gmail.com",
  },
  items: [
    { name: "frontend course", price: 300 },
    { name: "backend course", price: 75 },
    { name: "backend course", price: 10 },
  ],
  tax: 0,
  note:
    "This invoice mirrors the provided HTML template and stays in sync with your inputs.",
};

export const paymentMethods = [
  { label: "Check", value: "check", referenceLabel: "Check #" },
  { label: "Credit Card", value: "card", referenceLabel: "Last 4 digits" },
  { label: "Bank Transfer", value: "bank", referenceLabel: "Reference ID" },
];

export const formatCurrency = (value) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
