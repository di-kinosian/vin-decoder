import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Decoder } from "./pages/Decoder";
import "./App.scss";
import { Variables } from "./pages/Variables";
import { ErrorPage } from "./pages/ErrorPage";
import { Layout } from "./components/Layout";
import { VariableDetails } from "./pages/VariableDetails";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Decoder />} />
            <Route exact path="/variables" element={<Variables />} />
            <Route exact path="/variables/:id" element={<VariableDetails />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
