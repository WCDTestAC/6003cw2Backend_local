import { authFunction } from '../controllers/auth';
import { validateUser } from "../controllers/validation";
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import * as model from '../models/userlistmodels';

const prefix = '/api/v1/userlist';
const router:Router = new Router({ prefix: prefix });

const getAllUser = async(ctx: any, next: any) =>{  
 
    let users = await model.getAllUser(20, 1);
    if (users.length) {
      ctx.body = users;
    }
      else {
        ctx.body = {};
      }
      await next();
  
  }

const doSearch = async(ctx: any, next: any) =>{
  
    let { limit = 50, page = 1, fields = "", q = "" } = ctx.request.query;
    // ensure params are integers
    limit = parseInt(limit);
    page = parseInt(page);
    // validate values to ensure they are sensible
    limit = limit > 200 ? 200 : limit;
    limit = limit < 1 ? 10 : limit;
    page = page < 1 ? 1 : page;
    let result:any;
    // search by single field and field contents
    // need to validate q input
   try{
    if (q !== "") 
      result = await model.searchUser(fields, q);     
    else
    {console.log('get all')
      result = await model.getAllUser(limit, page);
     console.log(result)
    }
      
    if (result.length) {
      if (fields !== "") {
        // first ensure the fields are contained in an array
        // need this since a single field in the query is passed as a string
        console.log('fields'+fields)
        if (!Array.isArray(fields)) {
          fields = [fields];
        }
        // then filter each row in the array of results
        // by only including the specified fields
        result = result.map((record: any) => {
          let partial: any = {};
          for (let field of fields) {
            partial[field] = record[field];
          }
          return partial;
        });
      }
      console.log(result)
      ctx.body = result;
    }
  }
    catch(error) {
      return error
    }
   await next();
  }


  const getByUserId = async(ctx: any, next: any) =>{
  let id = ctx.params.id;
  let user = await model.getByUserId(id);
  if (user.length) {
    ctx.body = user[0];
  }
}

  const createUser = async(ctx: any, next: any) =>{
  const body = ctx.request.body;
  console.log("Creat user bodyPart :", body)
    // let avatarurl:string=' '
    // if(body.avatarurl)
    //   avatarurl=body.avatarurl;
    let username:string= body.username;
    let password:string = body.password;
    let email:any = body.email;
    let role:string = 'user';
    let authCode:string = body.authCode;

    let authCodeList:string[]= [
      "tcsfamily","123456"
    ]
    
     if(authCode)
     {for(let i=0;i<authCodeList.length;i++)
       if(authCode==authCodeList[i])
       {role='admin'
        break;
       }
     }
    console.log("role ", role)
    // let newUser = {username: username, password: password, email: email, avatarurl: avatarurl, role: role};
    let newUser = {username: username, password: password, email: email, role: role};

    
  let result = await model.addUser(newUser);
  //get result information
  
  if (result === true) {
    ctx.status = 201;
    ctx.body = { status: 201 };
    ctx.body = "{message:New user created}";
  }else {
    ctx.status = 404;
    ctx.body = "New user not created";
  }
}

  const login = async(ctx: any, next: any) =>{
  // return any details needed by the client
    const user = ctx.state.user;
 // const { id, username, email, avatarurl, role } =ctx.state.user;
    const id:number =user.user.id;
    const username:string =user.user.username;
    const email:string =user.user.email;
    const avatarurl:string =user.user.avatarurl;
    const role:string =user.user.role;
    const links = {
    self: `http://${ctx.host}${prefix}/${id}`,
  };
  ctx.body = { id, username, email, avatarurl, role, links };
}

const updateUser = async(ctx: any, ) =>{
  let id = +ctx.params.id;
  let c: any = ctx.request.body; 
  let result = await model.updateUser(c,id)
  if (result) {
    ctx.status = 201
    ctx.body = `User with id ${id} updated` 
  }else {
    ctx.status
    console.log(ctx.status)
    ctx.body = "User not updated"
  } 
}

const deleteUser = async(ctx: any, next: any) =>{
  let id = +ctx.params.id;
  
  let user = await model.deleteByUserId(id)
    ctx.status=201
    ctx.body = `User with id ${id} deleted`
    await next();
}


router.get('/', authFunction, doSearch);
//router.get('/search', authFunction, doSearch);
router.post('/', bodyParser(), validateUser, createUser);
router.get('/:id([0-9]{1,})', getByUserId);
router.put('/:id([0-9]{1,})',bodyParser(), validateUser,  updateUser);
router.del('/:id([0-9]{1,})', deleteUser);
router.post('/login', authFunction, login);

export {router};