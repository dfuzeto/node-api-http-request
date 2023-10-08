import http from "http";
import { json } from "./middlewares/json.js";
import { routes } from "./middlewares/routes.js";
import { extractParams } from "./middlewares/utils./search-query-parms.js";

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })


  if (route) {
    const routeParams = req.url.match(route.path)

    
    const { query, ...params } = routeParams.groups

   req.params =  params
   req.query = query ? extractParams(query) : {}
    
    return route.handler(req, res)
  }

  return res.writeHead(404)
})


server.listen(3333);
console.log("server running");
