import axios from "axios";
import React, { useEffect } from "react";
import Chip from "@mui/material/Chip";
const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  // Handle Add function will remove genre from genres Array and add it to selectedGenres Array
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]); // Add Genre To SelectedGenres Array
    setGenres(genres.filter((g) => g.id !== genre.id)); // Removing from genres Array
    setPage(1);
  };
  // HandleRemove function will remove genre from selectedGenres Array and add it to genres arrray
  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };
  useEffect(() => {
    fetchGenres();
  }, []);
  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            style={{ margin: "2px" }}
            color="primary"
            label={genre.name}
            clickable
            key={genre.id}
            size="small"
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            style={{ backgroundColor: "white", margin: "2px" }}
            label={genre.name}
            clickable
            key={genre.id}
            size="small"
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
