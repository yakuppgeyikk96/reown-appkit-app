import { getMyProducts } from "@/app/actions/product";
import { useAppKitAccount } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";

export const useMyProduct = () => {
  const { address, status } = useAppKitAccount();

  const {
    data: products = [],
    isLoading,
    error,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["myProducts", address],
    queryFn: () =>
      getMyProducts({ owner: address || "" }).then((result) =>
        result.success ? result.data || [] : []
      ),
    enabled: !!address && status === "connected",
  });

  return {
    products,
    loading: isLoading || status !== "connected",
    error,
    refetchProducts,
    address,
  };
};

export default useMyProduct;
