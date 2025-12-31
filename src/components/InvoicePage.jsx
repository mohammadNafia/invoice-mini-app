import { useMemo, useState } from "react";

/* default invoice */
const initialInvoice = {
  number: "1",
  created: "January 1, 2026",
  due: "February 1, 2026",
  logoUrl: "",
  from: {
    name: "Muqla, CEO and co-founder",
    street: "Baghdad",
    city: "Iraq",
  },
  to: {
    company: "ITS",
    name: "Mohammed Nafia",
    email: "mohammadnafia1@gmail.com",
  },
  items: [
    { name: "Frontend course", price: 300 },
    { name: "Backend course", price: 75 },
    { name: "Backend course", price: 10 },
  ],
  tax: 0,
  note: "",
};

/* payment methods */
const paymentMethods = [
  { label: "Check", value: "check", referenceLabel: "Check #" },
  { label: "Credit Card", value: "card", referenceLabel: "Last 4 digits" },
  { label: "Bank Transfer", value: "bank", referenceLabel: "Reference ID" },
];

/* format currency */
const formatCurrency = (value) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

/* invoice preview */
function InvoicePreview({ invoice, totals }) {
  return (
    <div className="rounded-2xl border p-6 bg-white">
      <h2 className="text-xl font-bold mb-2">
        Invoice #{invoice.number}
      </h2>

      <p className="text-sm text-gray-600">
        Created: {invoice.created} | Due: {invoice.due}
      </p>

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Item</th>
            <th className="p-2 text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td className="p-2">{item.name}</td>
              <td className="p-2 text-right">
                {formatCurrency(item.price)}
              </td>
            </tr>
          ))}

          <tr className="font-bold">
            <td className="p-2 text-right">Total</td>
            <td className="p-2 text-right">
              {formatCurrency(totals.total)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* payment form */
function PaymentForm({
  payment,
  totals,
  onPay,
  onMethodChange,
  onReferenceChange,
}) {
  const currentMethod =
    paymentMethods.find((m) => m.value === payment.method) ||
    paymentMethods[0];

  return (
    <div className="rounded-xl border p-6 bg-gray-50">
      <p className="mb-3 font-semibold">
        Amount: {formatCurrency(totals.total)}
      </p>

      <div className="flex gap-2 mb-4">
        {paymentMethods.map((method) => (
          <button
            key={method.value}
            type="button"
            className={`px-3 py-1 rounded ${
              payment.method === method.value
                ? "bg-teal-600 text-white"
                : "bg-white border"
            }`}
            onClick={() => onMethodChange(method.value)}
          >
            {method.label}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={payment.reference}
        onChange={(e) => onReferenceChange(e.target.value)}
        placeholder={currentMethod.referenceLabel}
        className="w-full mb-4 px-3 py-2 border rounded"
      />

      <button
        onClick={onPay}
        className="bg-teal-600 text-white px-4 py-2 rounded"
      >
        Pay
      </button>
    </div>
  );
}

/* main page */
export default function InvoicePage() {
  const [invoice, setInvoice] = useState(initialInvoice);
  const [payment, setPayment] = useState({
    method: paymentMethods[0].value,
    reference: "",
  });

  /* calculate totals */
  const totals = useMemo(() => {
    const subtotal = invoice.items.reduce(
      (sum, item) => sum + item.price,
      0
    );
    const tax = Number(invoice.tax) || 0;
    return { subtotal, tax, total: subtotal + tax };
  }, [invoice.items, invoice.tax]);

  /* save invoice to session */
  const saveInvoiceSession = (data) => {
    const old =
      JSON.parse(sessionStorage.getItem("invoices")) || [];
    old.push(data);
    sessionStorage.setItem("invoices", JSON.stringify(old));
    window.dispatchEvent(new Event("invoice-updated"));
  };

  /* handle payment */
  const handlePayment = () => {
    const token = localStorage.getItem("user_token");

    if (!token) {
      my.alert({ content: "Please login first" });
      return;
    }

    my.scan({
      type: "qr",

      success: (res) => {
        fetch("https://its.mouamle.space/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            qrCode: res.code,
          }),
        })
          .then((r) => r.json())
          .then((data) => {
            if (!data.url) {
              my.alert({ content: "Payment error" });
              return;
            }

            my.tradePay({
              paymentUrl: data.url,

              success: () => {
                saveInvoiceSession({
                  invoice: "INV-" + Date.now(),
                  paymentStatus: "Paid",
                  totalAmount: totals.total,
                  paymentMethod: payment.method,
                  createdAt: new Date().toISOString(),
                });

                my.alert({ content: "Payment done" });
              },

              fail: () => {
                my.alert({ content: "Payment failed" });
              },
            });
          })
          .catch(() => {
            my.alert({ content: "Server error" });
          });
      },

      fail: () => {
        my.alert({ content: "Scan cancelled" });
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid gap-6 md:grid-cols-2">
      <InvoicePreview invoice={invoice} totals={totals} />

      <PaymentForm
        payment={payment}
        totals={totals}
        onPay={handlePayment}
        onMethodChange={(value) =>
          setPayment((prev) => ({ ...prev, method: value }))
        }
        onReferenceChange={(value) =>
          setPayment((prev) => ({ ...prev, reference: value }))
        }
      />
    </div>
  );
}
