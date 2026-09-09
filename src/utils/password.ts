import { timingSafeEqual } from "@std/crypto/timing-safe-equal";

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const key = await crypto.subtle.importKey(
    "raw-secret",
    new TextEncoder().encode(password),
    "Argon2id",
    false,
    ["deriveBits"],
  );

  const hash = await crypto.subtle.deriveBits(
    {
      name: "Argon2id",
      memory: 65536,
      passes: 3,
      parallelism: 4,
      nonce: salt,
    },
    key,
    256,
  );

  return `${salt.toBase64()}:${new Uint8Array(hash).toBase64()}`;
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [saltBase64, hashBase64] = storedHash.split(":");

  if (!saltBase64 || !hashBase64) {
    return false;
  }

  try {
    const salt = Uint8Array.fromBase64(saltBase64);
    const expectedHash = Uint8Array.fromBase64(hashBase64);

    const key = await crypto.subtle.importKey(
      "raw-secret",
      new TextEncoder().encode(password),
      "Argon2id",
      false,
      ["deriveBits"],
    );

    const hash = await crypto.subtle.deriveBits(
      {
        name: "Argon2id",
        memory: 65536,
        passes: 3,
        parallelism: 4,
        nonce: salt,
      },
      key,
      256,
    );

    const actualHash = new Uint8Array(hash);

    if (actualHash.length !== expectedHash.length) {
      return false;
    }

    return timingSafeEqual(actualHash, expectedHash);
  } catch {
    return false;
  }
}