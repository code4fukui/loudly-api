export const encodeMultipart = async (formData) => {
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

  parts.push(encoder.encode(`--${boundary}--${CRLF}`));

  const totalLength = parts.reduce((acc, part) => acc + part.length, 0);
  const body = new Uint8Array(totalLength);

  let offset = 0;
  for (const part of parts) {
    body.set(part, offset);
    offset += part.length;
  }
  return { body, boundary };
};
