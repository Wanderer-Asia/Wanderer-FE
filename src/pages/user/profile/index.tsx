import Layout from "@/components/user/layout";
import ProfileHeader from "./profile-header";
import ProfileTable from "./profile-table";
import { useEffect } from "react";
import { useToken } from "@/utils/context/token";

const ProfilePage = () => {
  const { fetchProfile } = useToken();
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Layout>
      <div className="overflow-auto">
        <ProfileHeader />
        <h1 className="mb-5 mt-10 text-center text-3xl">Detail Book</h1>
        <ProfileTable />
      </div>
    </Layout>
  );
};

export default ProfilePage;
