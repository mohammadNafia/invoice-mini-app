const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default function InvoiceHistory() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Recent Invoices</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#E2E8F0] text-[#334155] font-semibold">
              <tr>
                <th className="px-6 py-4 rounded-tl-xl">Invoice</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4 text-right rounded-tr-xl">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {invoices.map((invoice) => (
                <tr key={invoice.invoice} className="hover:bg-[#F1F5F9] transition-colors">
                  <td className="px-6 py-4 font-medium text-[#0F172A]">{invoice.invoice}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      invoice.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 
                      invoice.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {invoice.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#334155]">{invoice.paymentMethod}</td>
                  <td className="px-6 py-4 text-right font-semibold text-[#0F172A]">{invoice.totalAmount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#F1F5F9] font-bold">
              <tr>
                <td colSpan={3} className="px-6 py-4 rounded-bl-xl text-[#0F172A]">Total</td>
                <td className="px-6 py-4 text-right rounded-br-xl text-[#0F766E] font-bold text-lg">$2,500.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-4 text-sm text-[#334155] italic">A list of your recent invoices.</p>
      </div>
    </div>
  )
}
