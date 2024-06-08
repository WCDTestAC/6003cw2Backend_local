import * as db from '../helpers/database';
 

export const getById = async (id: any) => {
  let query = 'SELECT * FROM petinfo WHERE ID = ?';
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
}

export const getAll = async  (limit=10, page=1, order:any, direction:any) =>{
  const offset = (page - 1) * limit;
  const query = "SELECT * FROM petinfo LIMIT  ? OFFSET  ?;";
  const data = await db.run_query(query, [limit, offset]);
  return data;
}

export const add = async(petinfo: any) => {
  let keys = Object.keys(petinfo);
  let values = Object.values(petinfo);
  let key = keys.join(',');
  let param = '';
  for(let i: number = 0; i<values.length; i++) {
    param += '? ,';
  }
  param=param.slice(0, -1);
  let query = `INSERT INTO petinfo (${key}) VALUES (${param})`;
  try {
    await db.run_insert(query, values);
    return {status: 201};
  } catch(err: any) {
    return err;
  }
}

export const  update= async(petinfo:any,id:any)  =>{  
    
  //console.log("petinfo " , petinfo)
 // console.log("id ",id)
  let keys = Object.keys(petinfo)
  let values = Object.values(petinfo)  
  let updateString=""
  for(let i: number = 0; i<values.length;i++){updateString+=keys[i]+"="+"'"+values[i]+"'"+"," }
 updateString= updateString.slice(0, -1)
 // console.log("updateString ", updateString)
  let query = `UPDATE petinfo SET ${updateString} WHERE ID=${id} RETURNING *;`
  try{
   await db.run_query(query, values)  
    return {"status": 201}
  } catch(error) {
    return error
  }
}

export const deleteById = async (id:any) => {
  let query = "Delete FROM petinfo WHERE ID = ?"
  let values = [id]
  try{
    await db.run_query(query, values);  
    return { "affectedRows":1 }
  } catch(error) {
    return error
  }
}