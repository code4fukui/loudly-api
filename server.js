//import { makeService, retOK, retErr, retBinary, retJSON } from "https://code4fukui.github.io/music-api-js/serverutil.js";
import { makeService, retOK, retErr, retBinary, retJSON } from "./serverutil.js";
import { serveDir } from "jsr:@std/http/file-server";
import { generateMusic, getGenres } from "./loudly.js";

const handle = async (req, conn) => {
  //console.log(req.path);
  if (req.path.startsWith("/api/")) {
    const path = req.path.substring(5);
    if (path == "fetchGenres") {
      //const res = await getGenres();
      const res = JSON.parse(await Deno.readTextFile("./genres.json"));
      return retJSON(res);
    } else if (path == "fetchGenerateMusic") {
      const opt = await req.json();
      console.log("gen ", opt)
      const res = await generateMusic(opt);
      return retJSON(res);
      //return retBinary(res, "audio/mpeg");
    }
    return retErr();
  } else {
    return serveDir(req, { fsRoot: "static", urlRoot: "" });
  }
};

export default { fetch: makeService(handle) };
