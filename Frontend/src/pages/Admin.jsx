import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, Lock, Eye, EyeOff } from "lucide-react";

const AdminPage = () => {
  const [selectedRole, setSelectedRole] = useState("User");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
  
    //add backend logic

    setMsg(`Role: ${selectedRole}, Password: ${password ? "Entered" : "Empty"}`);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-3xl shadow-xl bg-white/10 dark:bg-gray-300/30 backdrop-blur-2xl border border-white/20 transition-colors duration-500"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 tracking-wide text-gray-900">
          Admin 
        </h2>
          <AnimatePresence mode="wait">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Role Dropdown */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white px-10 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white px-10 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400 dark:placeholder-gray-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold shadow-xl mt-2"
          >
            Save
          </motion.button>
        </motion.form>
        </AnimatePresence>

        {msg && <p className="text-center mt-4 text-green-600">{msg}</p>}
      </motion.div>
    </div>
  );
};

export default AdminPage;
