import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/petinfomodels";
import * as favs from "../models/favpetmodels";
import * as msgs from "../models/messagemodels";
import { validatePetInfo } from "../controllers/validation";
import { authFunction } from "../controllers/auth";


interface Post {
  id: number,
  petname: string,
  petsummary:string,
  imageurl: string,
  authorid: number,
  description:string,
  links: {
    fav: string,
    msg: string,
    self: string
  }
}
const router:Router = new Router({prefix: '/api/v1/petinfos'});

const getAll = async (ctx: RouterContext, next: any) => {
const {limit=100, page=1,  order="dateCreated", direction='ASC'} = ctx.request.query;
  const parsedLimit = parseInt(limit as string, 10);
  const parsedPage = parseInt(page as string, 10);
  const result = await model.getAll(20, 1, order, direction);
   if (result.length) {
     const body: Post[] = result.map((post: any) => {
       const { id = 0, petname = "",  petsummary="",imageurl = "",authorid = 0,description="" }: Partial<Post> = post;
       const links = {
         fav: `http://${ctx.host}/api/v1/petinfos/${post.id}/fav`,
         msg: `http://${ctx.host}/api/v1/petinfos/${post.id}/msg`,
         self: `http://${ctx.host}/api/v1/petinfos/${post.id}`
       };
       return { id, petname, petsummary,imageurl,authorid, description, links }; 
     });
  ctx.body = body;
  
  await next();
      
   }
}
const createPetrecord = async (ctx: RouterContext, next: any) => {
  const body = ctx.request.body;
  let result = await model.add(body);
  if(result.status==201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = {err: "insert data failed"};
  }
  await next();
}

const getById = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  let petinfo = await model.getById(id);
  if(petinfo.length) {
    ctx.body = petinfo[0];
     ctx.status=200;
  } else {
    ctx.status = 404;
  }
  await next();
}

const updatePetrecord = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  let c: any = ctx.request.body;
  let result = await model.update(c,id)
  if (result) {
    ctx.status = 201
    ctx.body = `Article with id ${id} updated` 
  } 
  await next();
}

const deletePetrecord = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
let petinfo:any = await model.deleteById(id)
  ctx.status=201
  ctx.body = petinfo.affectedRows ? {message: "removed"} : {message: "error"};
  await next();
}

//mehtods for Heart(Favorite) icon
async function userFav(ctx: RouterContext, next: any) {
  const user = ctx.state.user;
  const uid:number =user.user.id;
  const result = await favs.listFavpet(uid);
  ctx.body = result ? result : 0;
  await next();
}

async function postFav(ctx: RouterContext, next: any) {
  const user = ctx.state.user;
  const uid:number =user.user.id;
  const id = parseInt(ctx.params.id);
  const result:any = await favs.addFavpet(id, uid);
  ctx.body = result.affectedRows ? {message: "added",userid:result.userid} : {message: "error"};
  await next();
}

async function rmFav(ctx: RouterContext, next: any) {
  const user = ctx.state.user;
  const uid:number =user.user.id;
  const id = parseInt(ctx.params.id);
  const result:any = await favs.deleteFavpet(id, uid);
  ctx.body = result.affectedRows ? {message: "removed"} : {message: "error"};
  await next();
}

//methods for message icon
async function listMsg(ctx: RouterContext, next: any){
   const id = parseInt(ctx.params.id);
   const result = await msgs.getMessage(id);
  ctx.body = result ? result : 0;
  await next();
}

async function addMessage(ctx: RouterContext, next: any){
  const id = parseInt(ctx.params.id);
  const user = ctx.state.user;
  const uid:number =user.user.id;
  const uname = user.user.username;
  let msg:any = ctx.request.body;
  console.log('ctx.request.body ',ctx.request.body)
  console.log('..msg ',msg)
  const result:any= await msgs.createMessage(id, uid,uname, msg);
  ctx.body = result.affectedRows ? {message: "added"} : {message: "error"};
  await next();
}

async function rmMsg(ctx: RouterContext, next: any){
 let b:any = ctx.request.body;
 
 const id = parseInt(ctx.params.id); 
  const result:any = await msgs.deleteMessage(id, b);
  ctx.body = result.affectedRows ? {message: "removed"} : {message: "error"}; 
  await next();
}

router.get('/', getAll);
router.post('/', authFunction, bodyParser(), validatePetInfo, createPetrecord);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', authFunction, bodyParser(),validatePetInfo, updatePetrecord);
router.delete('/:id([0-9]{1,})', authFunction, deletePetrecord);

router.get('/fav', authFunction, userFav);
router.post('/:id([0-9]{1,})/fav', authFunction, postFav);
router.del('/:id([0-9]{1,})/fav', authFunction, rmFav);

router.get('/:id([0-9]{1,})/msg', listMsg);
router.post('/:id([0-9]{1,})/msg', authFunction,bodyParser(),addMessage);
router.del('/:id([0-9]{1,})/msg', authFunction, bodyParser(),rmMsg);
export { router };
