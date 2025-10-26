import { Routes, Route } from "react-router-dom";

// import Auth from "./pages/Auth";
import Navbar from "./Components/Navbar";
import AdminPage from "./pages/Admin";





const App = () => {
  return (
    <>
      <Navbar />
     
      <Routes>
        <Route path="/" element={<AdminPage />} />
        
      </Routes>
    </>
  );
};

export default App;
