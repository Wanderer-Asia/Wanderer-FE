import Layout from "@/components/user/layout";
import ProfileHeader from "./profile-header";
import ProfileTable from "./profile-table";
import React from "react";

const ProfilePage = () => {
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
