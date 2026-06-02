import { prisma } from "./prisma";

export async function getSetting(key: string, fallback: string = ""): Promise<string> {
  const setting = await prisma.systemSetting.findUnique({
    where: { key },
  });
  return setting?.value || fallback;
}
