
const STATUS_CODE = {
   OK: 200,
   CREATED: 201,
   NO_CONTENT: 204,
   BAD_REQUEST: 400,
   UNAUTHORIZED: 401,
   FORBIDDEN: 403,
   NOT_FOUND: 404,
   CONFLICT: 409,
   INTERNAL_SERVER_ERROR: 500,
 };
 

export const errorHandiling=(err ,req,res,next)=>{

    const statusCode =res.statusCode===STATUS_CODE.OK ?
     STATUS_CODE.INTERNAL_SERVER_ERROR:
     res.statusCode;

     res.status(statusCode);
     res.send({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
     })


}

