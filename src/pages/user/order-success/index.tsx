import Layout from "@/components/user/layout";

const OrderSuccess = () => {
  return (
    <Layout>
      <div className="flex h-screen flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="170"
          height="132"
          viewBox="0 0 200 162"
          fill="none"
        >
          <path
            d="M163.312 0L145.732 18.344L74.9045 89.172L54.2675 69.2994L35.9236 50.9554L0 86.879L18.344 105.223L56.5605 143.439L74.1401 161.783L92.4841 143.439L181.656 54.2675L200 35.9236L163.312 0Z"
            fill="#FBA708"
          />
        </svg>
        <div className="mt-16 flex flex-col items-center gap-3">
          <p className=" text-3xl font-semibold">Order Success</p>
          <p>
            Thankyou for you’re order you can check the Booking on Profile Page
          </p>
        </div>
        <p className="mt-36">Redirect to Profile in 5 seconds</p>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
