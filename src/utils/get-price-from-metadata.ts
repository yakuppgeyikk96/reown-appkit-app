import { ProductMetadata } from "@/types/product";

export const getPriceFromMetadata = (metadata: ProductMetadata) => {
  const productPriceValue =
    metadata.attributes.find((attr) => attr.trait_type === "Price")?.value ||
    "";

  const productPriceStr = productPriceValue.split(" ")[0];

  const productPrice = productPriceStr ? parseFloat(productPriceStr) : 0;

  return productPrice;
};
