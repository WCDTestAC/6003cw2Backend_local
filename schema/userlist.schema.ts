export const userlist = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/userlist",
  "title": "Userlist",
  "description": "A User/Staff in the system",
  "type": "object",
  "properties": {
    "username": {
      "description": "Username of Canine Shelter account",
      "type": "string"
    },
    "email": {
      "description": "email of User",
      "type": "string"
    },
    "password": {
      "description": "email of User",
      "type": "password"
    },
    "role": {
      "description": "role of User",
      "type": "string"
    },
    
  },
  "required": ["username", "password"]
}