import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const [wishlists, setWishlists] = useState([]);
  const [wishlistName, setWishlistName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    const res = await api.get("/wishlists");
    setWishlists(res.data);
  };

  const createWishlist = async () => {
    if (!wishlistName) return;
    const res = await api.post("/wishlists", {
      name: wishlistName,
      createdBy: user.email,
      users: [user.email],
    });
    setWishlists([...wishlists, res.data]);
    setWishlistName("");
  };

  const deleteWishlist = async (id) => {
    await api.delete(`/wishlists/${id}`);
    setWishlists(wishlists.filter((wl) => wl._id !== id));
  };

  const startEditing = (id, currentName) => {
    setEditingId(id);
    setNewName(currentName);
  };

  const saveEdit = async (id) => {
    if (!newName.trim()) return;
    const updated = wishlists.map((wl) =>
      wl._id === id ? { ...wl, name: newName } : wl
    );
    setWishlists(updated);
    setEditingId(null);
    await api.put(`/wishlists/${id}`, { name: newName });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-6">
        Welcome back, {user.username}! 🎉
      </h1>

      <div className="mb-8 flex gap-3 items-center">
        <input
          className="border border-purple-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Name your new wishlist..."
          value={wishlistName}
          onChange={(e) => setWishlistName(e.target.value)}
        />
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg transition duration-200"
          onClick={createWishlist}
        >
          ➕ Create
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlists.map((wl) => {
          const isEditing = editingId === wl._id;
          return (
            <div
              key={wl._id}
              className="bg-white border border-purple-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 relative cursor-pointer"
              onClick={(e) => {
                if (!isEditing) navigate(`/wishlist/${wl._id}`);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="w-full pr-8">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        className="border p-1 w-full rounded"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        className="text-green-600 font-bold text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          saveEdit(wl._id);
                        }}
                      >
                        ✅
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold text-purple-700">
                        {wl.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Created by {wl.createdBy}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-1 absolute top-2 right-2 text-xl">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(wl._id, wl.name);
                    }}
                    title="Edit"
                    className="hover:text-blue-600"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteWishlist(wl._id);
                    }}
                    title="Delete"
                    className="hover:text-red-600"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;