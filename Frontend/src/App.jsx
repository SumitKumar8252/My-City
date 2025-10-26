import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AdminPanel from "./Components/AdminPanel";

const App = () => {
  return (
    <>
     
      <Routes>
        <Route path="/signup" element={<Auth />} />
        <Route path="/" element={<Home/>} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
      
    </>
   
  );
};

export default App;