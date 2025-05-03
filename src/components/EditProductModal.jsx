import React from "react";

const EditProductModal = ({
  editedProduct,
  setEditedProduct,
  onClose,
  onSave,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] sm:w-96 animate-fade-in">
        <h3 className="text-xl font-bold text-purple-700 mb-4">Edit Product</h3>

        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={editedProduct.name}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, name: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">Image URL</label>
          <input
            type="text"
            className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={editedProduct.imageUrl}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, imageUrl: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Price</label>
          <input
            type="text"
            className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={editedProduct.price}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, price: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
