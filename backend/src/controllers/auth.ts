import { Context } from "hono";
import connection from "../Database/dbConnection";
import { sign } from "hono/jwt";

async function signup(c: Context): Promise<Response> {
  // c: context variable
  const prisma = connection(c);
  try {
    const body = await c.req.json();
    const name = body.email.split("@")[0];
    const user = await prisma.user.create({
      data: {
        name: body.name || name,
        email: body.email,
        password: body.password,
      },
    });

    // generate a jwt token
    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      success: true,
      message: "signup successfull",
      userDetail: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: jwtToken,
    });
  } catch (err) {
    // @ts-ignore
    return c.status(500).json({
      success: false,
      message: "An error occurred during signup.",
      error: err,
    });
  }
}

async function login(c: Context): Promise<Response> {
  const prisma = connection(c);
  const body = await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        id: true,
        email: true,
        password: true, // Include the password hash
        name: true,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        success: false,
        message: "User not found",
      });
    }

    // check password: need to add bcrypt
    if (body.password !== user.password) {
      c.json(403);
      return c.json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = {
      email: user.email,
      id: user.id,
    };
    user.password = "";

    const jwtToken = await sign(payload, c.env.JWT_SECRET); //not possible to assign expiry time

    return c.json({
      success: true,
      message: "Login Success!",
      token: jwtToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("> Error while login", err);
    // @ts-ignore
    return c.status(500).json({});
  }
}

async function allusers(c: Context): Promise<Response> {
  const prisma = connection(c);

  try {
    const allUsers = await prisma.user.findMany({});
    return c.json({
      success: true,
      message: "All users",
      users: allUsers,
    });
  } catch (err) {
    console.error("> Error while login", err);
    // @ts-ignore
    return c.status(500).json({
      success: false,
      message: "Login failed",
      error: err,
    });
  }
}

export { signup, login, allusers };
