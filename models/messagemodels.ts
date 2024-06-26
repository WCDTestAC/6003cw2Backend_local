import * as db from '../helpers/database';

export const getMessage= async  (id:any)=> {
  let query = "SELECT * FROM usermessage WHERE petid=?;";
  const result = await db.run_query(query, [id]);
  return result;
}

export const createMessage = async (id:any, uid:any,uname:any,msg:any) =>{
 console.log('body query ', msg)
  let msgtxt=msg.messagetxt;
  console.log ("Message from query ",msgtxt)
    let query = `INSERT INTO usermessage (petid,userid,username,messagetxt) VALUES (${id},${uid},'${uname}','${msgtxt}') `  
  try{
    await db.run_query(query, [id, uid,uname,msgtxt]);  
       return {"status": 201, "affectedRows":1 }
    }
   catch(error) {
    return error
  }
  
}
   
export const deleteMessage = async  (id:any, msg:any)=> {
  console.log('body query ', msg)
  let msgtxtin=msg.source
  console.log("msgtxtin from source ", msgtxtin)
  let msgObj=JSON.parse(msgtxtin)
  console.log("msgtxtin from msgObje ", msgObj)

let messagetxt:any=msgObj.messagetxt
  console.log('in query ', messagetxt)
let query = "DELETE FROM usermessage WHERE petid=? AND messagetxt=?; ";
   try{
    await db.run_query(query, [id, messagetxt]);  
    return { "affectedRows":1 }
  } catch(error) {
    return error
  }

}


