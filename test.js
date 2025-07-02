import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load();
const apikey = env["APIKEY"];

const encodeMultipart = async (formData) => {
  // boundaryを自分で決める
  const boundary = "----DenoBoundary" + crypto.randomUUID();
  const CRLF = "\r\n";
  const encoder = new TextEncoder();

  const parts = [];
  
  for (const [name, value] of formData.entries()) {
    let part = `--${boundary}${CRLF}`;
    if (value instanceof File) {
      part += `Content-Disposition: form-data; name="${name}"; filename="${value.name}"${CRLF}`;
      part += `Content-Type: ${value.type || "application/octet-stream"}${CRLF}${CRLF}`;
      parts.push(encoder.encode(part));
      parts.push(new Uint8Array(await value.arrayBuffer()));
      parts.push(encoder.encode(CRLF));
    } else {
      part += `Content-Disposition: form-data; name="${name}"${CRLF}${CRLF}`;
      part += `${value}${CRLF}`;
      parts.push(encoder.encode(part));
    }
  }

  // 終了バウンダリ
  parts.push(encoder.encode(`--${boundary}--${CRLF}`));

  const totalLength = parts.reduce((acc, part) => acc + part.length, 0);
  const body = new Uint8Array(totalLength);

  let offset = 0;
  for (const part of parts) {
    body.set(part, offset);
    offset += part.length;
  }
  // 連結
  return { body, boundary };
};

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
  console.log(body);
  console.log(new TextDecoder().decode(body));

  const res = await (await fetch(url, opt)).json();
  console.log(res);
  return res;
};

const res = await generateMusic();
console.log(res);
