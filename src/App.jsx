import Home from "./pages/Home";
import Login from "./pages/Login";
import Purchases from "./pages/Purchases";
import ProductDetail from "./pages/ProductDetail";
import AppNavBar from "./components/AppNavBar";
import Loader from "./components/Loader";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import ProtectedRoutes from "./components/ProtectedRoutes";
import "./App.css";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div className="App">
      <HashRouter>
        {isLoading && <Loader />}
        <AppNavBar />
        <Container fluid >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            <Route element={<ProtectedRoutes />}>
              <Route>
                <Route path="/purchases" element={<Purchases />} />
              </Route>
            </Route>
          </Routes>
        </Container>
      </HashRouter>
    </div>
  );
}

export default App;
