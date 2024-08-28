import { Hono } from "hono";
import { allusers, login, signup } from "../controllers/auth";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.post("/signup", signup);
app.post("/signup", login);
app.get("/allusers", allusers);

export default app;
