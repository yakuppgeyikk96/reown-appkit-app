"use client";

import { MyProductDetailProps } from "./MyProductDetail.types";
import MyProductDetailView from "./MyProductDetailView";
import { Card, CardContent } from "@/components/ui/card";
import MyProductGallery from "./MyProductGallery";
import { useAppKitAccount } from "@reown/appkit/react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function MyProductDetail({ product }: MyProductDetailProps) {
  const { address } = useAppKitAccount();

  if (!product) {
    return <div>Product not found</div>;
  }

  const productImages = product.metadata.properties.files.filter((file) =>
    file.type.startsWith("image/")
  );

  const downloadableFiles = product.metadata.properties.files.filter(
    (file) => !file.type.startsWith("image/")
  );

  const canAccess =
    product.owner === address || product.buyers?.includes(address || "");

  return (
    <Card>
      <CardContent className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
        <div className="px-4 col-span-2">
          <MyProductGallery files={productImages} />
        </div>
        <div className="col-span-2 border-t lg:border-t-0 lg:border-l border-dashed py-4 px-8">
          <MyProductDetailView product={product} />

          {canAccess && downloadableFiles.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Download Files</h3>
              <div className="space-y-3">
                {downloadableFiles.map((file, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    asChild
                  >
                    <a
                      href={file.uri}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-4 h-4" />
                      {file.type.split("/")[1].toUpperCase()} File
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
