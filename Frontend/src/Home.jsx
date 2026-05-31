import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { apiFetch } from './utils/api';

const Home = () => {

  const navigate = useNavigate();

  //logout function
const handleLogout = async () => {

  await fetch("http://localhost:3000/signout", {
    method: "POST",
    credentials: "include",
  });

  sessionStorage.clear();

  navigate("/", { replace: true });
};
  // ✅ MOVE OUTSIDE
  const fetchDataDSA = async () => {
    try {
      const response = await fetch("http://localhost:3000/problemset", {
        method: "GET",
        credentials: "include"
      });

      // auth
      if (response.status === 401) {

      sessionStorage.clear();

      alert("Please login to proceed.");

      navigate("/", { replace: true });

      return false;
      }


      const result = await response.json();
      sessionStorage.setItem("dsaQuestions", JSON.stringify(result));
      return true;

    } catch (error) {
      console.error("Error fetching DSA questions:", error);
      return false;
    }
  };

  // ✅ CALL HERE
  // useEffect(() => {
  //   fetchDataDSA();
  // }, []);

  // modules
  const getModules = async () => {
  try {

    const response = await fetch("http://localhost:3000/aptimodules", {
      method: "GET",
      credentials: "include"
    });

    if (response.status === 401) {

      sessionStorage.clear();

      alert("Please login to proceed.");

      navigate("/", { replace: true });

      return false;
    }

    const data = await response.json();

    sessionStorage.setItem("modules", JSON.stringify(data));

    return true;

  } catch (error) {

    console.error("Error fetching modules:", error);

    return false;
  }
};

  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <>
      {token && <h2>Welcome, {user.name}</h2>}
      <h1>Welcome to PrepPlus</h1>

      {!token && <button onClick={() => navigate("/login")}>Login</button>}
      {!token && <button onClick={() => navigate("/signup")}>SignUp</button>}

      <button
  onClick={async () => {
    const success = await getModules();
    if (success) {
      navigate("/aptimodules");
    }
  }}>
        Aptitude
      </button>

      <button onClick={async () => {
        const success = await fetchDataDSA();   // ✅ now works
        if(success){
        navigate("/problem-set");}
      }}>
        Technical
      </button>
      {token && <button onClick={ async () =>{
       await handleLogout()}}>Logout</button>}

       
        {token && <button onClick={() => navigate("/profile")}>Profile</button>}

    </>
  );
};

export default Home;
