// src/app/actions.ts
"use server";

import { revalidateTag } from "next/cache";

export async function refreshDocumentsCache() {
  revalidateTag("documents-list", "max");
}
