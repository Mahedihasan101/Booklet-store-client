
import { Menu, Package, CreditCard, LogOut, Settings } from "lucide-react";
import { motion } from "framer-motion";

import { Link, Outlet } from "react-router";

export default function UserDashboard() {
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-white shadow-xl p-6 flex flex-col gap-6"
      >
        <div className="flex items-center gap-2 text-xl font-bold">
          <Menu /> Dashboard
        </div>

        <nav className="flex flex-col gap-4 text-gray-700 text-base">
          <button
            className="flex items-center gap-2 hover:text-black"
            
          >
            <Package size={18} /> Deliveries
          </button>
          <button
            className="flex items-center gap-2 hover:text-black"
            
          >
            <CreditCard size={18} /> Payments
          </button>
          <button
            className="flex items-center gap-2 hover:text-black"
            
          >
            <Settings size={18} /> Settings
          </button>
          <Link to='add-book'>
          <button
            className="flex items-center gap-2 hover:text-black"
         
          >
            📚 Add Book
          </button></Link>
        </nav>

        <div className="mt-auto">
          <button className="flex items-center gap-2 text-red-500 hover:text-red-700">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
      <Outlet></Outlet>
      </main>
    </div>
  );
}
