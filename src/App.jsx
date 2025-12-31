import InvoicePage from "./components/InvoicePage.jsx";
import Hero from "./components/hero.jsx";
function App() {
  const handleScan = () => {
    my.scan({
      type: 'qr',
      success: (res) => {
        my.alert({ title: res.code });
      },
    });
  }
  return (
    <>
      <Hero />
      <InvoicePage />
    </>
  );
}

export default App;
