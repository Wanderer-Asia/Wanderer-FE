import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const RegisterForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Buat akun untuk pengalaman baru</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Email" type="email" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" placeholder="Phone Number" type="text" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="Full Name" type="text" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="userName">Username</Label>
          <Input id="userName" placeholder="Username" type="text" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="Password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-[200px] bg-yellow-main text-black">Register</Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
