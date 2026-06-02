import { SignJWT, jwtVerify } from "jose";

// Using process.env.JWT_SECRET or fallback for dev
const getSecretKey = () => {
  const secret = process.env.JWT_SECRET || "super-secret-axis-key-for-development-only";
  return new TextEncoder().encode(secret);
};

export async function signToken(payload: { email: string; id: string }) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecretKey());
  return token;
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as { email: string; id: string };
  } catch (error) {
    return null;
  }
}
