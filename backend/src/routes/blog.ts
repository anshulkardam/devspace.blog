import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: any
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || ""
    try{
    const user = await verify(header, c.env.JWT_SECRET)
    if (user) {
        c.set("userId", user.id)
       
        await next();
    } } catch(e){
        return c.json({msg: "caught error"})
    }

})
    //Create a Blog
blogRouter.post('/', async (c) => {
    const payLoad = await c.req.json()
    const id = c.get("userId")
   
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const blog = await prisma.blog.create({
        data: {
            title: payLoad.title,
            content: payLoad.content,
            authorId: id
        }
    })
    console.log(blog)
    return c.json({ id: blog.id })
})
blogRouter.put('/', async (c) => {
    const payLoad = await c.req.json()

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
    const update = await prisma.blog.update({
        where: {
            id: payLoad.id
        },
        data: {
            title: payLoad.title,
            content: payLoad.content
        }
    })
    return c.json({id: update.id});
     } catch(e){
        c.status(403)
        return c.json({msg:"caught in put update"})
    }
    
})

blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const all = await prisma.blog.findMany()
    return c.json(all)
})


blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const find = await prisma.blog.findFirst({
        where:  {
            id
        }
    })
    return c.json({find})
})
