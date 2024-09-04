import { Hono } from "hono";
import routes from "./routes/route";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.use("/*", cors());
app.route("/api/v1", routes);

app.get("/", (c) => {
  // const s = c.env.DATABASE_URL;
  return c.text("Hello Mom!");
});

export default app;
