"use client";
import { useEffect, useState } from "react";
import {
  Mail,
  User,
  CheckCircle,
  AlertCircle,
  Lock,
  Phone,
} from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "ກະລຸນາປ້ອນຊື່ຂອງທ່ານ";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "ຊື່ຕ້ອງຢ່າງໜ້ອຍ 2 ຕົວ";
    }

    if (!formData.email.trim()) {
      newErrors.email = "ກະລຸນາປ້ອນອີເມວ";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "ອີເມວບໍ່ຖືກຕ້ອງ";
    } else if (users.some((u) => u.email === formData.email)) {
      newErrors.email = "ອີເມວນີ້ມີໃນລະບົບແລ້ວ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "ກະລຸນາປ້ອນເບີໂທ";
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = "ເບີໂທຕ້ອງຢ່າງໜ້ອຍ 8 ໂຕເລກ";
    } else if (!/^\d{8,15}$/.test(formData.phone)) {
      newErrors.phone = "ເບີໂທຕ້ອງແມ່ນຕົວເລກເທົ່ານັ້ນ";
    }

    if (!formData.password) {
      newErrors.password = "ກະລຸນາປ້ອນລະຫັດຜ່ານ";
    } else if (formData.password.length < 8) {
      newErrors.password = "ລະຫັດຜ່ານຕ້ອງຢ່າງໜ້ອຍ 8 ຕົວ";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "ຕ້ອງມີ A-Z, a-z ແລະ ຕົວເລກ";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "ກະລຸນາຢືນຢັນລະຫັດ";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "ລະຫັດບໍ່ຕົງກັນ";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((val) => val === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);

      try {
        await new Promise((res) => setTimeout(res, 2000));

        setSubmitSuccess(true);

        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => setSubmitSuccess(false), 2000);

        router.push("/auth/login");
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
      <div className="w-full max-w-lg">
        {submitSuccess && (
          <div className="mb-6 bg-green-500/20 border border-green-500/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-green-400">
              <CheckCircle size={24} />
              <span>ລົງທະບຽນສຳເລັດແລ້ວ!</span>
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">ລົງທະບຽນ</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              {
                id: "name",
                label: "ຊື່",
                icon: <User size={20} />,
                type: "text",
              },
              {
                id: "email",
                label: "ອີເມວ",
                icon: <Mail size={20} />,
                type: "email",
              },
              {
                id: "phone",
                label: "ເບີໂທ",
                icon: <Phone size={20} />,
                type: "tel",
              },
            ].map(({ id, label, icon, type }) => (
              <div key={id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {label}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {icon}
                  </span>
                  <input
                    type={type}
                    className={`w-full pl-12 pr-4 py-3 bg-white/10 border-2 ${
                      errors[id as keyof typeof errors]
                        ? "border-red-400"
                        : "border-gray-600"
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300`}
                    placeholder={`ປ້ອນ${label}`}
                    value={formData[id as keyof typeof formData]}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                  />
                </div>
                {errors[id as keyof typeof errors] && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors[id as keyof typeof errors]}
                  </p>
                )}
              </div>
            ))}

            {["password", "confirmPassword"].map((field) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {field === "password" ? "ລະຫັດຜ່ານ" : "ຢືນຢັນລະຫັດ"}
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type={
                      field === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    className={`w-full pl-12 pr-12 py-3 bg-white/10 border-2 ${
                      errors[field as keyof typeof errors]
                        ? "border-red-400"
                        : "border-gray-600"
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300`}
                    placeholder={
                      field === "password" ? "ປ້ອນລະຫັດ" : "ຢືນຢັນລະຫັດ"
                    }
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      field === "password"
                        ? setShowPassword(!showPassword)
                        : setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {(
                      field === "password" ? showPassword : showConfirmPassword
                    ) ? (
                      <FaEye />
                    ) : (
                      <FaEyeSlash />
                    )}
                  </button>
                </div>
                {errors[field as keyof typeof errors] && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors[field as keyof typeof errors]}
                  </p>
                )}
              </div>
            ))}

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
                "ລົງທະບຽນ"
              )}
            </button>
            <p className="text-sm text-gray-400 text-center mt-4">
              ມີບັນຊີແລ້ວບໍ?{" "}
              <a href="/auth/login" className="text-purple-400 hover:underline">
                ເຂົ້າສູ່ລະບົບ
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
