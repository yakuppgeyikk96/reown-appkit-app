import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductFile } from "@/types/product";

interface MyProductGalleryProps {
  files: ProductFile[];
}

export default function MyProductGallery({ files }: MyProductGalleryProps) {
  if (files.length === 0) {
    return <div>No files found</div>;
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {files.map((file, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <img
                src={file.uri}
                alt={`Product image ${index + 1}`}
                className="aspect-square rounded-lg object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
