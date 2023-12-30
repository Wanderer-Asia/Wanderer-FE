import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { RegisterSchema, registerSchema } from "@/utils/apis/auth/type";

import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/custom-formfield";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postRegister } from "@/utils/apis/auth/api";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterForm = () => {
  const { toast } = useToast();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      phone: "",
      fullname: "",
      password: "",
    },
  });
  const handleRegister = async (data: RegisterSchema) => {
    try {
      const result = await postRegister(data);
      if (result.message) {
        toast({
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)}>
        <Card>
          <CardHeader>
            <CardDescription className="text-center text-gray-800">
              Buat akun untuk pengalaman baru
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <CustomFormField control={form.control} name="email" label="Email">
              {(field) => (
                <Input
                  {...field}
                  placeholder="mail@domain.com"
                  type="email"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="border-tyellow focus-visible:ring-tyellow"
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="phone"
              label="Phone Number"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="Phone Number"
                  type="tel"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="border-tyellow focus-visible:ring-tyellow"
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="fullname"
              label="Full Name"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="Full Name"
                  type="text"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="border-tyellow focus-visible:ring-tyellow"
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="password"
              label="Password"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="Password"
                  type="password"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="border-tyellow focus-visible:ring-tyellow"
                />
              )}
            </CustomFormField>
          </CardContent>
          <CardFooter>
            <Button className="mx-5 w-full bg-tyellow text-black hover:bg-yellow-main">
              Register
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default RegisterForm;
