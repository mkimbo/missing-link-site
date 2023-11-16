import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <Container>
      <div className="w-full lg:w-6/12 px-4 mx-auto mt-8">
        <Skeleton className="w-full aspect-square rounded-xl md:aspect-[2.4/1] mb-3" />
        <Skeleton className="w-full aspect-square rounded-xl md:aspect-[2.4/1] mb-3" />
        <Skeleton className="w-full aspect-square rounded-xl md:aspect-[2.4/1] mb-3" />
      </div>
    </Container>
  );
};

export default Loading;
{
  /* <div className="flex flex-col justify-center items-center w-full ">
        <Loader className="h-25 w-25 animate-spin" />
      </div> */
}
