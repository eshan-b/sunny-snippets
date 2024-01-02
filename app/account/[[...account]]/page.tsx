import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => {
  return (
    <div className="flex justify-center">
      <UserProfile path="/account" routing="path" />
    </div>
  );
};

export default UserProfilePage;
