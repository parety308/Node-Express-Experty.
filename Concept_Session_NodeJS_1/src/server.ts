import { createServer } from "node:http";
import config from "./config";

const server = createServer((req, res) => {
    const url = req.url ?? '/';
    if (url === '/') {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "This is root route" }))
    }
    if (url === '/products') {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "This is Products route" }))
    }
});

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})