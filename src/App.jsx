import { useEffect } from "react";
import InvoicePage from "./components/InvoicePage.jsx";
import Hero from "./components/hero.jsx";

function App() {

  useEffect(() => {
    if (window.AlipayJSBridge) {
      AlipayJSBridge.call(
        "allowSystemSnapshot",
        { allow: true },
        function (data) {
          console.log("Snapshot permission:", data);
        }
      );
    }
  }, []);

  return (
    <>
      <Hero />
      <InvoicePage />
    </>
  );
}

export default App;
