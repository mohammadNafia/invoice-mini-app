import { useEffect } from "react";
import InvoicePage from "./components/InvoicePage.jsx";
import Hero from "./components/hero.jsx";

function App() {

  useEffect(() => {

    my.onUserCaptureScreen(() => {
      my.alert({
        content: "Received user screen capture",
      });
    });

    return () => {
      my.offUserCaptureScreen();
    };
  }, []);

  return (
    <>
      <Hero />
      <InvoicePage />
    </>
  );
}

export default App;
