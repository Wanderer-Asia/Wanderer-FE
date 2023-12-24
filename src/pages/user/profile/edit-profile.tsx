import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IEditUser, editUserSchema } from "@/utils/apis/user";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/custom-formfield";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { putProfile } from "@/utils/apis/users/api";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useToken } from "@/utils/context/token";
import { zodResolver } from "@hookform/resolvers/zod";

const EditProfile = () => {
  const { toast } = useToast();
  const { user, fetchProfile } = useToken();
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<IEditUser>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: "",
      fullname: "",
      image: "",
      password: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("email", user.email || "");
      form.setValue("fullname", user.fullname || "");
      form.setValue("phone", user.phone || "");
      setAvatarImage(user.image || "");
    }
  }, [form, user]);

  const imageWatcher = form.watch("image");

  useEffect(() => {
    if (imageWatcher?.length > 0) {
      setAvatarImage(URL.createObjectURL(imageWatcher?.[0]));
    }
  }, [imageWatcher]);

  const editUserHandler = async (data: IEditUser) => {
    try {
      const result = await putProfile(data);
      if (result.message) {
        toast({
          description: result.message,
        });
        fetchProfile();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          type="button"
          variant="secondary"
          className=" bg-tyellow px-5 hover:bg-tyellowlight"
        >
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(editUserHandler)}>
            <DialogHeader className="mb-5 items-center">
              <CustomFormField control={form.control} name="image">
                {() => (
                  <>
                    <div className="flex w-full justify-center">
                      <label
                        htmlFor="image"
                        className="relative h-40 w-40 hover:cursor-pointer"
                      >
                        <Avatar className="h-full w-full rounded-full">
                          <AvatarImage
                            src={avatarImage}
                            alt="photo profile"
                            className="object-cover"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-5 rounded-full bg-black p-1 dark:bg-white">
                          <Camera className=" stroke-white dark:stroke-black" />
                        </div>
                      </label>
                    </div>
                    <Input
                      {...form.register("image")}
                      id="image"
                      type="file"
                      accept="image/jpg, image/jpeg, image/png"
                      className="hidden"
                    />
                  </>
                )}
              </CustomFormField>
            </DialogHeader>
            <div className="flex flex-col gap-3 px-14">
              <CustomFormField control={form.control} name="fullname">
                {(field) => (
                  <Input
                    {...field}
                    placeholder="Full Name"
                    type="text"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
                  />
                )}
              </CustomFormField>
              <CustomFormField control={form.control} name="email">
                {(field) => (
                  <Input
                    {...field}
                    placeholder="Email"
                    type="email"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
                  />
                )}
              </CustomFormField>
              <CustomFormField control={form.control} name="phone">
                {(field) => (
                  <Input
                    {...field}
                    placeholder="Phone Number"
                    type="tel"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
                  />
                )}
              </CustomFormField>
              <CustomFormField control={form.control} name="password">
                {(field) => (
                  <Input
                    {...field}
                    placeholder="Password"
                    type="password"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
                  />
                )}
              </CustomFormField>
            </div>
            <DialogFooter className="mt-10 gap-2 sm:justify-center">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="secondary"
                className=" bg-tyellow hover:bg-tyellowlight"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
