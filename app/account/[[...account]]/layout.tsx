import ProfileNavbar from "@/components/profile-navbar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProfileNavbar />
      <section>{children}</section>
    </>
  );
}
