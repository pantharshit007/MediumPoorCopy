import { Hono } from "hono";
import { allusers, login, signup } from "../controllers/auth";
import { auth } from "../middleware/authMiddleware";
import {
  allPost,
  createPost,
  deletePost,
  getPost,
  updatePost,
  userPost,
} from "../controllers/blog";

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

// middleware
app.use("/blog/*", auth);

// Blog routes
app.post("/blog/create", createPost);
app.put("/blog/update/:id", updatePost);
app.get("/blog/bulk", allPost);
app.get("/blog/:id", getPost);
app.get("/blog/user/:id", userPost);
app.delete("/blog/delete/:id", deletePost);

export default app;
