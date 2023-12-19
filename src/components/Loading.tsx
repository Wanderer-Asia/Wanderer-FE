import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center">
      <Loader2 className="h-[200px] w-[200px] animate-spin" />
      <p className="font-medium text-neutral-500">Loading...</p>
    </div>
  );
};

export default Loading;
