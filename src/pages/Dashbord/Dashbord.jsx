import { Menu, LogOut, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Link, Outlet } from "react-router";
import useRole from "../../hooks/useRole";

export default function Dashboard() {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

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

          {/* -------- CUSTOMER MENU -------- */}
          {role === "customer" && (
            <>
              <Link to="my-orders">
                <button className="flex items-center gap-2 hover:text-black">
                  <Settings size={18} /> My Orders
                </button>
              </Link>

              <Link to="my-profile">
                <button className="flex items-center gap-2 hover:text-black">
                  <Settings size={18} /> My Profile
                </button>
              </Link>

              <Link to="invoice">
                <button className="flex items-center gap-2 hover:text-black">
                  <Settings size={18} /> Invoice
                </button>
              </Link>
            </>
          )}

          {/* -------- LIBRARIAN MENU -------- */}
          {role === "librarian" && (
            <>
              <Link to="add-book">
                <button className="flex items-center gap-2 hover:text-black">
                  📚 Add Book
                </button>
              </Link>

              <Link to="manages-order">
                <button className="flex items-center gap-2 hover:text-black">
                  <Settings size={18} /> My Books
                </button>
              </Link>

              <Link to="manages-order">
                <button className="flex items-center gap-2 hover:text-black">
                  <Settings size={18} /> Manage Orders
                </button>
              </Link>
            </>
          )}
          {role === "admin" && (<>
            <Link to="all-users">
              <button className="flex items-center gap-2 hover:text-black">
                👤 All Users
              </button>
            </Link>
             {/* <Link to="manage-books">
              <button className="flex items-center gap-2 hover:text-black">
                📚 Manage Books
              </button>
            </Link> */}
            <Link to="my-profile">
                <button className="flex items-center gap-2 hover:text-black">
                  <Settings size={18} /> My Profile
                </button>
              </Link>
            </>
          )}
        </nav>

        <div className="mt-auto">
          <button className="flex items-center gap-2 text-red-500 hover:text-red-700">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
