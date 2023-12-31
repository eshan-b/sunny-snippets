import SimpleNavbar from "@/components/simple-navbar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SimpleNavbar title="Account" />
      <section>{children}</section>
    </>
  );
}
