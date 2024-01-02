import SimpleNavbar from "@/components/simple-navbar";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SimpleNavbar title="Articles" />
      <section>{children}</section>
    </>
  );
}
