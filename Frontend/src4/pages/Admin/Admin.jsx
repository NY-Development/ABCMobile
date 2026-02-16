import React, { useEffect, useState, useMemo } from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link for navigation
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
  Menu, // New icon for mobile menu
  X, // New icon for closing mobile menu
} from "lucide-react";

// Assuming these service imports are correct
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
} from "./services/admin";

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
    // returns 'admin', 'users', 'owners', or 'payments'
    return pathParts[pathParts.length - 1] || "admin";
  }, [location.pathname]);

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);
  const [payments, setPayments] = useState(null); // Use null initially for object/array
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar

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
    <div className="flex justify-center items-center h-[70vh] col-span-full">
      <Loader2 className="animate-spin text-orange-500 w-12 h-12" />
    </div>
  );

  const ErrorState = () => (
    <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative col-span-full mx-6">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline ml-2">{error}</span>
    </div>
  );

  // ========================================
  // COMPONENTS: SECTIONS
  // ========================================

  // DASHBOARD -----------------
  const DashboardSection = () => (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Stat Card Component */}
      {[
        {
          title: "Total Users",
          value: dashboard?.stats?.totalUsers || 0,
          icon: Users,
          color: "text-blue-500",
        },
        {
          title: "Total Owners",
          value: dashboard?.stats?.totalOwners || 0,
          icon: Store,
          color: "text-green-500",
        },
        {
          title: "Revenue",
          value: `Br ${dashboard?.stats?.totalRevenue || 0}`,
          icon: DollarSign,
          color: "text-orange-500",
        },
      ].map((stat, index) => (
        <div
          key={index}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition duration-300 hover:shadow-xl"
        >
          <div className="flex items-center gap-4">
            <stat.icon className={`${stat.color} w-10 h-10`} />
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </h3>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // USERS -----------------
  const UsersSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-3">
          <Users className="w-6 h-6 text-orange-500" /> Registered Users
        </h2>
        <button
          onClick={handleDeleteAllUsers}
          className="mt-3 sm:mt-0 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 text-sm rounded-lg transition duration-150 shadow-md"
        >
          <Trash2 className="inline w-4 h-4 mr-1" /> Delete All Users
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
              <th className="p-4 rounded-tl-lg">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Verified</th>
              <th className="p-4 rounded-tr-lg">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u, index) => (
                <tr
                  key={u._id}
                  className={`border-b dark:border-gray-700 transition duration-150 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-750"
                  } hover:bg-orange-50 dark:hover:bg-gray-700`}
                >
                  <td className="p-4 font-medium">{u.name}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {u.email}
                  </td>
                  <td className="p-4 capitalize">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    {u.isAccountVerified ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                  <td className="p-4 flex gap-3 items-center">
                    <Eye
                      className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-150"
                      onClick={() => handleViewUser(u._id)}
                      title="View Details"
                    />
                    <Trash2
                      className="text-red-500 cursor-pointer hover:text-red-700 transition duration-150"
                      onClick={() => handleDeleteUser(u._id)}
                      title="Delete User"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No registered users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // OWNERS -----------------
  const OwnersSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200 flex items-center gap-3">
        <Store className="w-6 h-6 text-orange-500" /> Bakery Owners
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
              <th className="p-4 rounded-tl-lg">Company</th>
              <th className="p-4">Owner</th>
              <th className="p-4">Location</th>
              <th className="p-4">Verified</th>
              <th className="p-4 rounded-tr-lg">Actions</th>
            </tr>
          </thead>

          <tbody>
            {owners.length > 0 ? (
              owners.map((o, index) => (
                <tr
                  key={o._id}
                  className={`border-b dark:border-gray-700 transition duration-150 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-750"
                  } hover:bg-orange-50 dark:hover:bg-gray-700`}
                >
                  <td className="p-4 font-medium">{o.companyName}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {o.user?.name || "N/A"}
                  </td>
                  <td className="p-4">{o.location || "N/A"}</td>
                  <td className="p-4">
                    {o.companyVerified ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                  <td className="p-4 flex gap-3 items-center">
                    <Eye
                      className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-150"
                      onClick={() => handleViewOwner(o._id)}
                      title="View Details"
                    />

                    {!o.companyVerified && (
                      <CheckCircle
                        className="text-green-500 cursor-pointer hover:text-green-700 transition duration-150"
                        onClick={() => handleVerifyCompany(o._id)}
                        title="Verify Company"
                      />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No bakery owners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // PAYMENTS -----------------
  const PaymentsSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-orange-500" /> Payments Log
        </h2>
        {payments?.totalRevenue && (
          <p className="mt-2 sm:mt-0 text-lg font-bold text-orange-500">
            Total Revenue: Br {payments.totalRevenue}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
              <th className="p-4 rounded-tl-lg">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 rounded-tr-lg">Paid At</th>
            </tr>
          </thead>

          <tbody>
            {payments?.payments?.length > 0 ? (
              payments.payments.map((p, index) => (
                <tr
                  key={p._id}
                  className={`border-b dark:border-gray-700 transition duration-150 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-750"
                  } hover:bg-orange-50 dark:hover:bg-gray-700`}
                >
                  <td className="p-4 font-medium">
                    {p.customer?.name || "Anonymous"}
                  </td>
                  <td className="p-4 font-semibold">Br {p.amount}</td>
                  <td className="p-4">
                    {p.payment?.isPaid ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        Paid
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 font-semibold">
                        Unpaid
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {p.payment?.paidAt
                      ? new Date(p.payment.paidAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
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
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-lg shadow-2xl transform transition-all duration-300 scale-100">
          <div className="flex justify-between items-center mb-4 border-b pb-3 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              Record Details
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-[70vh] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
            {JSON.stringify(modalData, null, 2)}
          </pre>

          <button
            onClick={closeModal}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg w-full transition duration-150 shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    );

  // ========================================
  // COMPONENTS: SIDEBAR NAVIGATION
  // ========================================

  const Sidebar = ({ mobile = false }) => (
    <nav
      className={`p-4 space-y-2 font-medium ${
        mobile
          ? "w-full"
          : "hidden lg:block lg:min-w-[250px] bg-white dark:bg-gray-800 rounded-xl shadow-lg h-min"
      }`}
    >
      <h2 className="text-xl font-bold text-orange-500 mb-4 px-2">
        Admin Panel
      </h2>
      {TABS.map((tab) => {
        const isActive =
          currentTab === tab.href.split("/")[2] ||
          (currentTab === "admin" && tab.href === "/admin");
        return (
          <Link
            key={tab.name}
            to={tab.href}
            onClick={() => mobile && setIsSidebarOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-lg transition duration-150 ${
              isActive
                ? "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300"
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.name}
          </Link>
        );
      })}
    </nav>
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
        return "Admin Dashboard Overview";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Mobile Header and Menu Button */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {getPageTitle()}
          </h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden">
            <div className="absolute left-0 top-0 w-64 h-full bg-white dark:bg-gray-800 p-4 shadow-xl">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 text-gray-600 dark:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <Sidebar mobile={true} />
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="flex gap-8">
          <Sidebar />

          <main className="flex-1 space-y-8">
            {/* Desktop Page Title */}
            <h1 className="hidden lg:block text-4xl font-extrabold text-gray-800 dark:text-white border-b border-orange-500/50 pb-2">
              {getPageTitle()}
            </h1>

            {/* Loading/Error State */}
            {loading && <LoadingState />}
            {!loading && error && <ErrorState />}

            {/* Content Sections */}
            {!loading && !error && (
              <>
                {(currentTab === "admin" || currentTab === "dashboard") && (
                  <DashboardSection />
                )}
                {currentTab === "users" && <UsersSection />}
                {currentTab === "owners" && <OwnersSection />}
                {currentTab === "payments" && <PaymentsSection />}
              </>
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