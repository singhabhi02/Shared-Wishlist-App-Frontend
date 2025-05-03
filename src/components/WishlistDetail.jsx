import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import EditProductModal from "./EditProductModal";

const WishlistDetail = ({ user }) => {
  const { id } = useParams();
  const [wishlist, setWishlist] = useState(null);
  const [product, setProduct] = useState({ name: "", imageUrl: "", price: "" });

  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const fetchWishlist = () => {
    api.get("/wishlists").then((res) => {
      const wl = res.data.find((w) => w._id === id);
      setWishlist(wl);
    });
  };

  useEffect(() => {
    fetchWishlist();
  }, [id]);

  const addProduct = async () => {
    if (!product.name || !product.imageUrl || !product.price) return;
    await api.post(`/wishlists/${id}/products`, {
      ...product,
      addedBy: user.email,
    });
    fetchWishlist();
    setProduct({ name: "", imageUrl: "", price: "" });
  };

  const deleteProduct = async (pid) => {
    await api.delete(`/wishlists/${id}/products/${pid}`);
    fetchWishlist();
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditedProduct({ ...product });
  };

  const saveEditedProduct = async () => {
    await api.put(
      `/wishlists/${id}/products/${editingProduct._id}`,
      editedProduct
    );
    fetchWishlist();
    setEditingProduct(null);
  };

  if (!wishlist)
    return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
      <h2 className="text-4xl font-extrabold text-purple-700 mb-6">
        {wishlist.name}
      </h2>

      <div className="mb-8 flex flex-wrap gap-4 items-center">
        <input
          className="border border-purple-300 rounded-lg p-3 w-full sm:w-52 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <input
          className="border border-purple-300 rounded-lg p-3 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Image URL"
          value={product.imageUrl}
          onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
        />
        <input
          className="border border-purple-300 rounded-lg p-3 w-full sm:w-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg transition duration-200"
          onClick={addProduct}
        >
          ➕ Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.products.map((p) => (
          <div
            key={p._id}
            className="bg-white border border-purple-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-bold text-purple-800 mb-1">{p.name}</h3>
            <p className="text-gray-700 font-medium mb-1">${p.price}</p>
            <p className="text-sm text-gray-800 mb-1">Added by {p.addedBy}</p>
            <p className="text-xs text-gray-600">
            {new Date(p.createdAt).toLocaleString()}
            </p>
            <div className="flex justify-between items-center mt-2">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => deleteProduct(p._id)}
              >
                🗑️ Delete
              </button>
              <button
                className="text-blue-600 hover:text-blue-800 text-xl"
                title="Edit"
                onClick={() => openEditModal(p)}
              >
                ✏️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <EditProductModal
          editedProduct={editedProduct}
          setEditedProduct={setEditedProduct}
          onClose={() => setEditingProduct(null)}
          onSave={saveEditedProduct}
        />
      )}
    </div>
  );
};

export default WishlistDetail;
