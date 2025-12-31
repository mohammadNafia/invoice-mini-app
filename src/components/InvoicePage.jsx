import { useMemo, useState } from "react";

const initialInvoice = {
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
    { name: "frontend course ", price: 300 },
    { name: "backend course ", price: 75 },
    { name: "backend course ", price: 10 },
  ],
  tax: 0,
  note:
    "This invoice mirrors the provided HTML template and stays in sync with your inputs.",
};

const paymentMethods = [
  { label: "Check", value: "check", referenceLabel: "Check #" },
  { label: "Credit Card", value: "card", referenceLabel: "Last 4 digits" },
  { label: "Bank Transfer", value: "bank", referenceLabel: "Reference ID" },
];

const formatCurrency = (value) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

function InvoicePreview({ invoice, totals }) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 shadow-invoice">
      <header className="flex flex-col gap-6 border-b border-[#E2E8F0] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {invoice.logoUrl ? (
            <img
              src={invoice.logoUrl}
              alt="Invoice logo"
              className="h-12 w-auto max-w-[220px] object-contain"
            />
          ) : (
            <div className="flex h-12 items-center rounded-lg bg-[#E2E8F0] px-4 text-sm font-semibold text-[#334155]">
              Logo
            </div>
          )}
        </div>
        <div className="text-left text-sm text-[#334155] sm:text-right">
          <p className="text-xl font-semibold text-[#0F172A]">
            Invoice #{invoice.number}
          </p>
          <p>Created: {invoice.created}</p>
          <p>Due: {invoice.due}</p>
        </div>
      </header>

      <section className="grid gap-6 py-8 text-sm text-[#334155] sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#334155]">
            From
          </p>
          <p className="font-semibold text-[#0F172A]">{invoice.from.name}</p>
          <p>{invoice.from.street}</p>
          <p>{invoice.from.city}</p>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#334155]">
            Bill To
          </p>
          <p className="font-semibold text-[#0F172A]">{invoice.to.company}</p>
          <p>{invoice.to.name}</p>
          <p>{invoice.to.email}</p>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-[#E2E8F0]">
        <table className="w-full table-auto text-sm">
          <thead className="bg-[#E2E8F0] text-left font-semibold text-[#334155]">
            <tr>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {invoice.items.map((item) => (
              <tr key={item.name} className="bg-[#F8FAFC]">
                <td className="px-6 py-4 text-[#334155]">{item.name}</td>
                <td className="px-6 py-4 text-right font-medium text-[#0F172A]">
                  {formatCurrency(item.price)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4 text-right font-semibold text-[#0F172A]">
                Total
              </td>
              <td className="px-6 py-4 text-right text-base font-semibold text-[#0F172A]">
                {formatCurrency(totals.total)}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

function PaymentForm({
  payment,
  totals,
  onSubmit,
  onMethodChange,
  onReferenceChange,
  status,
  onPay,
}) {
  const currentMethod = paymentMethods.find(
    (method) => method.value === payment.method,
  );

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#E2E8F0] px-6 py-5">
      <form onSubmit={onSubmit}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-[#0F172A]">
            Payment Method
          </span>
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <button
                key={method.value}
                type="button"
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  payment.method === method.value
                    ? "border-[#0F172A] bg-[#F8FAFC] font-semibold text-[#0F172A] shadow-sm"
                    : "border-transparent bg-[#F8FAFC] text-[#334155] hover:border-[#E2E8F0]"
                }`}
                onClick={() => onMethodChange(method.value)}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        <label className="block text-sm font-medium text-[#334155]">
          {currentMethod.referenceLabel}
          <input
            type="text"
            required
            value={payment.reference}
            onChange={(event) => onReferenceChange(event.target.value)}
            className="mt-2 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-sm text-[#334155] shadow-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
            placeholder="Enter payment reference"
          />
        </label>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#334155]">
            Amount due:{" "}
            <span className="font-semibold text-[#0F172A]">
              {formatCurrency(totals.total)}
            </span>
          </p>
          <button
            type="button"
            onClick={onPay}
            className="inline-flex items-center justify-center rounded-lg bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0F766E]/90 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:ring-offset-1"
          >
            Pay Invoice
          </button>
        </div>

        {status && (
          <p className="mt-4 rounded-lg bg-[#FB7185]/15 px-3 py-2 text-sm font-medium text-[#FB7185]">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

export default function InvoicePage() {
  const [invoice, setInvoice] = useState(initialInvoice);
  const [payment, setPayment] = useState({
    method: paymentMethods[0].value,
    reference: "1000",
  });
  const [status, setStatus] = useState("");

  const totals = useMemo(() => {
    const subtotal = invoice.items.reduce((sum, item) => sum + item.price, 0);
    const tax = Number(invoice.tax) || 0;
    return { subtotal, tax, total: subtotal + tax };
  }, [invoice.items, invoice.tax]);

  const handelpayment = () => {
    // Note: scan logic from Page object was removed as it's not applicable in this React context.
    // If you need scanning, you can call my.scan independently.
    my.tradePay({
      paymentUrl: "https://its.mouamle.space/api/payment",
      success: (res) => {
        my.alert({
          content: JSON.stringify(res),
        });
      },
      fail: (res) => {
        my.alert({
          content: JSON.stringify(res),
        });
      },
    });
  };

  const handleInvoiceChange = (field, value) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
  };

  const handlePartyChange = (party, field, value) => {
    setInvoice((prev) => ({
      ...prev,
      [party]: { ...prev[party], [field]: value },
    }));
  };

  const handleItemChange = (index, field, value) => {
    setInvoice((prev) => {
      const items = [...prev.items];
      items[index] = {
        ...items[index],
        [field]: field === "price" ? Number(value) || 0 : value,
      };
      return { ...prev, items };
    });
  };

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { name: "New item", price: 0 }],
    }));
  };

  const removeItem = (index) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, idx) => idx !== index),
    }));
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    setStatus(
      `Payment recorded via ${
        paymentMethods.find((m) => m.value === payment.method)?.label
      }. Reference: ${payment.reference}`,
    );
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:grid lg:grid-cols-[380px,1fr]">
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#0F172A]">
            Invoice Builder
          </h2>
          <p className="mt-1 text-sm text-[#334155]">
            Update the invoice values; the preview updates instantly.
          </p>

          <div className="mt-4 space-y-4 text-sm text-[#334155]">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 sm:col-span-2">
                <span className="font-medium text-[#334155]">Logo URL</span>
                <input
                  type="text"
                  value={invoice.logoUrl}
                  onChange={(event) =>
                    handleInvoiceChange("logoUrl", event.target.value)
                  }
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="https://your-company.com/logo.png"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-medium text-[#334155]">Invoice #</span>
                <input
                  type="text"
                  value={invoice.number}
                  onChange={(event) =>
                    handleInvoiceChange("number", event.target.value)
                  }
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-medium text-[#334155]">Created</span>
                <input
                  type="text"
                  value={invoice.created}
                  onChange={(event) =>
                    handleInvoiceChange("created", event.target.value)
                  }
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-medium text-[#334155]">Due</span>
                <input
                  type="text"
                  value={invoice.due}
                  onChange={(event) =>
                    handleInvoiceChange("due", event.target.value)
                  }
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                />
              </label>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-[#E2E8F0] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#334155]">
                From
              </p>
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  value={invoice.from.name}
                  onChange={(event) =>
                    handlePartyChange("from", "name", event.target.value)
                  }
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="Company"
                />
                <input
                  type="text"
                  value={invoice.from.street}
                  onChange={(event) =>
                    handlePartyChange("from", "street", event.target.value)
                  }
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="Street"
                />
                <input
                  type="text"
                  value={invoice.from.city}
                  onChange={(event) =>
                    handlePartyChange("from", "city", event.target.value)
                  }
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="City"
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-[#E2E8F0] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#334155]">
                Bill To
              </p>
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  value={invoice.to.company}
                  onChange={(event) =>
                    handlePartyChange("to", "company", event.target.value)
                  }
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="Company"
                />
                <input
                  type="text"
                  value={invoice.to.name}
                  onChange={(event) =>
                    handlePartyChange("to", "name", event.target.value)
                  }
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="Contact name"
                />
                <input
                  type="email"
                  value={invoice.to.email}
                  onChange={(event) =>
                    handlePartyChange("to", "email", event.target.value)
                  }
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-[#E2E8F0] p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#334155]">
                  Line Items
                </p>
                <button
                  type="button"
                  onClick={addItem}
                  className="text-xs font-semibold text-[#334155] underline underline-offset-2"
                >
                  Add item
                </button>
              </div>
              <div className="mt-3 space-y-3">
                {invoice.items.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={item.name}
                      onChange={(event) =>
                        handleItemChange(index, "name", event.target.value)
                      }
                      className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                      placeholder="Item name"
                    />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(event) =>
                        handleItemChange(index, "price", event.target.value)
                      }
                      className="w-28 rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                      placeholder="0.00"
                    />
                    {invoice.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-[#334155] hover:text-[#334155]"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-[#334155]">
                Totals update automatically as you edit items.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="font-medium text-[#334155]">Tax / Fees</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={invoice.tax}
                  onChange={(event) =>
                    handleInvoiceChange("tax", event.target.value)
                  }
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="0.00"
                />
              </label>
              <label className="flex flex-col gap-1 sm:col-span-2">
                <span className="font-medium text-[#334155]">Footer Note</span>
                <textarea
                  rows="3"
                  value={invoice.note}
                  onChange={(event) =>
                    handleInvoiceChange("note", event.target.value)
                  }
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="Add an optional note for the client"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <InvoicePreview invoice={invoice} totals={totals} />

          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <PaymentForm
              payment={payment}
              totals={totals}
              status={status}
              onSubmit={handlePaymentSubmit}
              onPay={handelpayment}
              onMethodChange={(value) =>
                setPayment((prev) => ({ ...prev, method: value }))
              }
              onReferenceChange={(value) =>
                setPayment((prev) => ({ ...prev, reference: value }))
              }
            />

            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-6 py-5 text-sm text-[#334155] shadow-sm">
              <h3 className="text-base font-semibold text-[#0F172A]">
                Payment Details
              </h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#0F172A]">
                    {formatCurrency(totals.subtotal)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Tax / Fees</span>
                  <span className="font-medium text-[#0F172A]">
                    {formatCurrency(totals.tax)}
                  </span>
                </li>
                <li className="flex items-center justify-between border-t border-[#E2E8F0] pt-2 text-[#0F172A]">
                  <span className="font-semibold">Total Due</span>
                  <span className="text-base font-semibold">
                    {formatCurrency(totals.total)}
                  </span>
                </li>
              </ul>
              {invoice.note && (
                <p className="mt-4 text-xs text-[#334155]">{invoice.note}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
