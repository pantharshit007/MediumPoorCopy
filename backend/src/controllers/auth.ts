import { Context } from "hono";
import connection from "../Database/dbConnection";
import { sign } from "hono/jwt";
import { generateSalt, hashPassword } from "../utils/hashConversion";

//! update input data so no sql injection is possible

async function signup(c: Context): Promise<Response> {
  // c: context variable
  const prisma = connection(c);
  try {
    const body = await c.req.json();
    const name = body.email.split("@")[0];

    const salt = generateSalt();
    const hashedPass = await hashPassword(body.password + salt);
    const user = await prisma.user.create({
      data: {
        name: body.name || name,
        email: body.email,
        password: hashedPass,
        salt: salt,
      },
    });

    // generate a jwt token
    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json(
      {
        success: true,
        message: "signup successfull",
        userDetail: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: jwtToken,
      },
      201
    );
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
        // password: body.password,
      },
      select: {
        id: true,
        email: true,
        password: true, // Include the password hash
        name: true,
        salt: true,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        success: false,
        message: "User not found",
      });
    }

    // check password
    const hashedInputPassword = await hashPassword(body.password + user.salt);

    if (hashedInputPassword !== user.password) {
      c.status(403);
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
    user.salt = "";

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
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        posts: true,
      },
    });
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

// TODO: delete user
async function deleteUser(c: Context): Promise<Response> {
  const prisma = connection(c);

  try {
    //? First need to delete user's post
    //? Then user from db

    return c.json({
      success: true,
      message: "User Deleted",
    });
  } catch (err: any) {
    console.log("> Failed to delete user", err.message);
    return c.json({
      success: false,
      message: err.message,
    });
  }
}

export { signup, login, allusers };
