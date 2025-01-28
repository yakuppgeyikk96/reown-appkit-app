import Spinner from "@/components/shared/Spinner";

export default function CreateProductLoading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] text-gray-600">
      <Spinner />
    </div>
  );
}
