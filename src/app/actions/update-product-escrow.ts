"use server";

import { prisma } from "@/lib/prisma";
import { ProductStatus } from "@/types/product";
import { revalidatePath } from "next/cache";

export async function updateProductEscrow(
  productId: string,
  escrowId: string,
  uniqueSeed: string
) {
  try {
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        escrowId,
        status: ProductStatus.LISTED,
        uniqueSeed,
      },
    });

    revalidatePath("/dashboard/my-products");
  } catch (error) {
    console.error("Failed to update product escrow:", error);
    throw new Error("Failed to update product escrow");
  }
}
