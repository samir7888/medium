import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {
  createBlogInput,
  updateBlogInput,
} from "@chill_guy_sameer/medium-common";

import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use(async (c: any, next: any) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "You are not login" });
  }

  const payload = await verify(jwt, c.env.JWT_SECRET);

  if (!payload.id) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
 
  c.set('userId',payload.id)

  await next();
});

blogRouter.post("/", async (c) => {
  const userId = c.get("userId"); // Retrieve userId from the request
  if (!userId) {
    c.status(400);
    return c.json({
      message: "User ID is required",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are incorrect",
    });
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        author: {
          connect: { id: userId }, // Ensure the user exists and link the blog to this user
        },
      },
    });

    return c.json({
      id: blog.id,
      msg: "Blog created successfully",
    });
  } catch (error) {
    console.error("Error creating blog:", error); // Log error for debugging
    return c.json({
      error: "Failed to create blog.",
    });
  }
});



blogRouter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const userId = c.get("userId");
  if (!userId) {
    c.status(401);
    return c.json({
      message: "Unauthorized: User ID not found",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {  title, content } = body;

  if (!id || !title || !content) {
    c.status(400);
    return c.json({
      message: "Invalid input: Blog ID, title, and content are required",
    });
  }

  try {
    const blog = await prisma.blog.update({
      where: {
        id: id,
        authorId: userId,
      },
      data: {
        title: title,
        content: content,
      },
    });

    return c.json({
      id: blog.id,
      msg: "Blog updated successfully",
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    c.status(500);
    return c.json({
      message: "Failed to update the blog. Please try again later.",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.blog.findMany({
    select:{
      content:true,
      title:true,
      id:true,
      author:{
        select:{
          name:true
        }
      }
    }
  });
  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.findUnique({
    where: {
      id,
    },
    select:{
      content:true,
      title:true,
      id:true,
      author:{
        select:{
          name:true
        }
      }
    }

  });

  return c.json({ blog });
});
