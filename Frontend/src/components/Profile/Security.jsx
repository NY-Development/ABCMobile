import { Lock, Key, Monitor } from "lucide-react";

const Security = () => {
  return (
    <div className="space-y-8 p-4 sm:p-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Security</h2>

      {/* Change Password Card */}
      <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4 mb-4">
            <Key className="h-6 w-6 text-orange-600" />
            <div>
                <h3 className="font-semibold text-lg text-gray-800">Change Password</h3>
                <p className="text-sm text-gray-500">Update your password regularly to keep your account secure.</p>
            </div>
        </div>
        <button className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
          Update Password
        </button>
      </div>

      {/* Active Sessions Card */}
      <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4 mb-4">
            <Monitor className="h-6 w-6 text-orange-600" />
            <div>
                <h3 className="font-semibold text-lg text-gray-800">Active Sessions</h3>
                <p className="text-sm text-gray-500">
                  Review the devices currently logged into your account.
                </p>
            </div>
        </div>
        <div className="bg-orange-50/70 text-orange-700 border border-orange-200 p-3 rounded-lg flex justify-between items-center">
            <p className="text-sm font-medium">
                Current Device (Browser/Location)
            </p>
            <span className="text-xs px-2 py-1 bg-orange-600 text-white rounded-full">Active Now</span>
        </div>
        {/* You could list other sessions here with a "Log Out" button */}
      </div>
    </div>
  );
};

export default Security;