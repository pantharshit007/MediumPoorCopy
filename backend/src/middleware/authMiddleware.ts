import { Context } from "hono";
import { verify } from "hono/jwt";

export async function auth(c: Context, next: any) {
  const header = c.req.header("authorization") || "";
  if (!header) {
    c.status(401);
    c.json({
      success: false,
      message: "Unauthorized Access",
    });
  }

  const token = header.split(" ")[1];

  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      c.status(403);
      c.json({
        success: false,
        message: "Not Logined Yet!",
      });
    }

    // setting user id in context variable
    c.set("userId", payload.id);
    await next();
  } catch (err: any) {
    console.error("> Error while Authorizing: " + err.message);
    c.status(500);
    return c.json({
      success: false,
      message: "Error while authorizing",
    });
  }
}
