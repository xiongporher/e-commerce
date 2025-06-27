"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
  Facebook,
  Github,
} from "lucide-react";
import {
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGithub,
  FaGoogle,
} from "react-icons/fa";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email.trim()) {
      newErrors.email = "ກະລຸນາປ້ອນອີເມວ";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "ອີເມວບໍ່ຖືກຕ້ອງ";
    }

    if (!formData.password) {
      newErrors.password = "ກະລຸນາປ້ອນລະຫັດຜ່ານ";
    } else if (formData.password.length < 8) {
      newErrors.password = "ລະຫັດຕ້ອງຢ່າງໜ້ອຍ 8 ຕົວ";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "ຕ້ອງມີ A-Z, a-z ແລະ ຕົວເລກ";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((val) => val === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        await new Promise((res) => setTimeout(res, 1000));
        setSubmitSuccess(true);
        setFormData({ email: "", password: "" });

        setTimeout(() => {
        setSubmitSuccess(false);
        router.push("/dashboard");
        }, 2000);
      } catch (error) {
        console.error("Submit error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {submitSuccess && (
          <div className="mb-6 bg-green-500/20 border border-green-500/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-green-400">
              <CheckCircle size={24} />
              <span>ເຂົ້າລະບົບສຳເລັດ!</span>
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              ເຂົ້າສູ່ລະບົບ
            </h2>
          </div>
          <div className="flex justify-center gap-4 mb-3">
            <button
              type="button"
              className="p-3 border border-gray-400 text-white rounded-full hover:text-red-400 hover:border-red-400 transition-all duration-300"
            >
              <FaGoogle size={20} />
            </button>
            <button
              type="button"
              className="p-3 border border-gray-400 text-white rounded-full hover:text-blue-400 hover:border-blue-400 transition-all duration-300"
            >
              <FaFacebookF size={20} />
            </button>
            <button
              type="button"
              className="p-3 border border-gray-400 text-white rounded-full hover:text-gray-300 hover:border-gray-300 transition-all duration-300"
            >
              <FaGithub size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                ອີເມວ
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  className={`w-full pl-12 pr-4 py-3 bg-white/10 border-2 ${
                    errors.email ? "border-red-400" : "border-gray-600"
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300`}
                  placeholder="ປ້ອນອີເມວ"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                ລະຫັດຜ່ານ
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-12 pr-12 py-3 bg-white/10 border-2 ${
                    errors.password ? "border-red-400" : "border-gray-600"
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300`}
                  placeholder="ປ້ອນລະຫັດ"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:animate-pulse hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ກຳລັງສົ່ງ...
                </>
              ) : (
                "ເຂົ້າສູ່ລະບົບ"
              )}
            </button>
            <p className="text-center text-gray-400 text-sm mt-4">
              ບໍ່ມີບັນຊີ ?{" "}
              <a
                href="/auth/register"
                className="text-purple-400 hover:underline"
              >
                ເຂົ້າລົງທະບຽນ
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
