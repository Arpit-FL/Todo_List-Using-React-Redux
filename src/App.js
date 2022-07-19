import Home from "./components/Home";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </>
  );
}

export default App;
