import { getGenres } from "./loudly.js";

const genres = await getGenres();
console.log(genres);

await Deno.writeTextFile("genres.json", JSON.stringify(genres, null, 2));
