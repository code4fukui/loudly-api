import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { encodeMultipart } from "./encodeMultipart.js";

const env = await load();
const apikey = env["APIKEY"];

const baseurl = "https://soundtracks.loudly.com/api/";

export const generateMusic = async (opt) => {
  const path = "ai/songs";
  const url = baseurl + path;
  const form = new FormData();
  const names = [
    "genre",
    "genre_blend",
    "duration",
    "energy",
    "bpm",
    "key_root",
    "key_quality",
    "insturuments",
    "structure_id",
  ];
  for (const name of names) {
    form.append(name, opt[name] || "");
  }
  const { body, boundary } = await encodeMultipart(form);
  const fetchopt = {
    method: "POST",
    headers: {
      "API-KEY": apikey,
      "Accept": "application/json",
      "Content-Type": "multipart/form-data; boundary=" + boundary,
    },
    body,
  };
  const res = await (await fetch(url, fetchopt)).json();
  return res;
};

export const getGenres = async () => {
  const path = "ai/genres";
  const url = baseurl + path;
  const fetchopt = {
    method: "GET",
    headers: {
      "API-KEY": apikey,
      "Accept": "application/json",
    },
  };
  const res = await (await fetch(url, fetchopt)).json();
  return res;
};
