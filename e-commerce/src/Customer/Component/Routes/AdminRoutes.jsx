import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminMainPanel from '../../../Admin/Components/AdminMainPanel'

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<AdminMainPanel/>} />
      </Routes>
    </div>
  )
}

export default AdminRoutes
