import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import SetAvatar from "./Component/SetAvatar";
import Chat from "./pages/Chat";


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SetAvatar" element={<SetAvatar />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
