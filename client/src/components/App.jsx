import React from "react";
import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// components for site
import Header from "./Header";

// routes for client-side
import routes from "../routes";

function App() {

  

  const router = createBrowserRouter(routes)


  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
       
        <RouterProvider router={router}>

        </RouterProvider>
      </main>
    </div>
  )
}

export default App;
