import { ProductType, ProductTypeInfo } from "@/types/product";

export const PRODUCT_TYPES: ProductTypeInfo[] = [
  {
    value: ProductType.SOFTWARE,
    label: "Software",
    description: "Code, script, application",
  },
  {
    value: ProductType.DESIGN,
    label: "Design",
    description: "Graphic design, UI kit or template",
  },
];
