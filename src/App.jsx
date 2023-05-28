import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import NavBar from "./components/NavBar";
import { useState } from "react";

export default function App() {
  axios.defaults.headers.common['Authorization'] = 'QoMHCmAWaMAAwNkO6sokJWv1'

  const [status, setStatus] = useState([])

  return (
    <>
      <BrowserRouter>
      
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
          <Route path="/assentos/:idSessao" element={<SeatsPage status={status} setStatus={setStatus} />} />
          <Route path="/sucesso" element={<SuccessPage status={status} setStatus={setStatus} />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}


