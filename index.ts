import Koa from "koa";
import Router, { RouterContext }  from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import passport from 'koa-passport';
import bodyParser from "koa-bodyparser";
import cors from '@koa/cors' ;
import { router as uploads } from './routes/uploads';
import { router as userslist } from "./routes/userlistRoutes";
import {router as petinfos} from "./routes/petinfoRoutes";

import serve from 'koa-static';

const app: Koa = new Koa();
const router: Router = new Router();

app.use(serve('./docs'));
app.use(cors());
app.use(logger());
app.use(json());
app.use(bodyParser());
app.use(router.routes());
app.use(passport.initialize());
app.use(uploads.middleware());
app.use(userslist.middleware());
app.use(petinfos.middleware());

app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next();
    console.log(ctx.status)
    if(ctx.status === 404){
      ctx.body = {err: "No such endpoint existed"};
    }
  } catch(err: any) {
    ctx.body = {err: err};
  }

});
let port = process.env.PORT || 10889;
app.listen(10889, () => {
console.log( `Koa Started at ${port}` );
})