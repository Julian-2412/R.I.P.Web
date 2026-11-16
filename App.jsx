//import { useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
//Bibliotecas para poder usar rutas, y navegar entre páginas

import Login from './src/Rutas/login/Login.jsx'
import PaginaPrincipal from './src/Rutas/paginaprincipal/PaginaPrincipal.jsx'

function RutaProtegida({ children }) {
  return localStorage.getItem('token')
    ? children
    : <Navigate to="/" replace />;
}

//Hay que importar todas los componenetes (que yo llamo págunas)
//que se van a usar en las rutas, para poder usarlos 

function App() {

  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/pagina-principal"
          element={
            <RutaProtegida>
              <PaginaPrincipal />
            </RutaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  </>
  )
}
export default App