import { BrowserRouter, Routes, Route } from "react-router-dom";
import  UserContext  from "./context/UserContext";
import Home from "./pages/HomePage";
import SignIn from "./pages/signIn.js";
import SignUp from "./pages/signUp.js";
import { useState } from "react";
import UserPage from "./pages/UserPage";
import HashtagPage from "./pages/HashtagPage";



function App() {
  let storedUserData;
  try {
    storedUserData = JSON.parse(localStorage.getItem('userData'));
  } catch (err) {
    console.error(err);
    localStorage.removeItem('userData');
  }

  const [userData, setUserData] = useState(storedUserData);
  const [updatePosts, setUpdatePosts] = useState(false);

  const updateUserData = (newUserData) => {
    localStorage.setItem('userData', JSON.stringify(newUserData));
    setUserData(newUserData);
  };

  console.log('userData', userData)

  return (
    <UserContext.Provider value={{ userData, updateUserData, updatePosts, setUpdatePosts }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/timeline" element={<Home />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;


