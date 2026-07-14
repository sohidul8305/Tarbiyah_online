import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Navbar/Footer/Footer';


const RootLayouts = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow max-w-[95%] xl:max-w-[1400px] mx-auto px-4 w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayouts;