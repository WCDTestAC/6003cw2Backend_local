import * as db from '../helpers/database';

export const addFavpet = async (id:any, uid:any) =>{
 let query = `INSERT INTO petfavs (petid,userid) VALUES (${id},${uid}) ON CONFLICT ON CONSTRAINT  noduplicatepetfav DO NOTHING RETURNING userid;`   
 try{
 
   const result:any = await db.run_query(query, [id, uid]);  
       return {"status": 201, "affectedRows":1,"userid" :result[0].userid }
      } catch(error) {
        return error
      }
  
  }
  

export const deleteFavpet = async (id:any, uid:any) =>{
   let query = `DELETE FROM petfavs WHERE petid=${id} AND userid=${uid} ;`;
   try{
        await db.run_query(query, [id, uid]);  
    return { "affectedRows":1 }
  } catch(error) {
    return error
  }

}

export const listFavpet = async (id:any)=> {
  let query = "SELECT * FROM petfavs  WHERE userid=?";
   const result = await db.run_query(query, [id]);
  return result;
}

