import { BrowserRouter, Routes, Route } from "react-router-dom";
import  UserContext  from "./context/UserContext";
import Home from "./pages/HomePage";
import SignIn from "./pages/signIn.js";
import SignUp from "./pages/signUp.js";
import { useState } from "react";
import UserPage from "./pages/UserPage";



function App() {
  const storedUserData = localStorage.getItem('userData');
  const [userData, setUserData] = useState(storedUserData);

  const updateUserData = (newUserData) => {
    localStorage.setItem('userData', newUserData);
    setUserData(newUserData);
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/timeline" element={<Home />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

