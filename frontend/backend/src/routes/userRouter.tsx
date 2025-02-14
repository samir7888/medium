import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signupInput,signinInput,createBlogInput,updateBlogInput} from '@chill_guy_sameer/medium-common'
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const  validation = signupInput.safeParse(body);
  if (!validation.success) {
    c.status(400); // Use 400 for invalid input
    return c.json({
      message: "inputs are incorrect",
      error: validation.error.issues, // Provide details for debugging
    });
  }
  

  const user = await prisma.user.create({
    data: {
      email: body.username,
      name: body.name,
      password: body.password,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    id:user.id,
    jwt: token,
  });
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const  {success} = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "inputs are incorrect"
    })
  }
  const { email, password } = body;

  const user = await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  }) || "";

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt: token,
  });
});
