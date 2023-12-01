import React from "react";
import { FaTimes } from "react-icons/fa";

interface ViewModalProps {
  onClose: () => void;
  viewedFavorite: {
    packageName: string;
    favoriteReason: string;
  } | null;
}

const ViewModal: React.FC<ViewModalProps> = ({ onClose, viewedFavorite }) => {
  if (!viewedFavorite) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 transform scale-100 transition-transform ease-in-out duration-300">
        <p className="text-2xl font-bold mb-4">
          Viewing Package: {viewedFavorite.packageName}
        </p>
        <p className="text-lg font-bold mb-2">Description:</p>
        <p className="text-base mb-4 break-words">
          {viewedFavorite.favoriteReason || "No description available"}
        </p>

        <div className="flex justify-end">
          <button
            className="text-red-500 hover:underline transform hover:scale-110 transition-transform ease-in-out duration-200"
            onClick={onClose}
          >
            <FaTimes size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
