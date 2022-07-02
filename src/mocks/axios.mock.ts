
import {rest} from "msw"
import {setupServer} from "msw/node"


export const handlers = [
    rest.get(`https://jsonplaceholder.typicode.com/photos?_page=1&_limit=30`, 
    (req: any, res: any, ctx: any) => {
        return res(
            ctx.tatus(200),
            ctx.json({data: [
                {
                    albumId: 1,
                    id: 1,
                    title: "accusamus beatae ad facilis cum similique qui sunt",
                    url: "https://via.placeholder.com/600/92c952",
                    thumbnailUrl: "https://via.placeholder.com/150/92c952",
                },
                {
                    albumId: 1,
                    id: 2,
                    title: "reprehenderit est deserunt velit ipsam",
                    url: "https://via.placeholder.com/600/771796",
                    thumbnailUrl: "https://via.placeholder.com/150/771796"
                }
            ]})
        )
    })
]

export const server = setupServer(...handlers)

