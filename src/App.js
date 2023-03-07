import { BrowserRouter, Routes, Route } from "react-router-dom";
import  UserContext  from "./context/UserContext";
import Home from "./pages/HomePage";



function App() {
  return (
    <UserContext.Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

    
  );
}

export default App;
