import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("User");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMsg("Passwords do not match!");
      return;
    }

    setLoading(true);

    const payload = isLogin
      ? { email: formData.email, password: formData.password, role: selectedRole } // ✅ Role only in Login
      : { fullName: formData.fullName, email: formData.email, password: formData.password };

    try {
      console.log("📩 Sending to backend:", payload);
      setMsg(isLogin ? "Logged in successfully ✅" : "Account created ✅");
    } catch (err) {
      console.log(err);
      setMsg("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-3xl shadow-xl bg-white/10 dark:bg-gray-300/30 backdrop-blur-2xl border border-white/20 transition-colors duration-500"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 tracking-wide text-gray-900">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? "loginForm" : "registerForm"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-800 dark:text-gray-900" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                className="w-full bg-gray-300 text-gray-900 px-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-600
                  
                  "
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-900 dark:text-gray-900" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
               className="w-full bg-gray-300 text-gray-900 px-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-600"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500 dark:text-gray-900" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-300 text-gray-900 px-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-600"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-900"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500 dark:text-gray-900" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full bg-gray-300 text-gray-900 px-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-600"
                  required
                />
              </div>
            )}

            {/* ✅ Role only shown in Login */}
            {isLogin && (
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                 className="w-full bg-gray-300 text-gray-900 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"

                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold shadow-xl mt-2"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        {msg && <p className="text-center mt-4 text-green-600">{msg}</p>}

        <p className="text-center mt-6 text-gray-900">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 transition font-semibold"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
