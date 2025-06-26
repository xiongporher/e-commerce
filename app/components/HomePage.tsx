"use client";
import React, { useEffect, useState } from "react";
import {
  LogIn,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  UserPlus,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Menu1 from '/img/menu_1.png';
import Menu2 from '/img/menu_2.png';
import Menu3 from '/img/food_3.png';
import Menu4 from '/img/food_4.png';
import Menu5 from '/img/menu_8.png';
import Menu6 from '/img/food_13.png';
import Menu7 from '/img/food_14.png';
import Menu8 from '/img/food_32.png';
interface Product {
  id: number;
  name: string;
  category: string;
  sellPrice: number;
  buyPrice: number;
  qty: number;
  image?: string;
  description: string;
  slug: string;
  expired_at: string;
}

export default function MainPage() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [hasItemsInCart, setHasItemsInCart] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ທັງໝົດ");
  const [loading, setLoading] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<(Product & { qty: number })[]>([]);

  const menuItems = [
    { icon: <LogIn size={20} />, label: "ເຂົ້າສູ່ລະບົບ", link: "/auth/login" },
    { icon: <UserPlus size={20} />, label: "ລົງທະບຽນ", link: "/auth/register" },
  ];

  const productCategories = [
    "ທັງໝົດ",
    "ອາຫານຄາວ",
    "ອາຫານຫວານ",
    "ເຄື່ອງດື່ມ",
    "ໝາກໄມ້",
    "ເຄື່ອງໃຊ້",
  ];

  const menuFood = [
  "/img/menu_1.png",
  "/img/menu_2.png",
  "/img/food_3.png",
  "/img/food_4.png",
  "/img/menu_8.png",
  "/img/food_13.png",
  "/img/food_14.png",
  "/img/food_32.png",
];


  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, qty: 1 }];
      }
    });

    setHasItemsInCart(true);
  };

  const PriceDisplay = ({ price }: { price: number }) => {
    const [formattedPrice, setFormattedPrice] = useState("");

    useEffect(() => {
      const priceStr = price.toLocaleString("lo-LA", {
        style: "currency",
        currency: "LAK",
        currencyDisplay: "symbol",
        minimumFractionDigits: 0,
      });
      setFormattedPrice(priceStr);
    }, [price]);

    return <>{formattedPrice}</>;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://683178c86205ab0d6c3c6d8f.mockapi.io/api/v1/products"
      );
      const data: Product[] = await response.json();
      setProductList(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <header className="bg-white/90 backdrop-blur-sm fixed top-0 left-0 right-0 shadow-md z-10 border-b border-blue-100">
        <div className="px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <h1 className="flex flex-col text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
              ລະບົບ POS ລາວ
              <span
                className="w-[30%] h-[30%] 
                border-l-[80px] border-l-transparent 
                border-r-[80px] border-r-transparent 
                border-t-[3px] border-t-amber-500"
              ></span>
            </h1>
          </div>

          <ul className="hidden sm:flex flex-wrap justify-center md:justify-start space-x-2">
            {menuItems.map((item, i) => (
              <li key={i}>
                <Link href={item.link}>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:animate-pulse hover:bg-gradient-to-r hover:from-blue-300 hover:via-blue-500 hover:to-indigo-700 hover:opacity-300 transition-all duration-300 group border border-blue-200 hover:border-transparent cursor-pointer">
                    <div className="text-blue-600 group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-blue-600 group-hover:text-white text-sm font-semibold transition-colors">
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="sm:hidden flex items-center justify-center p-2 rounded-lg hover:bg-blue-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-6 w-6 text-blue-600" />
            ) : (
              <Menu className="h-6 w-6 text-blue-600" />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="sm:hidden bg-white border-t border-blue-100 shadow-md">
            <ul className="flex flex-col p-4 space-y-2">
              {menuItems.map((item, i) => (
                <li key={i}>
                  <Link href={item.link}>
                    <div
                      className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-blue-100 text-blue-600 font-semibold transition-colors"
                      onClick={() => setMenuOpen(false)} 
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="pt-25 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6 px-4 sm:pt-15 md:px-6 min-h-screen pb-6">
        <div className="md:col-span-1 lg:col-span-3 flex flex-col overflow-hidden pt-0 sm:pt-10">
          <div className="bg-white/80 backdrop-blur-sm flex items-center border border-blue-200 rounded-2xl py-3 px-4 mb-6 shadow-sm hover:shadow-md transition-shadow">
            <Search className="text-blue-400 h-5 w-5 mr-3" />
            <input
              type="text"
              placeholder="ຄົ້ນຫາສິນຄ້າ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none focus:outline-none flex-1 bg-transparent placeholder-blue-400"
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {productCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`py-2 px-4 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-600 hover:bg-blue-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48 text-blue-600 font-semibold text-lg">
              ກຳລັງໂຫລດຂໍ້ມູນ...
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-6">
                {productList
                  .filter(
                    (p) =>
                      (selectedCategory === "ທັງໝົດ" ||
                        p.category === selectedCategory) &&
                      p.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      whileHover={{ scale: 1.03 }}
                      className="group bg-white/90 backdrop-blur-sm border border-blue-100 shadow-sm rounded-2xl p-5 hover:shadow-xl cursor-pointer"
                    >
                      <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-4 flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-100 transition-all">
                        <img src={menuFood[idx % menuFood.length]} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                      </div>
                      <div className="flex justify-between">
                        <p className="text-lg text-blue-500">{product.name}</p>
                        <p className="text-xl font-bold text-blue-600 mb-3">
                          <PriceDisplay price={product.sellPrice} />
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">
                          ຄັງເຫຼືອ: {product.qty || 0}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center h-10 w-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          <Plus className="text-white h-5 w-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="min-h-full bg-white/90 backdrop-blur-sm p-4 md:p-10 rounded-2xl shadow-lg overflow-y-auto border border-blue-100 md:col-span-1 max-h-[70vh] md:max-h-[80vh]">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 whitespace-nowrap">
              ລາຍການສັ່ງຊື້
            </h2>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-6 h-6 text-sm text-white font-bold text-center rounded-full flex items-center justify-center">
              {cartItems.length}
            </div>
          </div>

          <div className="space-y-3 max-h-[50vh] overflow-y-auto">
            {hasItemsInCart &&
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-blue-100 shadow-sm rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800 flex-1 pr-2 truncate">
                      {item.name}
                    </h3>
                    <button
                      onClick={() =>
                        setCartItems((previousItems) =>
                          previousItems.filter((_, i) => i !== index)
                        )
                      }
                      className="hover:bg-red-50 rounded-lg p-1.5 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        disabled={item.qty === 1}
                        onClick={() =>
                          setCartItems((previousItems) =>
                            previousItems.map((cartItem, i) =>
                              i === index && cartItem.qty > 1
                                ? { ...cartItem, qty: cartItem.qty - 1 }
                                : cartItem
                            )
                          )
                        }
                        className="flex items-center justify-center h-8 w-8 hover:bg-blue-50 border border-blue-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="h-4 w-4 text-blue-600" />
                      </button>
                      <span className="font-semibold text-blue-600 min-w-[2rem] text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          setCartItems((previousItems) =>
                            previousItems.map((cartItem, i) =>
                              i === index
                                ? { ...cartItem, qty: cartItem.qty + 1 }
                                : cartItem
                            )
                          )
                        }
                        className="flex items-center justify-center h-8 w-8 hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4 text-blue-600" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {(typeof item.sellPrice === "number" &&
                        !isNaN(item.sellPrice)
                          ? item.sellPrice
                          : 0
                        ).toLocaleString("lo-LA", {
                          style: "currency",
                          currency: "LAK",
                        })}
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        {(typeof item.sellPrice === "number" &&
                        !isNaN(item.sellPrice)
                          ? item.sellPrice * item.qty
                          : 0
                        ).toLocaleString("lo-LA", {
                          style: "currency",
                          currency: "LAK",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            {!hasItemsInCart && (
              <p className="text-gray-500 font-semibold text-center pt-12">
                ບໍ່ມີສິນຄ້າໃນກະຕ່າ.
              </p>
            )}
          </div>

          {hasItemsInCart && (
            <button
              className={`w-full mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-white font-semibold shadow-lg hover:brightness-110 transition-all ${
                isCheckingOut ? "opacity-50 cursor-wait" : ""
              }`}
              onClick={() => setIsCheckingOut(true)}
              disabled={isCheckingOut}
            >
              ຢືນຢັນການຊື້
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
