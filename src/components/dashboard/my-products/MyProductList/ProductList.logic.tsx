import useMyProduct from "@/hooks/use-my-product";
import { useAppKitAccount } from "@reown/appkit/react";

const useMyProductListLogic = () => {
  const { address, status } = useAppKitAccount();
  const { products, loading } = useMyProduct({ address });

  return {
    products,
    loading: loading || status === "connecting",
    address,
  };
};

export default useMyProductListLogic;
