import Spinner from "@/components/shared/Spinner";

export default function MyProductDetailLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
      <Spinner />
    </div>
  );
}
