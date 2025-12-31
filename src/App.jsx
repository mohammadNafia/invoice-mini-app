import { useEffect } from "react";
import InvoicePage from "./components/InvoicePage/InvoicePage.jsx";
import Hero from "./components/hero.jsx";
import InvoiceHistory from "./components/invoicehistory.jsx";
function App() {



  return (
    <>
      <Hero />
      <InvoicePage />
      <InvoiceHistory />
    </>
  );
}

export default App;
