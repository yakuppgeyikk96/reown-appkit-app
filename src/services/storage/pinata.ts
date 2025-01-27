import axios from "axios";
import FormData from "form-data";
import { STORAGE_CONFIG } from "./config";
import { ProductMetadata, UploadResult } from "./types";

class PinataService {
  private readonly baseURL = "https://api.pinata.cloud";
  private readonly jwt: string;

  constructor() {
    this.jwt = STORAGE_CONFIG.JWT;
  }

  async uploadFile(file: File, options = {}): Promise<UploadResult> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      if (options) {
        formData.append("pinataOptions", JSON.stringify(options));
      }

      const res = await axios.post(
        `${this.baseURL}/pinning/pinFileToIPFS`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.jwt}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return {
        data: res.data,
        error: null,
      };
    } catch (error) {
      console.error("Pinata upload error:", error);
      return {
        data: null,
        error: {
          message: "Error uploading file",
          code: "UPLOAD_ERROR",
        },
      };
    }
  }

  async uploadProductFiles(
    mainImage: File,
    productFile: File
  ): Promise<{
    mainImage: UploadResult;
    productFile: UploadResult;
  }> {
    const mainImageOptions = {
      pinataMetadata: {
        name: `product_image_${Date.now()}`,
      },
    };

    const productFileOptions = {
      pinataMetadata: {
        name: `product_file_${Date.now()}`,
      },
    };

    try {
      const [mainImageResult, productFileResult] = await Promise.all([
        this.uploadFile(mainImage, mainImageOptions),
        this.uploadFile(productFile, productFileOptions),
      ]);

      return {
        mainImage: mainImageResult,
        productFile: productFileResult,
      };
    } catch (error) {
      console.error("Pinata multiple upload error:", error);
      const errorResult: UploadResult = {
        data: null,
        error: {
          message: "Error uploading files",
          code: "UPLOAD_MULTIPLE_ERROR",
        },
      };

      return {
        mainImage: errorResult,
        productFile: errorResult,
      };
    }
  }

  async uploadMetadata(metadata: ProductMetadata): Promise<UploadResult> {
    try {
      const response = await axios.post(
        `${this.baseURL}/pinning/pinJSONToIPFS`,
        metadata,
        {
          headers: {
            Authorization: `Bearer ${this.jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        data: response.data,
        error: null,
      };
    } catch (error) {
      console.error("Pinata metadata upload error:", error);
      return {
        data: null,
        error: {
          message: "Error uploading metadata",
          code: "METADATA_UPLOAD_ERROR",
        },
      };
    }
  }

  getIPFSUrl(hash: string): string {
    return `${STORAGE_CONFIG.GATEWAY_URL}/ipfs/${hash}`;
  }
}

export const pinataService = new PinataService();
