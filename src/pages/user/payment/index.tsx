import Layout from "@/components/user/layout";

const Payment = () => {
  return (
    <Layout>
      <div className="flex h-screen flex-col items-center justify-center">
        <img
          className="h-26 w-56"
          src="https://s3-alpha-sig.figma.com/img/50a0/851b/812e75c05619a4cde0c3e7bc432f5c29?Expires=1703462400&Signature=eR818RROilPgpwX1GNzVoLUVbtmviFmametU3SDD4HBhkLyBHEb-d-DHATtnZ4DckKLv1NJfPlxoOsFJ5ftJ8eHLUevStrfYGrJSwj3vM~ZisyrA~a~JRBDyirpzYZwylciFpb~bk9XkEVHiRdNSMnsSIyUbLgz6zFqvGYi9Rkb7Yyi1oEAs1regb5nGgaBpyoBF-GCcgvOnCwzXsUgJAa0xT~INqXPO0J~vqYu5vG6hPlcS3u4e9X3NoggfVRPDwanh9IVWLV8U-6haRAF5-oQMdmOkYeDbltQaO6hQZvH2AiZuEXo435L9W7C9OKNZMnrnCkKjLl0lcosato9XEA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
        <div className="mt-16 flex flex-col items-center gap-3">
          <p className=" text-lg font-normal">Virtual Account</p>
          <p className=" text-2xl font-semibold">1034 2034 1234 2222</p>
          <div className="flex flex-row gap-10">
            <p className=" text-lg font-semibold">Total need to pay</p>
            <p className=" text-lg font-semibold">RP 22.505.000</p>
          </div>
        </div>
        <p className="mt-36">Please finish the payment before 12 hours</p>
      </div>
    </Layout>
  );
};

export default Payment;
