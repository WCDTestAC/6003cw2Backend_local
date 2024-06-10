import * as db from '../helpers/database';

export const getAllUser = async  (limit=10, page=1) =>{
  const offset = (page - 1) * limit;
  const query = "SELECT * FROM userlist LIMIT  ? OFFSET  ?;";
  const data = await db.run_query(query, [limit, offset]);
  return data;
}

export const searchUser = async  (sfield:any,q:any) =>{
//  const query = `SELECT ${sfield} FROM userlist WHERE ${sfield} LIKE '%${q}%' `;
const query = `SELECT ${sfield} FROM userlist WHERE ${sfield} LIKE '%${q}%' `;

 try{ const data = await db.run_query(query,null);
  return data;}
  catch(error) {
    return error
}
}

export const getByUserId = async  (id:number) =>{
  let query = "SELECT * FROM userlist WHERE id = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

  export const addUser = async  (user:any) =>{  
  let keys= Object.keys(user)
  let values= Object.values(user)  
  let key = keys.join(',')   
  let parm = ''
  for(let i =0; i<values.length; i++){ parm +='?,'}
  parm=parm.slice(0,-1)
  let query = `INSERT INTO userlist (${key}) VALUES (${parm})`
  try{
    await db.run_query(query, values)  
    return true
  } catch(error) {
    return error
  }
}

export const findByUsername = async (username: string) => {
  const query = 'SELECT * FROM userlist where username = ?';
  const user = await db.run_query(query,  [username] );
  return user;
}

export const  updateUser= async(user:any,id:any)  =>{  

  //console.log("user " , user)
 // console.log("id ",id)
  let keys = Object.keys(user)
  let values = Object.values(user)  
  let updateString=""
  for(let i: number = 0; i<values.length;i++){updateString+=keys[i]+"="+"'"+values[i]+"'"+"," }
 updateString= updateString.slice(0, -1)
 // console.log("updateString ", updateString)
  let query = `UPDATE userlist SET ${updateString} WHERE ID=${id} RETURNING *;`
  try{
   await db.run_query(query, values)  
    return {"status": 201}
  } catch(error) {
    return error
  }
}

export const deleteByUserId = async (id:any) => {
  let query = "Delete FROM userlist WHERE ID = ?"
  let values = [id]
  try{
    await db.run_query(query, values);  
    return { "affectedRows":1 }
  } catch(error) {
    return error
  }
}
