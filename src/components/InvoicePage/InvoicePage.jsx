import { useMemo, useState } from "react";
import { initialInvoice, paymentMethods, formatCurrency } from "./invoiceUtils";
import InvoicePreview from "./InvoicePreview";
import PaymentForm from "./PaymentForm";

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
              my.alert({ content: "Payment failed" });
              return;
            }

            const saveInvoiceSession = (invoiceData) => {
              const old = JSON.parse(sessionStorage.getItem("invoices")) || [];
              old.push(invoiceData);
              sessionStorage.setItem("invoices", JSON.stringify(old));
              // Trigger history update across components
              window.dispatchEvent(new Event("invoice-updated"));
            };

            my.tradePay({
              paymentUrl: data.url,
              success: () => {
                saveInvoiceSession({
                  invoice: "INV-" + Date.now(),
                  paymentStatus: "Paid",
                  totalAmount: totals.total,
                  paymentMethod: payment.method,
                  createdAt: new Date().toISOString(),
                  pdfUrl: "https://example.com/invoice.pdf",
                });
                my.alert({ content: "Payment done" });
              },
              fail: () => {
                my.alert({ content: "Payment not completed" });
              },
            });
          })
          .catch(() => {
            my.alert({ content: " error in the operation" });
          });
      },
      fail: () => {
        my.alert({ content: "Scan not completed" });
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
          <h2 className="text-lg font-semibold text-[#0F172A]">Invoice Builder</h2>
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
                  onChange={(event) => handleInvoiceChange("logoUrl", event.target.value)}
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="https://your-company.com/logo.png"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-medium text-[#334155]">Invoice #</span>
                <input
                  type="text"
                  value={invoice.number}
                  onChange={(event) => handleInvoiceChange("number", event.target.value)}
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-medium text-[#334155]">Created</span>
                <input
                  type="text"
                  value={invoice.created}
                  onChange={(event) => handleInvoiceChange("created", event.target.value)}
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-medium text-[#334155]">Due</span>
                <input
                  type="text"
                  value={invoice.due}
                  onChange={(event) => handleInvoiceChange("due", event.target.value)}
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                />
              </label>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-[#E2E8F0] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#334155]">From</p>
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  value={invoice.from.name}
                  onChange={(event) => handlePartyChange("from", "name", event.target.value)}
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="Company"
                />
                <input
                  type="text"
                  value={invoice.from.street}
                  onChange={(event) => handlePartyChange("from", "street", event.target.value)}
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="Street"
                />
                <input
                  type="text"
                  value={invoice.from.city}
                  onChange={(event) => handlePartyChange("from", "city", event.target.value)}
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="City"
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-[#E2E8F0] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#334155]">Bill To</p>
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  value={invoice.to.company}
                  onChange={(event) => handlePartyChange("to", "company", event.target.value)}
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="Company"
                />
                <input
                  type="text"
                  value={invoice.to.name}
                  onChange={(event) => handlePartyChange("to", "name", event.target.value)}
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="Contact name"
                />
                <input
                  type="email"
                  value={invoice.to.email}
                  onChange={(event) => handlePartyChange("to", "email", event.target.value)}
                  className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-[#E2E8F0] p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#334155]">Line Items</p>
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
                  <div key={`${item.name}-${index}`} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(event) => handleItemChange(index, "name", event.target.value)}
                      className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                      placeholder="Item name"
                    />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(event) => handleItemChange(index, "price", event.target.value)}
                      className="w-28 rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                      placeholder="0.00"
                    />
                    {invoice.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-[#334155]"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="font-medium text-[#334155]">Tax / Fees</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={invoice.tax}
                  onChange={(event) => handleInvoiceChange("tax", event.target.value)}
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="0.00"
                />
              </label>
              <label className="flex flex-col gap-1 sm:col-span-2">
                <span className="font-medium text-[#334155]">Footer Note</span>
                <textarea
                  rows="3"
                  value={invoice.note}
                  onChange={(event) => handleInvoiceChange("note", event.target.value)}
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                  placeholder="Add an optional note"
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
              onMethodChange={(value) => setPayment((prev) => ({ ...prev, method: value }))}
              onReferenceChange={(value) => setPayment((prev) => ({ ...prev, reference: value }))}
            />

            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-6 py-5 text-sm text-[#334155] shadow-sm">
              <h3 className="text-base font-semibold text-[#0F172A]">Payment Details</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#0F172A]">{formatCurrency(totals.subtotal)}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Tax / Fees</span>
                  <span className="font-medium text-[#0F172A]">{formatCurrency(totals.tax)}</span>
                </li>
                <li className="flex items-center justify-between border-t border-[#E2E8F0] pt-2 text-[#0F172A]">
                  <span className="font-semibold">Total Due</span>
                  <span className="text-base font-semibold">{formatCurrency(totals.total)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
