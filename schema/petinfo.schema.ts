export const petinfo = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/petinfo",
  "title": "Petinfo",
  "description": "The pet information in the blog",
  "type": "object",
  "properties": {
    "petname": {
      "description": "The name of the pet",
      "type": "string"
    },
    "petsummary": {
      "description": "Body text of the pet information",
      "type": "string"
    },
    "imageURL": {
      "description": "URL for show the pet image",
      "type": "uri"
    },
    "authorid": {
      "description": "User ID of the petinfo author",
      "type": "integer",
      "minimum": 0
    },
    "description": {
      "description": "description of pet in more details",
      "type": "string"  
    }        
  },
  "required": ["petname", "petsummary", "authorid"]
}