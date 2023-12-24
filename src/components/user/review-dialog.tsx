import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReviewSchema, postReview } from "@/utils/apis/review";

import { Button } from "../ui/button";
import CustomFormField from "../custom-formfield";
import { Form } from "../ui/form";
import { reviewSchema } from "@/utils/apis/review/type";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useToken } from "@/utils/context/token";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  id: string;
  fetchTrip: () => void;
}
const ReviewDialog = (props: Props) => {
  const { user } = useToken();
  const { id, fetchTrip } = props;
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      tour_id: Number(id),
      text: "",
      rating: 0,
    },
  });

  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarSelection = (starCount: number) => {
    setSelectedStars(starCount);
    form.setValue("rating", starCount);
  };

  const reviewHandler = async (data: ReviewSchema) => {
    try {
      const result = await postReview(data);
      if (result.message) {
        toast({
          description: result.message,
        });
        fetchTrip();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <input
          placeholder="Tulis Pesan"
          className=" w-full rounded-sm bg-tblueLight p-3 outline-none placeholder:text-gray-800"
        />
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(reviewHandler)}>
            <DialogHeader className=" items-center">
              <DialogTitle>Jepang Winter Golden Route & Mount Fuji</DialogTitle>
            </DialogHeader>
            <div className="w-full items-center gap-3">
              <div className="mt-5 flex flex-row gap-5">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={user.image}
                    alt="photo profile"
                    className=" object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="mt-2 flex flex-col">
                  <label className=" font-semibold">{user.fullname}</label>
                  <p className=" text-xs">
                    Posting for the public, your comment can be seen by others.
                  </p>
                </div>
              </div>
              <CustomFormField control={form.control} name="rating">
                {() => (
                  <div className="flex flex-row gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <>
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          width="78"
                          height="78"
                          viewBox="0 0 78 78"
                          fill="none"
                          onClick={() => handleStarSelection(star)}
                          className="cursor-pointer"
                        >
                          <path
                            d="M8.50195 32.136L23.79 47.034L20.202 68.016L39 58.11L57.798 68.016L54.21 47.034L69.4979 32.136L48.438 29.094L39 10.062L29.562 29.094L8.50195 32.136Z"
                            fill={star <= selectedStars ? "#FFB703" : "gray"}
                          />
                        </svg>
                      </>
                    ))}
                  </div>
                )}
              </CustomFormField>

              <CustomFormField control={form.control} name="text">
                {(field) => (
                  <textarea
                    {...field}
                    placeholder="Tulis Pesan"
                    className=" mt-5 w-full rounded-sm bg-tblueLight p-3 outline-none placeholder:text-gray-800"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                  />
                )}
              </CustomFormField>
            </div>
            <DialogFooter className="mt-10 sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="secondary"
                className=" bg-tyellow hover:bg-tyellowlight"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              >
                Posting
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
