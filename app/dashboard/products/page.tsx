"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    sellPrice: 0,
    buyPrice: 0,
    qty: 0,
    image: "",
    description: "",
    slug: "",
    expired_at: "",
  });

  useEffect(() => {
    fetch("https://683178c86205ab0d6c3c6d8f.mockapi.io/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    setProducts([...products, { id, ...newProduct }]);
    setIsAdding(false);
    Swal.fire({
      title: "ສຳເລັດ!",
      text: "ເພີ່ມຜູ້ໃຊ້ໃໝ່ສຳເລັດ",
      icon: "success",
      confirmButtonText: "ຕົກລົງ",
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? editProduct : p))
      );
      setEditProduct(null);
      setIsEditing(false);
      Swal.fire({
        title: "ສຳເລັດ!",
        text: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ",
        icon: "success",
        confirmButtonText: "ຕົກລົງ",
      });
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "ທ່ານຈະລຶບຂໍ້ມູນນີ້ບໍ?",
      text: "ຂໍ້ມູນຈະຖືກລຶບຖາວອນ!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts((prev) => prev.filter((product) => product.id !== id));

        Swal.fire({
          title: "ລຶບແລ້ວ!",
          text: "ຂໍ້ມູນຖືກລຶບອອກແລ້ວ.",
          icon: "success",
          confirmButtonText: "ຕົກລົງ",
        });
      }
    });
  };

  const ProductForm = ({
    isEdit = false,
    product,
    onSubmit,
    onClose,
    setProduct,
  }: {
    isEdit?: boolean;
    product: Omit<Product, "id"> | Product;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    setProduct: React.Dispatch<React.SetStateAction<any>>;
  }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-xl shadow-xl">
        <h2
          className={`text-xl font-bold mb-4 ${
            isEdit ? "text-yellow-700" : "text-green-700"
          }`}
        >
          {isEdit ? "ແກ້ໄຂສິນຄ້າ" : "ເພີ່ມສິນຄ້າໃໝ່"}
        </h2>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ຊື່ສິນຄ້າ"
            className="border px-3 py-2 rounded col-span-2"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="ໝວດ"
            className="border px-3 py-2 rounded"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Slug"
            className="border px-3 py-2 rounded"
            value={product.slug}
            onChange={(e) => setProduct({ ...product, slug: e.target.value })}
          />
          <input
            type="number"
            placeholder="ລາຄາຊື້"
            className="border px-3 py-2 rounded"
            value={product.buyPrice}
            onChange={(e) =>
              setProduct({ ...product, buyPrice: +e.target.value })
            }
          />
          <input
            type="number"
            placeholder="ລາຄາຂາຍ"
            className="border px-3 py-2 rounded"
            value={product.sellPrice}
            onChange={(e) =>
              setProduct({ ...product, sellPrice: +e.target.value })
            }
          />
          <input
            type="number"
            placeholder="ຈຳນວນ"
            className="border px-3 py-2 rounded"
            value={product.qty}
            onChange={(e) => setProduct({ ...product, qty: +e.target.value })}
          />
          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={product.expired_at}
            onChange={(e) =>
              setProduct({ ...product, expired_at: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            className="border px-3 py-2 rounded col-span-2"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
          <textarea
            placeholder="ລາຍລະອຽດ"
            className="border px-3 py-2 rounded col-span-2"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
          <div className="flex justify-end gap-2 col-span-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              ຍົກເລີກ
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${
                isEdit
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              ບັນທຶກ
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">ຈັດການສິນຄ້າ</h1>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + ເພີ່ມຜູ້ໃຊ້ໃໝ່
          </button>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="ຄົ້ນຫາ..."
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">ກຳລັງໂຫຼດ...</p>
        ) : (
          <table className="min-w-full text-sm bg-white shadow">
            <thead className="bg-blue-50">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">ຊື່ສິນຄ້າ</th>
                <th className="p-3 border">ໝວດ</th>
                <th className="p-3 border">ລາຄາຊື້</th>
                <th className="p-3 border">ລາຄາຂາຍ</th>
                <th className="p-3 border">ຈຳນວນ</th>
                <th className="p-3 border">ໝົດອາຍຸ</th>
                <th className="p-3 border text-center">ຈັດການ</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((products) =>
                  products.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((p, i) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{i + 1}</td>
                    <td className="p-3 border">{p.name}</td>
                    <td className="p-3 border">{p.category}</td>
                    <td className="p-3 border">{p.buyPrice} ₭</td>
                    <td className="p-3 border">{p.sellPrice} ₭</td>
                    <td className="p-3 border">{p.qty}</td>
                    <td className="p-3 border">{p.expired_at}</td>
                    <td className="p-3 border text-center sm:space-y-2 space-y-2">
                      <button
                        onClick={() => {
                          setEditProduct(p);
                          setIsEditing(true);
                        }}
                        className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded mr-2"
                      >
                        ແກ້ໄຂ
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                      >
                        ລຶບ
                      </button>
                    </td>
                  </tr>
                ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-4 text-gray-500">
                    ບໍ່ມີຂໍ້ມູນສິນຄ້າ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {isAdding && (
          <ProductForm
            product={newProduct}
            setProduct={setNewProduct}
            onSubmit={handleAddSubmit}
            onClose={() => setIsAdding(false)}
          />
        )}

        {isEditing && editProduct && (
          <ProductForm
            isEdit
            product={editProduct}
            setProduct={setEditProduct}
            onSubmit={handleEditSubmit}
            onClose={() => setIsEditing(false)}
          />
        )}
      </main>
    </div>
  );
}
