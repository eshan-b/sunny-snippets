import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // protect only the admin route
  publicRoutes: ["((?!^/admin/).*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
