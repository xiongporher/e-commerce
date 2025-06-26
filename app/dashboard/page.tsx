"use client";
import { motion } from "framer-motion";
import LineChart from "../components/Chart/LineChart";
import PieChart from "../components/Chart/PieChart";
export default function DashboardHome() {
  return (
    <div className="flex min-h-screen bg-gray-50 rounded-md">
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">ໜ້າຈັດການ</h1>
        <p className="text-gray-600">ຍິນດີຕ້ອນຮັບສູ່ໜ້າ Dashboard</p>

        <motion.h1
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl p-10 shadow hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-gray-800 pb-3">
                ຜູ້ໃຊ້
              </h2>
              <p className="text-sm text-gray-500">ຈັດການຂໍ້ມູນຜູ້ໃຊ້</p>
            </div>

            <div className="bg-white rounded-xl p-10 shadow hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-gray-800 pb-3">
                ສິນຄ້າ
              </h2>
              <p className="text-sm text-gray-500">ຈັດການສິນຄ້າ ແລະ ສະຕ໊ອກ</p>
            </div>

            <div className="bg-white rounded-xl p-10 shadow hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-gray-800 pb-3">ຂາຍ</h2>
              <p className="text-sm text-gray-500">ປະຫວັດການຂາຍ ແລະ ລາຍງານ</p>
            </div>
          </div>
        </motion.h1>
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <LineChart />
          <PieChart />
        </div>
      </main>
    </div>
  );
}
