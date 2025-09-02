import jwt from "jsonwebtoken";

const generatetoken = (farmerId) => {
     return jwt.sign({id : farmerId}, process.env.JWT_SECRET, {
         expiresIn : "6d",
     });
};


export default  generatetoken;

