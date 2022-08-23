import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ListPage from '../../includes/ListPage'
import LandingPage from '../../screens/LandingPage'

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/list" element={<ListPage />} />
        </Routes>
    )

}

export default AppRouter