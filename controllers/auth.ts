import passport from "koa-passport";
import { BasicStrategy } from "passport-http";
import { RouterContext } from "koa-router";

import * as users from '../models/userlistmodels';

const verifyPassword = (user: any, password: string) => {
  console.log('user return pwd: '+user.password);
  console.log('input password '+ password)
  return user.password === password;
}

passport.use(new BasicStrategy(async (username, password, done) => {

  let result: any[] = [];
  try {
    result = await users.findByUsername(username);
    console.log('user found');
  } catch (error) {
    console.error(`Error during authentication for user ${username}: ${error}`);
    done(null, false);
  }
  if(result.length) {
    const user = result[0];
    console.log('username: '+ user.username);
    if(verifyPassword(user, password)) {
      console.log('done')
      done(null, {user: user});
    } else {
      console.log(` ${username} the password is incorrect, please try again.`);
      done(null, false);
    }
  } else {
    console.log(`The user can not found with username: ${username}`);
    done(null, false);
  }
}));

export const authFunction = async (ctx: RouterContext, next: any) => {
  await passport.authenticate("basic", { session: false })(ctx, next);
  if(ctx.status == 401)
  {
    ctx.body = {
      message: 'Not pass auth, Please login or check your username and password'
    };
   
   }

  }


