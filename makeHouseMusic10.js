import { generateMusic } from "./generateMusic.js";

const fix2 = n => n < 10 ? "0" + n : n;

const genre = "House";
for (let i = 0; i < 10; i++) {
  const res = await generateMusic(genre);
  console.log(res, i);
  const mp3 = await (await fetch(res.music_file_path)).bytes();
  await Deno.writeFile("music/" + genre + "-" + fix2(i) + ".mp3", mp3);
}
