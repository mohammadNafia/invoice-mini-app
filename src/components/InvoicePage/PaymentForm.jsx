import { paymentMethods, formatCurrency } from "./invoiceUtils";

export default function PaymentForm({
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
  ) || paymentMethods[0];

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
