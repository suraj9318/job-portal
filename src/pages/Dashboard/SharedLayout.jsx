import React from 'react'
import { Outlet } from "react-router-dom";
import Wrapper from '../../assets/wrappers/SharedLayout';
import { Navbar, SmallSidebar, BigSidebar } from "../../components";


const SharedLayout = () => {
  return (
    <Wrapper >
        <main className='dashboard'>
            <SmallSidebar/>
            <BigSidebar/>
            <div className="">
                <Navbar/>
                <div className="dashboard-page">
                    <Outlet/>
                </div>
            </div>
        </main>
    </Wrapper>
  )
}

export default SharedLayout
