import { formatCurrency } from "./invoiceUtils";

export default function InvoicePreview({ invoice, totals }) {
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
            {invoice.items.map((item, index) => (
              <tr key={`${item.name}-${index}`} className="bg-[#F8FAFC]">
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
