import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../components/auth/Login.jsx"
import Home from "../pages/Home.jsx"
import { RockForm } from "../components/forms/RockForm.jsx"
import { RockList } from "../pages/RockList.jsx"
import { Register } from '../components/auth/Register.jsx'


export const ApplicationViews = () => {
    const [rocksState, setRocksState] = useState([{
        id: 1,
        name: "Sample",
        type: {
            id: 1,
            label: "Volcanic"
        }
    }])

    const fetchRocksFromAPI = async () => {
        const response = await fetch("http://localhost:8000/rocks",
            {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
                }
            })
        const rocks = await response.json()
        setRocksState(rocks)
    }

    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
               
                <Route path="/allcharacters" element={<CharacterList rocks={rocksState} fetchRocks={fetchRocksFromAPI} />} />
                <Route path="/create" element={<CharacterForm fetchRocks={fetchRocksFromAPI} />} />
                <Route path="/mine" element={<RockList rocks={rocksState} fetchRocks={fetchRocksFromAPI} />} />
            </Route>
        </Routes>
    </BrowserRouter>
}