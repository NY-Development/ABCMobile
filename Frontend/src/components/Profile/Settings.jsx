import { Bell, Moon } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6 p-4 sm:p-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">App Settings</h2>

      <div className="space-y-4">
        {/* Email Notifications */}
        <div className="flex items-center justify-between border border-gray-200 bg-white p-5 rounded-xl shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                <Bell className="h-5 w-5" />
            </div>
            <div>
                <span className="font-medium text-gray-800">Email Notifications</span>
                <p className="text-sm text-gray-500">Receive updates and promotional offers.</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            {/* The visual switch element */}
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
          </label>
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between border border-gray-200 bg-white p-5 rounded-xl shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                <Moon className="h-5 w-5" />
            </div>
            <div>
                <span className="font-medium text-gray-800">Dark Mode</span>
                <p className="text-sm text-gray-500">Switch to a dark theme for eye comfort.</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;