import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { ThemeProvider } from './components/ui/theme-provider'
import Home from './Pages/Home/Home'
import Navbar from './Pages/Navbar/Navbar'
import { Route, Routes }   
from 'react-router-dom';  
import ProjectDetails from './Pages/ProjectDetails/ProjectDetails'
import IssueDetails from './Pages/IssueDetails/IssueDetails'
import Subscription from './Pages/Subscription/Subscription'
import Auth from './Pages/Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './Redux/Authentication/Action'
import { store } from './Redux/Store/Store'
import { fetchProjects } from './Redux/Project/Action'
import UpgradeSuccess from './Pages/Subscription/upgradeSuccess'
import AcceptInvitation from './Pages/Project/AcceptInvitation'

function App() {
  const dispatch = useDispatch();
  const {auth} = useSelector(store=>store)

  useEffect(()=>{
      dispatch(getUser());
      dispatch(fetchProjects({}))
  },[auth.jwt])
  console.log(auth);
  
  return (
   
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     
     { auth.user? <div> 
      <Navbar/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/project/:id' element={<ProjectDetails />} />
        <Route path='/project/:projectId/issue/:issueId' element={<IssueDetails />} />
        <Route path="/upgrade_plan" element={<Subscription />} />
        <Route path="/upgrade_plan/success" element={<UpgradeSuccess />} />
        <Route path="/accept_invitation" element={<AcceptInvitation />} />


    </Routes>
   </div> : <Auth/>} 
    
    
  </ThemeProvider>
  )
}

export default App
