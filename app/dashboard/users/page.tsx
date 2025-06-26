"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    phone: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { id, ...newUser }]);
    setNewUser({ name: "", email: "", phone: "" });
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
    if (editUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editUser.id ? editUser : u))
      );
      setIsEditing(false);
      setEditUser(null);

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
        setUsers((prev) => prev.filter((user) => user.id !== id));

        Swal.fire({
          title: "ລຶບແລ້ວ!",
          text: "ຂໍ້ມູນຖືກລຶບອອກແລ້ວ.",
          icon: "success",
          confirmButtonText: "ຕົກລົງ",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">ຈັດການຜູ້ໃຊ້</h1>

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
          <div className="overflow-x-auto bg-white shadow border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="text-left p-3 border">#</th>
                  <th className="text-left p-3 border">ຊື່</th>
                  <th className="text-left p-3 border">ອີເມວ</th>
                  <th className="text-left p-3 border">ເບີໂທ</th>
                  <th className="text-center p-3 border">ຈັດການ</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((user) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-3 border">{index + 1}</td>
                      <td className="p-3 border">{user.name}</td>
                      <td className="p-3 border">{user.email}</td>
                      <td className="p-3 border">{user.phone}</td>
                      <td className="p-3 border text-center sm:space-y-2 space-y-2">
                        <button
                          onClick={() => {
                            setEditUser(user);
                            setIsEditing(true);
                          }}
                          className="px-2 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded mr-2"
                        >
                          ແກ້ໄຂ
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                          ລຶບ
                        </button>
                      </td>
                    </tr>
                  ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center p-4 text-gray-500">
                      ບໍ່ມີຂໍ້ມູນຜູ້ໃຊ້
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {isAdding && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl relative">
              <h2 className="text-xl font-bold text-green-700 mb-4">
                ເພີ່ມຜູ້ໃຊ້ໃໝ່
              </h2>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium text-sm">ຊື່</label>
                  <input
                    type="text"
                    className="w-full border border-gray-400 px-4 py-2 rounded-md"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm">
                    ອີເມວ
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-400 px-4 py-2 rounded-md"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm">
                    ເບີໂທ
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-400 px-4 py-2 rounded-md"
                    value={newUser.phone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                  >
                    ຍົກເລີກ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    ບັນທຶກ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isEditing && editUser && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl relative">
              <h2 className="text-xl font-bold text-yellow-700 mb-4">
                ແກ້ໄຂຜູ້ໃຊ້
              </h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium text-sm">ຊື່</label>
                  <input
                    type="text"
                    className="w-full border border-gray-400 px-4 py-2 rounded-md"
                    value={editUser.name}
                    onChange={(e) =>
                      setEditUser({ ...editUser, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm">
                    ອີເມວ
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-400 px-4 py-2 rounded-md"
                    value={editUser.email}
                    onChange={(e) =>
                      setEditUser({ ...editUser, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm">
                    ເບີໂທ
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-400 px-4 py-2 rounded-md"
                    value={editUser.phone}
                    onChange={(e) =>
                      setEditUser({ ...editUser, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                  >
                    ຍົກເລີກ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
                  >
                    ບັນທຶກ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
