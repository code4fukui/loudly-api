import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { encodeMultipart } from "./encodeMultipart.js";

const env = await load();
const apikey = env["APIKEY"];

export const generateMusic = async () => {
  const url = "https://soundtracks.loudly.com/api/ai/songs";
  const form = new FormData();
  /*
  --form genre=House \
  --form genre_blend= \
  --form duration= \
  --form energy= \
  --form bpm= \
  --form key_root= \
  --form key_quality= \
  --form instruments= \
  --form structure_id= \
  */
  form.append("genre", "House");
  form.append("genre_blend", "");
  const { body, boundary } = await encodeMultipart(form);
  const opt = {
    method: "POST",
    headers: {
      "API-KEY": apikey,
      "Accept": "application/json",
      "Content-Type": "multipart/form-data; boundary=" + boundary,
    },
    body,
  };
  const res = await (await fetch(url, opt)).json();
  return res;
};
