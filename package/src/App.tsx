import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddFavorite from "./Components/AddFavorite";
import FavoritesTable from "./Components/FavoriteTable";

interface Favorite {
  id: string;
  packageName: string;
  favoriteReason: string;
}

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const handleAddFavorite = (favorite: Favorite) => {
    setFavorites([...favorites, favorite]);
  };

  return (
    <Routes>
      <Route
        path="/add"
        element={<AddFavorite onSubmit={handleAddFavorite} />}
      />

      <Route
        path="/"
        element={
      
          <FavoritesTable
            favorites={favorites}
            setFavorites={setFavorites}
          /> as React.ReactElement<{ favorites: Favorite[], setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>> }>
        }
      />
    </Routes>
  );
};

export default App;
