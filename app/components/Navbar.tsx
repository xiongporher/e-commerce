// components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { label: "ໜ້າຫຼັກ", href: "/dashboard", icon: <LayoutDashboard /> },
    { label: "ຈັດການຜູ້ໃຊ້", href: "/dashboard/users", icon: <Users /> },
    { label: "ຈັດການສິນຄ້າ", href: "/dashboard/products", icon: <Package /> },
    { label: "ຕັ້ງຄ່າ", href: "/dashboard/settings", icon: <Settings /> },
    { label: "ອອກຈາກລະບົບ", href: "/", icon: <LogOut /> },
  ];

  return (
    <div className="w-20 sm:w-64 bg-gray-800 shadow-lg min-h-screen">
      <div className="p-6 font-bold text-xl text-white hidden sm:block">
        Dashboard
      </div>
      <ul className="space-y-2 px-2 pt-5 md:pt-0 sm:px-4">
        {menu.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <div
                className={`flex items-center justify-center sm:justify-start space-x-0 sm:space-x-2 px-4 py-3 rounded-lg font-medium hover:bg-blue-500 ${
                  pathname === item.href
                    ? "bg-blue-500 text-white"
                    : "text-white"
                }`}
              >
                <span className="w-5 h-5">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
