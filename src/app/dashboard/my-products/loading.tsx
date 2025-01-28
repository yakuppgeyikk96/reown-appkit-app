import Spinner from "@/components/shared/Spinner";

export default function MyProductsLoading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Spinner />
    </div>
  );
}
