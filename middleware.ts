export { default } from "next-auth/middleware";

export const config = {
  // protected routes
  matcher: [
    "/issues/new",
    "/issues/edit/:id+", // + == modifier == 1 or more parameters
    "/issues/delete/:id+",
  ],
};
