import { useMemo, useState } from "react";

const initialInvoice = {
  number: "1",
  created: "January 1, 2026",
  due: "February 1, 2026",
  logoUrl:
    "data:image/png;base64,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",
  from: {
    name: "Muqla, CEO",
    street: "8C7C+JW7",
    city: "Baghdad, Iraq",
    qiAccount: "7700000000",
  },
  to: {
    company: "ITS",
    name: "Mohammed Nafia",
    email: "mo@gmail.com",
    qiAccount: "8800000000",
  },
  items: [
    { name: "Frontend course", price: 300 },
    { name: "Backend course", price: 75 },
  ],
  tax: 0,
  note: "This invoice mirrors the provided template and stays in sync.",
};

const formatCurrency = (val) =>
  val.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function InvoicePage() {
  const [invoice, setInvoice] = useState(initialInvoice);
  const [payment, setPayment] = useState({
    method: "check",
    reference: "1000",
  });

  const totals = useMemo(() => {
    const total =
      invoice.items.reduce((sum, item) => sum + item.price, 0) +
      (Number(invoice.tax) || 0);
    return { total };
  }, [invoice]);

  const handlePay = () => {
    const token = localStorage.getItem("user_token");
    if (!token) return my.alert({ content: "Please login first" });
    my.scan({
      type: "qr",
      success: (res) => {
        fetch("https://its.mouamle.space/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify({ qrCode: res.code }),
        })
          .then((r) => r.json())
          .then((data) => {
            if (!data.url) return my.alert({ content: "Payment failed" });
            my.tradePay({
              paymentUrl: data.url,
              success: () => {
                const invoices = JSON.parse(
                  sessionStorage.getItem("invoices") || "[]"
                );
                invoices.push({
                  invoice: "INV-" + Date.now(),
                  paymentStatus: "Paid",
                  totalAmount: totals.total,
                  paymentMethod: payment.method,
                  createdAt: new Date().toISOString(),
                  pdfUrl:
                    "https://raw.githubusercontent.com/mohammadNafia/pdf-viewer1-/main/invoice.pdf",
                });
                sessionStorage.setItem("invoices", JSON.stringify(invoices));
                window.dispatchEvent(new Event("invoice-updated"));
                my.alert({ content: "Payment done" });
              },
              fail: () => my.alert({ content: "Payment not completed" }),
            });
          })
          .catch(() => my.alert({ content: "Network error" }));
      },
      fail: () => my.alert({ content: "Scan not completed" }),
    });
  };

  const updateInvoice = (field, value) =>
    setInvoice({ ...invoice, [field]: value });
  const updateFrom = (field, value) =>
    setInvoice({ ...invoice, from: { ...invoice.from, [field]: value } });
  const updateTo = (field, value) =>
    setInvoice({ ...invoice, to: { ...invoice.to, [field]: value } });
  const updateItem = (i, field, value) => {
    const newItems = [...invoice.items];
    newItems[i][field] = value;
    setInvoice({ ...invoice, items: newItems });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-10">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10">
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm overflow-y-auto max-h-[90vh]">
          <h2 className="text-xl font-bold text-[#0F172A]">Invoice Builder</h2>

          <div className="space-y-4">
            <h3 className="font-semibold text-[#0F172A] border-b pb-2">
              General Info
            </h3>
            <input
              className="w-full p-3 border rounded-xl text-sm"
              placeholder="Logo URL"
              value={invoice.logoUrl}
              onChange={(e) => updateInvoice("logoUrl", e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                className="p-3 border rounded-xl text-sm"
                placeholder="Invoice #"
                value={invoice.number}
                onChange={(e) => updateInvoice("number", e.target.value)}
              />
              <input
                className="p-3 border rounded-xl text-sm"
                placeholder="Due Date"
                value={invoice.due}
                onChange={(e) => updateInvoice("due", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-[#0F172A] border-b pb-2">
              Sender (From)
            </h3>
            <input
              className="w-full p-3 border rounded-xl text-sm"
              placeholder="Sender Name"
              value={invoice.from.name}
              onChange={(e) => updateFrom("name", e.target.value)}
            />
            <input
              className="w-full p-3 border rounded-xl text-sm"
              placeholder="Qi Account Number"
              value={invoice.from.qiAccount}
              onChange={(e) => updateFrom("qiAccount", e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-[#0F172A] border-b pb-2">
              Recipient (To)
            </h3>
            <input
              className="w-full p-3 border rounded-xl text-sm"
              placeholder="Recipient Name"
              value={invoice.to.name}
              onChange={(e) => updateTo("name", e.target.value)}
            />
            <input
              className="w-full p-3 border rounded-xl text-sm"
              placeholder="Qi Account Number"
              value={invoice.to.qiAccount}
              onChange={(e) => updateTo("qiAccount", e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-[#0F172A] border-b pb-2">
              Items
            </h3>
            {invoice.items.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="flex-1 p-3 border rounded-xl text-sm"
                  value={item.name}
                  onChange={(e) => updateItem(i, "name", e.target.value)}
                />
                <input
                  className="w-24 p-3 border rounded-xl text-sm"
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    updateItem(i, "price", Number(e.target.value))
                  }
                />
              </div>
            ))}
            <button
              className="text-[#0F766E] font-medium text-sm"
              onClick={() =>
                setInvoice({
                  ...invoice,
                  items: [...invoice.items, { name: "New Item", price: 0 }],
                })
              }
            >
              + Add Item
            </button>
          </div>

          <div className="pt-6 border-t">
            <input
              className="w-full p-3 border rounded-xl text-sm"
              placeholder="Reference #"
              value={payment.reference}
              onChange={(e) =>
                setPayment({ ...payment, reference: e.target.value })
              }
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-xl h-fit sticky top-10">
          <div className="flex justify-between items-start mb-10">
            {invoice.logoUrl ? (
              <img
                src={invoice.logoUrl}
                className="h-12 max-w-[150px] object-contain"
                alt="Logo"
              />
            ) : (
              <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-400">
                LOGO
              </div>
            )}
            <div className="text-right">
              <p className="text-2xl font-black text-[#0F172A]">INVOICE</p>
              <p className="text-gray-400 text-sm font-medium">
                #{invoice.number}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mb-10 text-sm">
            <div className="space-y-1">
              <p className="text-gray-400 uppercase font-black text-[10px] tracking-widest mb-2">
                Issued By
              </p>
              <p className="font-bold text-[#0F172A]">{invoice.from.name}</p>
              <p className="text-gray-500">{invoice.from.street}</p>
              {invoice.from.qiAccount && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-[10px] font-bold text-teal-600 uppercase">
                    Qi Account Number
                  </p>
                  <p className="font-mono text-[#0F172A]">
                    {invoice.from.qiAccount}
                  </p>
                </div>
              )}
            </div>
            <div className="text-right space-y-1">
              <p className="text-gray-400 uppercase font-black text-[10px] tracking-widest mb-2">
                Bill To
              </p>
              <p className="font-bold text-[#0F172A]">{invoice.to.name}</p>
              <p className="text-gray-500">{invoice.to.email}</p>
              {invoice.to.qiAccount && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-[10px] font-bold text-teal-600 uppercase">
                    Qi Account Number
                  </p>
                  <p className="font-mono text-[#0F172A]">
                    {invoice.to.qiAccount}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mb-10 text-sm">
              <thead>
                <tr className="border-b-2 border-[#F1F5F9] text-left text-gray-400 text-[10px] uppercase font-black tracking-widest">
                  <th className="pb-4">Description</th>
                  <th className="pb-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoice.items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-4 font-medium text-[#334155]">
                      {item.name}
                    </td>
                    <td className="py-4 text-right font-bold text-[#0F172A]">
                      {formatCurrency(item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center pt-6 border-t-2 border-[#F1F5F9]">
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest">
                Total Amount
              </p>
              <p className="text-xs text-gray-400 uppercase">
                Due {invoice.due}
              </p>
            </div>
            <p className="text-3xl font-black text-[#0F766E]">
              {formatCurrency(totals.total)}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={handlePay}
          className="w-full mt-4 bg-[#0F766E] text-white p-4 rounded-xl font-bold hover:bg-[#115E59] transition shadow-lg"
        >
          Send the bill to {invoice.to.name}
        </button>
      </div>
    </div>
  );
}
