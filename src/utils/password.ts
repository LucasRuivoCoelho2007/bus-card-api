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