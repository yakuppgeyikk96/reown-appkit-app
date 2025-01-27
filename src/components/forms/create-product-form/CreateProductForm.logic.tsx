import { pinataService } from "@/services/storage/pinata";
import { ProductMetadata, UploadResult } from "@/services/storage/types";
import createProductSchema from "@/schemas/create-product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppKitAccount } from "@reown/appkit/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createProduct } from "@/app/actions/product";

type CreateProductFormData = z.infer<typeof createProductSchema>;

const SELLER_FEE_BASIS_POINTS = 250;

const useCreateProductFormLogic = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { address } = useAppKitAccount();

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      type: "software",
      title: "",
      description: "",
      price: 0,
      mainImages: [],
      productFiles: [],
    },
  });

  const uploadFiles = async (mainImage: File[], productFile: File[]) => {
    try {
      const mainImageUploads = await Promise.all(
        mainImage.map((file) => pinataService.uploadFile(file))
      );

      const productFileUploads = await Promise.all(
        productFile.map((file) => pinataService.uploadFile(file))
      );

      const hasMainImageError = mainImageUploads.some(
        (upload) => upload.error !== null
      );

      const hasProductFileError = productFileUploads.some(
        (upload) => upload.error !== null
      );

      if (hasMainImageError || hasProductFileError) {
        throw new Error("Error uploading files");
      }

      return {
        mainImages: mainImageUploads,
        productFiles: productFileUploads,
      };
    } catch (error) {
      console.error("Failed to upload files:", error);
      throw new Error("Failed to upload files");
    }
  };

  const createMetadata = (
    values: CreateProductFormData,
    fileUploads: {
      mainImages: UploadResult[];
      productFiles: UploadResult[];
    },
    creatorAddress: string
  ): ProductMetadata => {
    const mainImageHash = fileUploads.mainImages[0].data!.IpfsHash;
    const productFileHash = fileUploads.productFiles[0].data!.IpfsHash;

    return {
      name: values.title,
      symbol: values.title.slice(0, 4).toUpperCase(),
      description: values.description,
      seller_fee_basis_points: SELLER_FEE_BASIS_POINTS,
      image: pinataService.getIPFSUrl(mainImageHash),
      animation_url: pinataService.getIPFSUrl(productFileHash),
      external_url: "",
      attributes: [
        {
          trait_type: "Category",
          value: values.type,
        },
        {
          trait_type: "Price",
          value: `${values.price.toString()} SOL`,
        },
        {
          trait_type: "File Types",
          value: values.productFiles.map((file: File) => file.type).join(", "),
        },
      ],
      properties: {
        files: [
          ...values.mainImages.map((file) => ({
            uri: pinataService.getIPFSUrl(
              fileUploads.mainImages[values.mainImages.indexOf(file)].data!
                .IpfsHash
            ),
            type: file.type,
          })),
          ...values.productFiles.map((file) => ({
            uri: pinataService.getIPFSUrl(
              fileUploads.productFiles[values.productFiles.indexOf(file)].data!
                .IpfsHash
            ),
            type: file.type,
          })),
        ],
        category: "digital_asset",
        creators: [
          {
            address: creatorAddress,
            share: 100,
          },
        ],
      },
      collection: {
        name: "Test",
        family: "Test",
      },
    };
  };

  const uploadMetadata = async (metadata: ProductMetadata) => {
    const metadataUpload = await pinataService.uploadMetadata(metadata);

    if (metadataUpload.error) {
      throw new Error("Metadata upload failed");
    }

    return metadataUpload;
  };

  const addNewProduct = async (values: CreateProductFormData) => {
    try {
      if (!address) {
        toast.error("Please connect your wallet to create a product.");
        return;
      }

      if (values.mainImages.length === 0 || values.productFiles.length === 0) {
        toast.error("Please upload at least one file.");
        return;
      }

      setIsLoading(true);

      const fileUploads = await uploadFiles(
        values.mainImages,
        values.productFiles
      );

      const metadata = createMetadata(values, fileUploads, address);

      const result = await uploadMetadata(metadata);

      if (result && result.data && result.data.IpfsHash) {
        const metadataUri = pinataService.getIPFSUrl(result.data.IpfsHash);

        const { success } = await createProduct(
          address,
          values.title,
          metadataUri
        );

        if (success) {
          toast.success("Product created successfully!");
          router.push("/dashboard/my-products");
        } else {
          toast.error("Failed to create product. Please try again.");
        }
      }
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Failed to create product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = (values: CreateProductFormData) => {
    addNewProduct(values);
  };

  return { router, form, address, isLoading, onFormSubmit };
};

export default useCreateProductFormLogic;
