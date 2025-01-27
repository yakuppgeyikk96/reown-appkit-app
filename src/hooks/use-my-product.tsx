import { getMyProducts } from "@/app/actions/product";
import { Product } from "@/types/product";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UseMyProductParams {
  address?: string;
}

interface UseMyProductReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  refetchProducts: () => Promise<void>;
}

const useMyProduct = ({ address }: UseMyProductParams): UseMyProductReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMyProducts = useCallback(async (address?: string) => {
    if (!address) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await getMyProducts({
        owner: address,
      });

      if (result.success && result.data) {
        setProducts(result.data);
      } else {
        throw new Error("Failed to load products");
      }
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred");
      console.error("Error fetching products:", error);
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (address) {
      fetchMyProducts(address);
    }
  }, [address, fetchMyProducts]);

  return {
    products,
    loading,
    error,
    refetchProducts: () => fetchMyProducts(address),
  };
};

export default useMyProduct;
