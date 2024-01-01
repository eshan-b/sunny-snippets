import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="flex justify-center">
    <UserProfile path="/account" routing="path" />
  </div>
);

export default UserProfilePage;
