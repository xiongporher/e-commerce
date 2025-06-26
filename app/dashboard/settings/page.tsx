"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Settings } from "lucide-react";

const SettingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("la");

  useEffect(() => {
    const storedDark = localStorage.getItem("darkMode");
    const storedLang = localStorage.getItem("language");

    if (storedDark === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
    if (storedLang) {
      setSelectedLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("language", selectedLanguage);
  }, [selectedLanguage]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const handleSaveSettings = () => {
    Swal.fire({
      title: "ສຳເລັດ!",
      text: "ບັນທຶກການຕັ້ງຄ່າແລ້ວ",
      icon: "success",
      confirmButtonText: "ຕົກລົງ",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">
      <div className="container mx-auto p-6 max-w-5xl">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md space-y-6">
          <div className="flex gap-2">
            <Settings className="w-10 h-10" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              ຕັ້ງຄ່າ
            </h1>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
              ພາສາ
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="la">🇱🇦 ລາວ</option>
              <option value="en">🇺🇸 English</option>
              <option value="th">🇹🇭 ไทย</option>
              <option value="vi">🇻🇳 Tiếng Việt</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
              ຮູບໂປຣຟາຍ
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-dashed rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-700 dark:text-white font-medium">
              Dark Mode
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-600 transition-all"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow peer-checked:translate-x-full transition-transform"></div>
            </label>
          </div>

          <div>
            <button
              onClick={handleSaveSettings}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
            >
              ບັນທຶກການຕັ້ງຄ່າ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
