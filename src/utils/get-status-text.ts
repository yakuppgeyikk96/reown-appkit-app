import { ProductStatus } from "@/types/product";

export default function getStatusText(status: ProductStatus) {
  switch (status) {
    case ProductStatus.DRAFT:
      return "Draft";
    case ProductStatus.LISTED:
      return "Listed";
    case ProductStatus.SOLD:
      return "Sold";
  }
}
