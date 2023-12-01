import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface Package {
  package: {
    name: string;
  };
}

interface AddFavoriteProps {
  onSubmit: (newFavorite: {
    id: string;
    packageName: string;
    favoriteReason: string;
  }) => void;
}

const AddFavorite: React.FC<AddFavoriteProps> = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [favoriteReason, setFavoriteReason] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`https://api.npms.io/v2/search?q=${searchQuery}`)
        .then((response) => {
          setPackages(response.data.results);
        });
    }
  }, [searchQuery]);

  const handleAddFavorite = () => {
    if (selectedPackage && favoriteReason) {
      const id = uuidv4();

      const newFavorite = {
        id,
        packageName: selectedPackage.package.name,
        favoriteReason,
      };

      const existingFavorites =
        JSON.parse(localStorage.getItem("favorites") || "[]");
      localStorage.setItem(
        "favorites",
        JSON.stringify([...existingFavorites, newFavorite])
      );

      onSubmit(newFavorite);
      navigate("/");
    } else {
      alert("Please select a package and enter a reason for your favorite.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 transition-all duration-500">
      <div className="max-w-xl w-full p-6 bg-white rounded-lg shadow-md transition-all duration-500">
        <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">
          Add Favorite NPM Package
        </h2>

        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            placeholder="Search NPM Package"
            className="border p-2 w-full text-center bg-gray-200 rounded-md focus:outline-none transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {packages.length > 0 && (
          <div className="mb-4 max-h-40 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4 ml-4 text-indigo-700">
              Results
            </h1>
            <div className="grid grid-cols-1 gap-2 ml-4">
              {packages.map((pkg) => (
                <div key={pkg.package.name} className="mb-2">
                  <input
                    type="radio"
                    id={pkg.package.name}
                    name="selectedPackage"
                    value={pkg.package.name}
                    checked={selectedPackage === pkg}
                    onChange={() => setSelectedPackage(pkg)}
                  />
                  <label
                    htmlFor={pkg.package.name}
                    className="ml-2 text-indigo-700"
                  >
                    {pkg.package.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center items-center mb-4">
          <textarea
            placeholder="Why is this your favorite?"
            className="border p-2 w-full h-20 text-center bg-gray-200 rounded-md focus:outline-none transition-all duration-300"
            value={favoriteReason}
            onChange={(e) => setFavoriteReason(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center">
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out"
            onClick={handleAddFavorite}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFavorite;
