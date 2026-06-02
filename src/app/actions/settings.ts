"use server";

import { getSetting } from "@/lib/settings";

export async function getBriefUrlAction(divisionKey: string) {
  return await getSetting(divisionKey, "#");
}
