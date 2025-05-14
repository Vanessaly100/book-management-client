// const GenreCheckBox = ({ genres = [], selectedGenres = [], onChange }) => {
//   const toggleGenre = (genreId) => {
//     if (selectedGenres.includes(genreId)) {
//       onChange(selectedGenres.filter((id) => id !== genreId));
//     } else {
//       onChange([...selectedGenres, genreId]);
//     }
//   };

//   if (!genres.length) {
//     return <div className="text-sm text-gray-500">No genres available.</div>;
//   }

//   return (
//     <div className="flex flex-wrap gap-2">
//       {genres.map((genre) => (
//         <label key={genre.genre_id} className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             value={genre.genre_id}
//             checked={selectedGenres.includes(genre.genre_id)}
//             onChange={() => toggleGenre(genre.genre_id)}
//           />
//           {genre.name}
//         </label>
//       ))}
//     </div>
//   );
// };

// export default GenreCheckBox;



import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import { useState } from "react";

const GenreCheckBox = ({ genres = [], selectedGenres = [], onChange }) => {
  const toggleGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      onChange(selectedGenres.filter((id) => id !== genreId));
    } else {
      onChange([...selectedGenres, genreId]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full p-2 border-none rounded-lg bg-gray-300">
          {selectedGenres.length > 0
            ? `${selectedGenres.length} selected`
            : "Select genres"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 max-h-64 overflow-y-auto bg-white shadow-lg rounded-lg p-2">
        {genres.length ? (
          genres.map((genre) => (
            <div
              key={genre.genre_id}
              className="flex items-center gap-2 py-1 transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
              onClick={() => toggleGenre(genre.genre_id)}
            >
              <Checkbox checked={selectedGenres.includes(genre.genre_id)} />
              <span className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold">{genre.name}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No genres available.</p>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default GenreCheckBox;
