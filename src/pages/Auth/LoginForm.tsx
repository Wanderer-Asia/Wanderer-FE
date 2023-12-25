import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema, loginSchema } from "@/utils/apis/auth";

import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/custom-formfield";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postLogin } from "@/utils/apis/auth/api";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useToken } from "@/utils/context/token";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const { toast } = useToast();
  const { changeToken } = useToken();
  const navigate = useNavigate();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginSchema) => {
    try {
      const result = await postLogin(data);
      changeToken(result.data.token);

      if (result.data.role === "admin") {
        return navigate("/admin");
      }
      if (result.data.role === "user") {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <Card>
          <CardHeader>
            <CardDescription className="text-center text-gray-800">
              Enter Your Email and Password
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
            <Link to={`/admin`}>
              <p className="mt-2 text-[12px] text-blue-600">Forgot Password?</p>
            </Link>
          </CardContent>
          <CardFooter>
            <Button className="mx-5 w-full bg-tyellow text-black hover:bg-yellow-main">
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default LoginForm;
