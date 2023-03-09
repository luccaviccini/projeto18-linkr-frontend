import { BrowserRouter, Routes, Route } from "react-router-dom";
import  UserContext  from "./context/UserContext";
import Home from "./pages/HomePage";
import { useState } from "react";



function App() {
  const [User, setUser] = useState({});
  return (
    <UserContext.Provider value={{User, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

    
  );
}

export default App;
