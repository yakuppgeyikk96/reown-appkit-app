/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import ActionReturn from "@/types/common/ActionReturn";
import { Product } from "@/types/product";
import { revalidatePath } from "next/cache";

export async function createProduct(
  owner: string,
  name: string,
  metadataUri: string
) {
  try {
    const product = await prisma.product.create({
      data: {
        owner,
        name,
        metadataUri,
      },
    });

    revalidatePath("/dashboard/my-products");
    return { success: true, product };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error };
  }
}

export async function getMyProducts(data: {
  owner: string;
}): Promise<ActionReturn<Product[]>> {
  try {
    const products = await prisma.product.findMany({
      where: {
        owner: data.owner,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const productsWithMetadata: Product[] = await Promise.all(
      products.map(async (product) => {
        const metadata = await fetch(product.metadataUri).then((res) =>
          res.json()
        );
        return {
          ...product,
          metadata,
        };
      })
    );

    return { success: true, data: productsWithMetadata, error: null };
  } catch (error: any) {
    console.error("Failed to fetch products:", error);
    return { success: false, error, data: null };
  }
}

export async function getMyProductById(
  id: string
): Promise<ActionReturn<Product>> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const metadata = await fetch(product.metadataUri).then((res) => res.json());

    return { success: true, data: { ...product, metadata }, error: null };
  } catch (error: any) {
    console.error("Failed to fetch product:", error);
    return { success: false, error, data: null };
  }
}

export async function updateProductStatus(
  id: string,
  status: "minted" | "listed",
  mintAddress?: string,
  price?: number
) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        status,
        mintAddress,
        price,
      },
    });

    revalidatePath("/dashboard/my-products");
    return { success: true, product };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false, error };
  }
}

export async function updateProductMintAddress(
  id: string,
  mintAddress: string,
  price?: number
) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        mintAddress,
        status: "minted",
        price,
      },
    });

    revalidatePath("/dashboard/my-products");
    return { success: true, product };
  } catch (error) {
    console.error("Failed to update product mint address:", error);
    return { success: false, error };
  }
}

export async function updateProductBuyers(id: string, buyer: string) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        buyers: { push: buyer },
      },
    });

    revalidatePath("/marketplace");
    return { success: true, product };
  } catch (error) {
    console.error("Failed to update product buyers:", error);
    return { success: false, error };
  }
}

const getProductsWithMetadata = async (products: Product[]) => {
  return await Promise.all(
    products.map(async (product) => {
      const metadata = await fetch(product.metadataUri).then((res) =>
        res.json()
      );
      return { ...product, metadata };
    })
  );
};

export async function getListedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        mintAddress: {
          not: null,
        },
      },
    });

    console.log(products);

    /**
     * Fetch metadata for each product
     */
    const productsWithMetadata = await getProductsWithMetadata(
      products as Product[]
    );

    return productsWithMetadata;
  } catch (error) {
    console.error("Failed to fetch listed products:", error);
    return [];
  }
}

export async function getPurchasedProducts(address: string) {
  const products = await prisma.product.findMany({
    where: {
      buyers: { has: address },
    },
  });

  const productsWithMetadata = await getProductsWithMetadata(
    products as Product[]
  );

  return productsWithMetadata;
}
