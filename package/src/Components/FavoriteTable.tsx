import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import Welcome from "./Home";
import EditModal from "./EditModal";
import ViewModal from "./ViewModal";

interface Favorite {
  id: string;
  packageName: string;
  favoriteReason: string;
}

interface FavoritesTableProps {
  favorites: Favorite[];
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>;
}

const FavoritesTable: React.FC<FavoritesTableProps> = ({ favorites, setFavorites }) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedFavorite, setSelectedFavorite] = useState<Favorite | null>(null);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [viewedFavorite, setViewedFavorite] = useState<Favorite | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editedFavorite, setEditedFavorite] = useState<Favorite | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]") as Favorite[];
    setFavorites(storedFavorites);
  }, [setFavorites]);

  const handleDeleteClick = (favorite: Favorite) => {
    setSelectedFavorite(favorite);
    setShowDeleteModal(true);
  };

  const handleViewClick = (favorite: Favorite) => {
    setViewedFavorite(favorite);
    setShowViewModal(true);
  };

  const handleEditClick = (favorite: Favorite) => {
    setEditedFavorite(favorite);
    setShowEditModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== selectedFavorite.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      setFavorites(updatedFavorites);
      setShowDeleteModal(false);
    }
  };

  const handleViewModalClose = () => {
    setShowViewModal(false);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleSaveEdit = (editedPackage: string, editedDescription: string) => {
    if (editedFavorite) {
      const updatedFavorites = favorites.map((fav) =>
        fav.id === editedFavorite.id
          ? {
              ...fav,
              favoriteReason: editedDescription,
              packageName: editedPackage,
            }
          : fav
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      setFavorites(updatedFavorites);
      setShowEditModal(false);
    }
  };

  const handleAddNewPackage = () => {
    navigate("/add");
  };

  return (
    <div className="mt-8 p-4 bg-gradient-to-r from-purple-400 to-blue-500 rounded-md">
      {favorites.length > 0 ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Favorites</h2>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={handleAddNewPackage}
            >
              Add New Package
            </button>
          </div>
          <table className="table-auto w-full bg-white rounded-md overflow-hidden">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border px-4 py-2">Package Name</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((favorite) => (
                <tr key={favorite.id}>
                  <td className="border px-4 py-2">{favorite.packageName}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="text-blue-500 hover:underline transition duration-300 ease-in-out transform hover:scale-110"
                      onClick={() => handleViewClick(favorite)}
                    >
                      <FaEye size={24} />
                    </button>
                    <button
                      className="text-green-500 hover:underline transition duration-300 ease-in-out transform hover:scale-110"
                      onClick={() => handleEditClick(favorite)}
                    >
                      <FaEdit size={24} />
                    </button>
                    <button
                      className="text-red-500 hover:underline transition duration-300 ease-in-out transform hover:scale-110"
                      onClick={() => handleDeleteClick(favorite)}
                    >
                      <FaTrash size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Welcome onClickAdd={handleAddNewPackage} />
      )}

{showDeleteModal && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70">
    <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <p className="text-xl font-bold mb-4 text-red-500">
        Are you sure you want to delete?
      </p>
      <div className="flex justify-end">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out mr-2"
          onClick={handleConfirmDelete}
        >
          Confirm
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      {showViewModal && (
        <ViewModal
          onClose={handleViewModalClose}
          viewedFavorite={viewedFavorite as Favorite}
        />
      )}

      {showEditModal && (
        <EditModal
          onClose={handleEditModalClose}
          editedFavorite={editedFavorite as Favorite}
          onSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default FavoritesTable;
