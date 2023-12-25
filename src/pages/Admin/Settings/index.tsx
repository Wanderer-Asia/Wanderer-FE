/* eslint-disable @typescript-eslint/no-explicit-any */
import { editUserSchema, IEditUser } from "@/utils/apis/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Camera, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useToken } from "@/utils/context/token";
import { useToast } from "@/components/ui/use-toast";
import { updateUser } from "@/utils/apis/user/api";

const SettingsPage = () => {
  const { user, fetchProfile } = useToken();

  const form = useForm<IEditUser>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: user.email,
      fullname: user.fullname,
      image: "",
      password: "",
      phone: user.phone,
    },
  });
  const [showUploadedImage, setShowUploadedImage] = useState("");
  const imageWatcher = form.watch("image");
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Wanderer - Settings";
    if (imageWatcher?.length > 0) {
      setShowUploadedImage(URL.createObjectURL(imageWatcher?.[0]));
    }
  }, [imageWatcher]);

  const editUserHandler = async (values: IEditUser) => {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("fullname", values.fullname);
      formData.append("image", values.image[0]);
      formData.append("password", values.password as string);
      formData.append("pone", values.phone);
      const res = await updateUser(formData as any);

      toast({
        description: <p className="capitalize">{res?.message}</p>,
      });

      fetchProfile();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: <p className="capitalize">{error.message}</p>,
        });
      }
    }
  };

  return (
    <div className="mt-5 w-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(editUserHandler)}>
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem className="mb-3">
                <div className="flex w-full justify-center">
                  <div className="relative h-[140px] w-[140px]">
                    <img
                      src={showUploadedImage ? showUploadedImage : user.image}
                      alt="profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                    <FormLabel
                      htmlFor="image"
                      className="absolute bottom-0 right-5 rounded-full bg-black p-1 hover:cursor-pointer dark:bg-white"
                    >
                      <Camera className=" stroke-white dark:stroke-black" />
                    </FormLabel>
                  </div>
                </div>
                <FormControl>
                  <Input
                    placeholder="image"
                    {...form.register("image")}
                    id="image"
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mb-6 mt-5 w-[200px] bg-yellow-main text-black"
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsPage;
