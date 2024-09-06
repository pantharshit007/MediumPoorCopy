import { Context } from "hono";
import connection from "../Database/dbConnection";
import { StatusCode } from "hono/utils/http-status";
import { createBlog, updateBlog } from "@jethiya007/mediumcopy-common";

// Utility function for sending JSON responses
function sendJsonResponse(
  c: Context,
  status: StatusCode,
  success: boolean,
  message: string | any,
  data?: any
) {
  c.status(status);
  return c.json({
    success: success,
    message: message,
    ...data,
  });
}

// Create a new blog post
async function createPost(c: Context) {
  const prisma = connection(c);
  const authorId: string = c.get("userId");
  const body = await c.req.json();

  const { success, error } = createBlog.safeParse(body);
  if (!success) {
    const errorMessages = error.flatten();
    c.status(400);
    return c.json({ error: errorMessages });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    return sendJsonResponse(c, 200, true, "Blog Post Created", {
      postId: post.id,
    });
  } catch (err: any) {
    console.error("> Error while creating post:", err.message);
    return sendJsonResponse(c, 500, false, err.message);
  }
}

// Update a blog post
async function updatePost(c: Context) {
  const prisma = connection(c);
  const authorId: string = c.get("userId");
  const blogId = c.req.param("id");
  const body = await c.req.json();

  const { success, error } = updateBlog.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: error.message });
  }

  try {
    const updatedBlog = await prisma.post.update({
      where: {
        id: blogId,
        authorId: authorId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    if (!updatedBlog) {
      return sendJsonResponse(c, 403, false, "Failed to update blog post");
    }

    return sendJsonResponse(c, 200, true, "Updated blog post", {
      blogId: updatedBlog.id,
    });
  } catch (err: any) {
    console.error("> Failed to update blog:", err.message);
    return sendJsonResponse(c, 500, false, err.message);
  }
}

// Fetch all blogs
// TODO: can add Pagination
async function allPost(c: Context) {
  const prisma = connection(c);

  try {
    const allBlogs = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: { name: true },
        },
      },
    });
    return sendJsonResponse(c, 200, true, "All Available Blogs", {
      blogs: allBlogs,
    });
  } catch (err: any) {
    console.error("> Failed to retrieve All Blogs:", err.message);
    return sendJsonResponse(c, 500, false, err.message);
  }
}

// Fetch a specific blog by id
async function getPost(c: Context) {
  const prisma = connection(c);
  const blogId = c.req.param("id");

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: { name: true, id: true },
        },
      },
    });

    if (!blog) {
      return sendJsonResponse(c, 404, false, "No blog found!");
    }

    return sendJsonResponse(c, 200, true, "Requested blog!", { blog });
  } catch (err: any) {
    console.error("> Failed to fetch blog!", err.message);
    return sendJsonResponse(c, 500, false, err.message);
  }
}

// Fetch all user's blogs
async function userPost(c: Context) {
  const prisma = connection(c);
  // const id1: string = c.get("userId");
  const id2: string | undefined = c.req.query("id");
  const authorId = id2;

  try {
    const blogs = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: { name: true },
        },
      },
    });

    if (!blogs || blogs.length === 0) {
      return sendJsonResponse(c, 404, false, "No blogs found!");
    }

    return sendJsonResponse(c, 200, true, "User specific Blogs!", { blogs });
  } catch (err: any) {
    console.error("> Failed to fetch user's blogs!", err.message);
    return sendJsonResponse(c, 500, false, err.message);
  }
}

// Delete a specific blog by id
// TODO: BULK DELETE
async function deletePost(c: Context) {
  const prisma = connection(c);
  const authorId = c.get("userId");
  const blogId: string = c.req.param("id");

  try {
    const blog = await prisma.post.delete({
      where: {
        authorId: authorId,
        id: blogId,
      },
    });

    if (!blog) {
      return sendJsonResponse(c, 403, false, "Not allowed!");
    }

    return sendJsonResponse(c, 200, true, "Blog Deleted!");
  } catch (err: any) {
    console.error("> Failed to delete blog!", err.message);
    return sendJsonResponse(c, 500, false, err.message);
  }
}

export { createPost, updatePost, allPost, getPost, userPost, deletePost };
