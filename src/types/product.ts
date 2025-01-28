export enum ProductType {
  SOFTWARE = "software",
  DESIGN = "design",
}

export enum ProductStatus {
  DRAFT = "DRAFT",
  LISTED = "LISTED",
  SOLD = "SOLD",
}

export interface ProductTypeInfo {
  value: ProductType;
  label: string;
  description?: string;
}

export interface ProductAttribute {
  trait_type: string;
  value: string;
}

export interface ProductCreator {
  address: string;
  share: number;
}

export interface ProductProperties {
  files: ProductFile[];
  category: string;
  creators: ProductCreator[];
}

export interface ProductFile {
  uri: string;
  type: string;
}

export interface ProductCollection {
  name: string;
  family: string;
}

export interface ProductMetadata {
  name: string;
  symbol: string;
  description: string;
  seller_fee_basis_points: number;
  image: string;
  animation_url: string;
  external_url: string;
  attributes: ProductAttribute[];
  properties: ProductProperties;
  collection: ProductCollection;
}

export interface Product {
  id: string;
  owner: string;
  name: string;
  metadataUri: string;
  status: ProductStatus;
  escrowId: string | null;
  uniqueSeed: string | null;
  price: number | null;
  buyers: string[];
  createdAt: Date;
  updatedAt: Date;
  metadata: ProductMetadata;
}
