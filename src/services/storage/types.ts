export interface PinataMetadata {
  name?: string;
  keyvalues?: Record<string, string>;
}

export interface PinataOptions {
  pinataMetadata?: PinataMetadata;
  pinataOptions?: {
    cidVersion?: 0 | 1;
    customPinPolicy?: {
      regions?: Array<{ id: string; desiredReplicationCount: number }>;
    };
  };
}

export interface UploadResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate?: boolean;
}

export interface StorageError {
  message: string;
  code?: string;
}

export type UploadResult = {
  data: UploadResponse | null;
  error: StorageError | null;
};

export interface MetadataAttribute {
  trait_type: string;
  value: string;
}

export interface MetadataPropertyFile {
  uri: string;
  type: string;
}

export interface MetadataPropertyCreator {
  address: string;
  share: number;
}

export interface MetadataProperty {
  files: MetadataPropertyFile[];
  category: string;
  creators: MetadataPropertyCreator[];
}

export interface MetadataCollection {
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
  attributes: MetadataAttribute[];
  properties: MetadataProperty;
  collection: MetadataCollection;
}
