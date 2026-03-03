import React, { useEffect, useState, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Users,
  Store,
  DollarSign,
  LayoutDashboard,
  Loader2,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Menu,
  X,
  ShieldAlert,
} from "lucide-react";

import {
  getAllUsers,
  getAllOwners,
  getAllPayments,
  getAdminDashboardStats,
  deleteUser,
  deleteAllUsers,
  verifyCompany,
  getSingleUser,
  getSingleOwner,
} from "../services/admin";

// ========================================
// CONFIGURATION
// ========================================

const TABS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Owners", href: "/admin/owners", icon: Store },
  { name: "Payments", href: "/admin/payments", icon: DollarSign },
];

const Admin = () => {
  const location = useLocation();
  const currentTab = useMemo(() => {
    const pathParts = location.pathname.split("/");
    return pathParts[pathParts.length - 1] || "admin";
  }, [location.pathname]);

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);
  const [payments, setPayments] = useState(null);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modal states
  const [modalData, setModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (data) => {
    setModalData(data);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // ========================================
  // LOAD DATA BASED ON TAB
  // ========================================
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        if (currentTab === "admin" || currentTab === "dashboard") {
          const data = await getAdminDashboardStats();
          setDashboard(data);
        } else if (currentTab === "users") {
          const data = await getAllUsers();
          setUsers(data);
        } else if (currentTab === "owners") {
          const data = await getAllOwners();
          setOwners(data);
        } else if (currentTab === "payments") {
          const data = await getAllPayments();
          setPayments(data);
        }
      } catch (err) {
        console.error("Data loading error:", err);
        setError("Failed to fetch data. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentTab]);

  // ========================================
  // ACTION HANDLERS
  // ========================================
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  const handleDeleteAllUsers = async () => {
    if (!window.confirm("🔥 WARNING: Delete ALL users? This cannot be undone."))
      return;

    try {
      await deleteAllUsers();
      setUsers([]);
      alert("All users deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete all users");
    }
  };

  const handleVerifyCompany = async (id) => {
    try {
      await verifyCompany(id);
      setOwners(
        owners.map((o) =>
          o._id === id ? { ...o, companyVerified: true } : o
        )
      );
      alert("Company verified successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to verify company");
    }
  };

  const handleViewUser = async (id) => {
    try {
      const data = await getSingleUser(id);
      openModal(data);
    } catch (error) {
      alert("Failed to fetch user details.");
    }
  };

  const handleViewOwner = async (id) => {
    try {
      const data = await getSingleOwner(id);
      openModal(data);
    } catch (error) {
      alert("Failed to fetch owner details.");
    }
  };

  // ========================================
  // COMPONENTS: LOADING & ERROR
  // ========================================

  const LoadingState = () => (
    <div className="flex flex-col justify-center items-center h-[60vh] col-span-full gap-4">
      <Loader2 className="animate-spin text-orange-500 w-12 h-12" />
      <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Loading data...</p>
    </div>
  );

  const ErrorState = () => (
    <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-xl shadow-sm mx-auto max-w-2xl">
      <ShieldAlert className="w-6 h-6 shrink-0" />
      <div>
        <strong className="block font-bold">Error Loading Data</strong>
        <span className="text-sm mt-1 block">{error}</span>
      </div>
    </div>
  );

  // ========================================
  // COMPONENTS: SECTIONS
  // ========================================

  const DashboardSection = () => (
    <div className="grid lg:grid-cols-3 gap-6">
      {[
        {
          title: "Total Users",
          value: dashboard?.stats?.totalUsers || 0,
          icon: Users,
          color: "text-blue-600 dark:text-blue-400",
          bg: "bg-blue-100 dark:bg-blue-500/20",
        },
        {
          title: "Total Owners",
          value: dashboard?.stats?.totalOwners || 0,
          icon: Store,
          color: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-100 dark:bg-emerald-500/20",
        },
        {
          title: "Total Revenue",
          value: `Br ${dashboard?.stats?.totalRevenue || 0}`,
          icon: DollarSign,
          color: "text-orange-600 dark:text-orange-400",
          bg: "bg-orange-100 dark:bg-orange-500/20",
        },
      ].map((stat, index) => (
        <div
          key={index}
          className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center gap-5">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`${stat.color} w-8 h-8`} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                {stat.title}
              </p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const UsersSection = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
            <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          Registered Users
        </h2>
        <button
          onClick={handleDeleteAllUsers}
          className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 font-semibold px-4 py-2 text-sm rounded-lg transition-colors duration-200 border border-red-200 dark:border-red-800"
        >
          <Trash2 className="w-4 h-4" /> Delete All Users
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold tracking-wider">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {users.length > 0 ? (
              users.map((u) => (
                <tr
                  key={u._id}
                  className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{u.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20 capitalize">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {u.isAccountVerified ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" /> Verified
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-sm font-medium">
                        <XCircle className="w-4 h-4" /> Unverified
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-2 justify-end">
                    <button
                      onClick={() => handleViewUser(u._id)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50">
                  No registered users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const OwnersSection = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
            <Store className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          Bakery Owners
        </h2>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold tracking-wider">
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {owners.length > 0 ? (
              owners.map((o) => (
                <tr
                  key={o._id}
                  className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{o.companyName}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{o.user?.name || "N/A"}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{o.location || "N/A"}</td>
                  <td className="px-6 py-4">
                    {o.companyVerified ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                        <CheckCircle className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
                        <XCircle className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-2 justify-end">
                    <button
                      onClick={() => handleViewOwner(o._id)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    {!o.companyVerified && (
                      <button
                        onClick={() => handleVerifyCompany(o._id)}
                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:text-emerald-400 dark:hover:bg-emerald-500/10 rounded-lg transition-colors"
                        title="Verify Company"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50">
                  No bakery owners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const PaymentsSection = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
            <DollarSign className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          Payments Log
        </h2>
        {payments?.totalRevenue && (
          <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 px-4 py-2 rounded-xl">
            <span className="text-sm text-orange-600/80 dark:text-orange-400/80 font-medium mr-2">Total Revenue</span>
            <span className="text-lg font-extrabold text-orange-600 dark:text-orange-400">Br {payments.totalRevenue}</span>
          </div>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold tracking-wider">
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Paid At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {payments?.payments?.length > 0 ? (
              payments.payments.map((p) => (
                <tr
                  key={p._id}
                  className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    {p.customer?.name || "Anonymous"}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-200">
                    Br {p.amount}
                  </td>
                  <td className="px-6 py-4">
                    {p.payment?.isPaid ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                        Unpaid
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    {p.payment?.paidAt
                      ? new Date(p.payment.paidAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      : "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50">
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ========================================
  // COMPONENTS: MODAL VIEW DETAILS
  // ========================================
  const DetailsModal = () =>
    modalOpen && (
      <div className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-500" />
              Record Details
            </h2>
            <button
              onClick={closeModal}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto max-h-[60vh] custom-scrollbar">
            <pre className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words">
              {JSON.stringify(modalData, null, 2)}
            </pre>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={closeModal}
              className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold px-6 py-2.5 rounded-xl transition duration-200 shadow-sm"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    );

  // ========================================
  // COMPONENTS: SIDEBAR NAVIGATION
  // ========================================

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? "" : "bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-4 min-w-[260px]"}`}>
      {!mobile && (
        <div className="px-4 pb-6 pt-2 mb-2 border-b border-slate-100 dark:border-slate-700/50">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase">
            Admin <span className="text-orange-500">Panel</span>
          </h2>
        </div>
      )}
      
      <nav className={`space-y-1.5 font-medium ${mobile ? "mt-4" : ""}`}>
        {TABS.map((tab) => {
          const isActive =
            currentTab === tab.href.split("/")[2] ||
            (currentTab === "admin" && tab.href === "/admin");
          return (
            <Link
              key={tab.name}
              to={tab.href}
              onClick={() => mobile && setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-orange-500 text-white shadow-sm dark:bg-orange-500 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-700/50 dark:hover:text-slate-200"
              }`}
            >
              <tab.icon className={`w-5 h-5 ${isActive ? "opacity-100" : "opacity-70"}`} />
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  // ========================================
  // MAIN RENDER
  // ========================================

  const getPageTitle = () => {
    switch (currentTab) {
      case "users":
        return "User Management";
      case "owners":
        return "Owner Management";
      case "payments":
        return "Payment History";
      case "admin":
      default:
        return "Dashboard Overview";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-orange-500/30">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex justify-between items-center mb-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <h1 className="text-xl font-black text-slate-800 dark:text-white">
            {getPageTitle()}
          </h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity">
            <div className="absolute left-0 top-0 w-72 h-full bg-white dark:bg-slate-800 p-6 shadow-2xl border-r border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center pb-6 border-b border-slate-100 dark:border-slate-700/50">
                 <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase">
                  Admin <span className="text-orange-500">Panel</span>
                </h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar mobile={true} />
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="hidden lg:block">
             <Sidebar />
          </div>

          <main className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Desktop Page Title */}
            <div className="hidden lg:flex justify-between items-end mb-2">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {getPageTitle()}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Manage your platform's data, users, and transactions.
                </p>
              </div>
            </div>

            {/* Loading/Error State */}
            {loading && <LoadingState />}
            {!loading && error && <ErrorState />}

            {/* Content Sections */}
            {!loading && !error && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                {(currentTab === "admin" || currentTab === "dashboard") && (
                  <DashboardSection />
                )}
                {currentTab === "users" && <UsersSection />}
                {currentTab === "owners" && <OwnersSection />}
                {currentTab === "payments" && <PaymentsSection />}
              </div>
            )}
          </main>
        </div>

        {/* Details Modal */}
        <DetailsModal />
      </div>
    </div>
  );
};

export default Admin;