import { useState, useEffect } from "react";

export default function InvoiceHistory() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const loadInvoices = () => {
      const stored = JSON.parse(sessionStorage.getItem("invoices")) || [];
      stored.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setInvoices(stored);
    };

    loadInvoices();

    window.addEventListener("invoice-updated", loadInvoices);
    return () => window.removeEventListener("invoice-updated", loadInvoices);
  }, []);
  const downloadInvoicePDF = (url) => {
    if (!url) {
      my.alert({ content: "No PDF URL found for this invoice." });
      return;
    }

    my.downloadFile({
      url,
      success: ({ apFilePath }) => {
        my.openDocument({
          filePath: apFilePath,
          fileType: "pdf",
          success: () => {
            my.alert({ content: "Invoice opened" });
          },
          fail: () => {
            my.alert({ content: "Cannot open invoice file" });
          },
        });
      },
      fail: () => {
        my.alert({ content: "Download failed" });
      },
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
          Recent Invoices
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#E2E8F0] text-[#334155] font-semibold">
              <tr>
                <th className="px-6 py-4 rounded-tl-xl">Invoice</th>
                <th className="px-6 py-4">Download</th>
                <th className="px-6 py-4 text-right rounded-tr-xl">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.invoice}
                  className="hover:bg-[#F1F5F9] transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-[#0F172A]">
                    {invoice.invoice}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => downloadInvoicePDF(invoice.pdfUrl)}
                      className="text-[#0F766E] hover:underline"
                    >
                      Download
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-[#0F172A]">
                    ${Number(invoice.totalAmount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            {invoices.length > 0 && (
              <tfoot className="bg-[#F1F5F9] font-bold">
                <tr>
                  <td
                    colSpan={2}
                    className="px-6 py-4 rounded-bl-xl text-[#0F172A]"
                  >
                    Total
                  </td>
                  <td className="px-6 py-4 text-right rounded-br-xl text-[#0F766E] font-bold text-lg">
                    $
                    {invoices
                      .reduce(
                        (sum, inv) => sum + (Number(inv.totalAmount) || 0),
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        <p className="mt-4 text-sm text-[#334155] italic">
          A list of your recent invoices.
        </p>
      </div>
    </div>
  );
}
