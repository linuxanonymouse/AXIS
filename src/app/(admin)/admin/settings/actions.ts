"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveSettingsAction(formData: FormData) {
  const keys = [
    "operations_brief_url",
    "studio_brief_url",
    "intelligence_brief_url",
    "media_brief_url",
    "ventures_brief_url",
  ];

  for (const key of keys) {
    const val = formData.get(key);
    if (typeof val === "string") {
      await prisma.systemSetting.upsert({
        where: { key },
        update: { value: val },
        create: { key, value: val, description: `URL for ${key.replace(/_/g, " ")}` },
      });
    }
  }

  revalidatePath("/divisions/operations");
  revalidatePath("/divisions/studio");
  revalidatePath("/divisions/intelligence");
  revalidatePath("/divisions/media");
  revalidatePath("/divisions/ventures");
  revalidatePath("/admin/settings");
}
