import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Product } from "@/types/product";

interface MyProductDetailViewProps {
  product: Product;
}

export default function MyProductDetailView({
  product,
}: MyProductDetailViewProps) {
  if (!product) {
    return <div>Product not found</div>;
  }

  const category =
    product.metadata?.attributes?.find((attr) => attr.trait_type === "Category")
      ?.value || "N/A";

  const price =
    product.metadata?.attributes?.find((attr) => attr.trait_type === "Price")
      ?.value || "N/A";

  const symbol = product.metadata.symbol;

  const mintAdress = product.mintAddress
    ? `${product.mintAddress.slice(0, 4)}...${product.mintAddress.slice(-4)}`
    : "N/A";

  const statusColors: Record<string, string> = {
    draft: "bg-yellow-100 text-yellow-800",
    listed: "bg-green-100 text-green-800",
    sold: "bg-blue-100 text-blue-800",
    inactive: "bg-gray-100 text-gray-800",
  };

  const renderDetailItem = (
    fieldName: string,
    value: string,
    badgeVariant: "default" | "outline" = "default",
    badgeClassName?: string
  ) => (
    <div className="flex items-center justify-between">
      <span>{fieldName} </span>
      <Badge variant={badgeVariant} className={badgeClassName}>
        {value}
      </Badge>
    </div>
  );

  const renderDetailItemWithTooltip = (
    fieldName: string,
    value: string,
    badgeVariant: "default" | "outline" = "default",
    badgeClassName?: string
  ) => (
    <div className="flex items-center justify-between">
      <span>{fieldName} </span>
      {value === "N/A" ? (
        <Badge variant="outline" className={badgeClassName}>
          {value}
        </Badge>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant={badgeVariant} className={badgeClassName}>
                {value.slice(0, 4)}...{value.slice(-4)}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{value}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{product.name}</h2>
      </div>

      {renderDetailItem(
        "Status",
        product.status,
        "default",
        statusColors[product.status]
      )}

      {renderDetailItem("Category", category)}

      {renderDetailItem("Price", price)}

      {renderDetailItem("Symbol", symbol)}

      {renderDetailItemWithTooltip("Mint Address", mintAdress)}
    </div>
  );
}
