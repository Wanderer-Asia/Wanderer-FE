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
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

const SettingsPage = () => {
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
  const [showUploadedImage, setShowUploadedImage] = useState("");

  const imageWatcher = form.watch("image");

  useEffect(() => {
    if (imageWatcher?.length > 0) {
      setShowUploadedImage(URL.createObjectURL(imageWatcher?.[0]));
    }
  }, [imageWatcher]);

  const editUserHandler = async (values: IEditUser) => {
    console.log(values);
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
                      src={
                        showUploadedImage
                          ? showUploadedImage
                          : "https://avatars.githubusercontent.com/u/124599?v=4"
                      }
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
                    placeholder="Email"
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
                  <Input placeholder="Password" {...field} />
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

          <Button>Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsPage;
