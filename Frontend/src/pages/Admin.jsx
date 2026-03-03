import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  deleteAllUsers,
  deleteUser,
  getAdminDashboardStats,
  getAllOwners,
  getAllPayments,
  getAllUsers,
  getSingleOwner,
  getSingleUser,
  verifyCompany,
} from "../services/admin";

const TAB_ITEMS = [
  { key: "dashboard", label: "Dashboard", href: "/admin" },
  { key: "users", label: "Users", href: "/admin/users" },
  { key: "owners", label: "Owners", href: "/admin/owners" },
  { key: "payments", label: "Payments", href: "/admin/payments" },
];

const Admin = () => {
  const location = useLocation();
  const currentTab = useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.endsWith("/users")) return "users";
    if (path.endsWith("/owners")) return "owners";
    if (path.endsWith("/payments")) return "payments";
    return "dashboard";
  }, [location.pathname]);

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);
  const [payments, setPayments] = useState([]);

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailType, setDetailType] = useState("generic");
  const [detailData, setDetailData] = useState(null);

  const openDetails = (type, data) => {
    setDetailType(type);
    setDetailData(data);
    setDetailOpen(true);
  };

  const closeDetails = () => {
    setDetailOpen(false);
    setDetailType("generic");
    setDetailData(null);
  };

  const loadCurrentTab = async () => {
    setLoading(true);
    setError("");
    try {
      if (currentTab === "dashboard") {
        const data = await getAdminDashboardStats();
        setDashboard(data?.stats || null);
        return;
      }

      if (currentTab === "users") {
        const data = await getAllUsers();
        setUsers(Array.isArray(data) ? data : []);
        return;
      }

      if (currentTab === "owners") {
        const data = await getAllOwners();
        setOwners(Array.isArray(data) ? data : []);
        return;
      }

      const data = await getAllPayments();
      setPayments(Array.isArray(data?.payments) ? data.payments : []);
    } catch (err) {
      console.error("Admin load error:", err);
      setError("Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentTab();
  }, [currentTab]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user and related data?")) return;
    try {
      setActionLoading(true);
      await deleteUser(userId);
      setUsers((prev) => prev.filter((item) => item._id !== userId));
      alert("User deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAllUsers = async () => {
    if (!window.confirm("Delete ALL users and related data?")) return;
    try {
      setActionLoading(true);
      await deleteAllUsers();
      setUsers([]);
      alert("All users deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete all users.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleVerifyOwner = async (ownerId) => {
    try {
      setActionLoading(true);
      await verifyCompany(ownerId);
      setOwners((prev) =>
        prev.map((item) =>
          item._id === ownerId ? { ...item, companyVerified: true } : item
        )
      );

      if (detailOpen && detailType === "owner" && detailData?._id === ownerId) {
        setDetailData((prev) => ({ ...prev, companyVerified: true }));
      }

      alert("Owner verified successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to verify owner.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewUser = async (userId) => {
    try {
      setActionLoading(true);
      const data = await getSingleUser(userId);
      openDetails("user", data);
    } catch (err) {
      console.error(err);
      alert("Failed to load user details.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewOwner = async (ownerId) => {
    try {
      setActionLoading(true);
      const data = await getSingleOwner(ownerId);
      openDetails("owner", data);
    } catch (err) {
      console.error(err);
      alert("Failed to load owner details.");
    } finally {
      setActionLoading(false);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-3">
      <div>Total users: <strong>{dashboard?.totalUsers ?? 0}</strong></div>
      <div>Total owners: <strong>{dashboard?.totalOwners ?? 0}</strong></div>
      <div>Total products: <strong>{dashboard?.totalProducts ?? 0}</strong></div>
      <div>Total orders: <strong>{dashboard?.totalOrders ?? 0}</strong></div>
      <div>Total reviews: <strong>{dashboard?.totalReviews ?? 0}</strong></div>
      <div>Total revenue: <strong>Br {dashboard?.totalRevenue ?? 0}</strong></div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-4">
      <button
        onClick={handleDeleteAllUsers}
        disabled={actionLoading}
        className="rounded border border-red-400 px-3 py-2 text-sm text-red-600 disabled:opacity-50"
      >
        Delete All Users
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Verified</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.email}</td>
                <td className="p-2">{item.role}</td>
                <td className="p-2">{item.isAccountVerified ? "Yes" : "No"}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleViewUser(item._id)}
                    disabled={actionLoading}
                    className="rounded border px-2 py-1"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteUser(item._id)}
                    disabled={actionLoading}
                    className="rounded border border-red-400 px-2 py-1 text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!users.length && (
              <tr>
                <td className="p-3" colSpan={5}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOwners = () => (
    <div className="space-y-4">
      <div className="text-sm text-slate-600">
        Review owner submissions and verify company information.
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Company</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">Verified</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-2">{item.companyName || "N/A"}</td>
                <td className="p-2">{item.location || "N/A"}</td>
                <td className="p-2">{item.address || "N/A"}</td>
                <td className="p-2">{item.companyVerified ? "Yes" : "No"}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleViewOwner(item._id)}
                    disabled={actionLoading}
                    className="rounded border px-2 py-1"
                  >
                    Review
                  </button>
                  {!item.companyVerified && (
                    <button
                      onClick={() => handleVerifyOwner(item._id)}
                      disabled={actionLoading}
                      className="rounded border border-green-500 px-2 py-1 text-green-700"
                    >
                      Verify
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {!owners.length && (
              <tr>
                <td className="p-3" colSpan={5}>No owners found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Customer</th>
            <th className="p-2 text-left">Owner</th>
            <th className="p-2 text-left">Product</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((item, index) => (
            <tr key={item.orderId || index} className="border-b">
              <td className="p-2">{item.customerName || "N/A"}</td>
              <td className="p-2">{item.ownerName || "N/A"}</td>
              <td className="p-2">{item.productName || "N/A"}</td>
              <td className="p-2">Br {item.totalPrice ?? 0}</td>
              <td className="p-2">{item.paidAt ? "Paid" : "Unpaid"}</td>
              <td className="p-2">{item.paidAt ? new Date(item.paidAt).toLocaleString() : "—"}</td>
            </tr>
          ))}
          {!payments.length && (
            <tr>
              <td className="p-3" colSpan={6}>No payments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderOwnerDetail = () => {
    const owner = detailData;
    if (!owner) return null;

    return (
      <div className="space-y-3 text-sm">
        <div><strong>Owner ID:</strong> {owner._id || "N/A"}</div>
        <div><strong>User Ref:</strong> {owner.user || "N/A"}</div>
        <div><strong>Company:</strong> {owner.companyName || "N/A"}</div>
        <div><strong>Branches:</strong> {owner.branches ?? "N/A"}</div>
        <div><strong>Location:</strong> {owner.location || "N/A"}</div>
        <div><strong>Address:</strong> {owner.address || "N/A"}</div>
        <div><strong>Account Number:</strong> {owner.accountNumber || "N/A"}</div>
        <div><strong>Map Link:</strong> {owner.mapLocation ? <a href={owner.mapLocation} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open map</a> : "N/A"}</div>
        <div><strong>Verified:</strong> {owner.companyVerified ? "Yes" : "No"}</div>

        <div className="pt-2">
          <strong>Company Image:</strong>
          {owner.companyImage ? (
            <div className="mt-2">
              <img src={owner.companyImage} alt="company" className="max-h-48 rounded border" />
            </div>
          ) : (
            <div>N/A</div>
          )}
        </div>

        <div className="pt-2">
          <strong>Trading License:</strong>
          {owner.tradingLicense ? (
            <div className="mt-2">
              <a href={owner.tradingLicense} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                Open document
              </a>
            </div>
          ) : (
            <div>N/A</div>
          )}
        </div>

        {!owner.companyVerified && (
          <button
            onClick={() => handleVerifyOwner(owner._id)}
            disabled={actionLoading}
            className="mt-3 rounded border border-green-500 px-3 py-2 text-green-700"
          >
            Verify this owner
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Admin</h1>

      <div className="mb-4 flex flex-wrap gap-2">
        {TAB_ITEMS.map((tab) => (
          <Link
            key={tab.key}
            to={tab.href}
            className={`rounded border px-3 py-2 text-sm ${currentTab === tab.key ? "border-black bg-black text-white" : "border-slate-300"}`}
          >
            {tab.label}
          </Link>
        ))}
        <button
          onClick={loadCurrentTab}
          disabled={loading}
          className="rounded border px-3 py-2 text-sm"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error ? (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="rounded border p-4">
        {loading ? <div className="text-sm">Loading...</div> : null}
        {!loading && currentTab === "dashboard" && renderDashboard()}
        {!loading && currentTab === "users" && renderUsers()}
        {!loading && currentTab === "owners" && renderOwners()}
        {!loading && currentTab === "payments" && renderPayments()}
      </div>

      {detailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[85vh] w-full max-w-3xl overflow-auto rounded border bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Details</h2>
              <button onClick={closeDetails} className="rounded border px-2 py-1 text-sm">Close</button>
            </div>

            {detailType === "owner" ? (
              renderOwnerDetail()
            ) : (
              <pre className="whitespace-pre-wrap rounded border bg-slate-50 p-3 text-xs">
                {JSON.stringify(detailData, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;