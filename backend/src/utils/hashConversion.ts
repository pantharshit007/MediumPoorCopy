import { createHash } from "hono/utils/crypto";
import { encodeBase64Url } from "hono/utils/encode";

export function generateSalt(length: number = 16): string {
  const array = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    array[i] = Math.floor(Math.random() * 256);
  }
  const salt = encodeBase64Url(array.buffer);
  return salt;
}

export async function hashPassword(password: string): Promise<string> {
  const algorithm = { name: "SHA-256", alias: "sha256" };
  const hash = await createHash(password, algorithm);
  return hash ?? "";
}

// https://developers.cloudflare.com/workers/runtime-apis/web-crypto/
