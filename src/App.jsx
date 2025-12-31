import InvoicePage from "./components/InvoicePage.jsx";
import Hero from "./components/hero.jsx";
function App() {
  const handelCaptureScreen = () => {
  Page({
  data: {
    condition: false,
  },
  onReady() {
    my.onUserCaptureScreen(() => {
      my.alert({
        content: 'Received user screen capture',
      });
    });
  },
  offUserCaptureScreen() {
    my.offUserCaptureScreen();
    this.setData({
      condition: false,
    });
  },
  onUserCaptureScreen() {
    my.onUserCaptureScreen(() => {
      my.alert({
        content: 'Received user screen capture'
      });
    });
    this.setData({
      condition: true,
    });
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
