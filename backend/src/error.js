class APIError extends Error {

   constructor(message,code) {
       super(message);
       this.name = this.constructor.name;
       this.message = message;
       this.code = code;
   }
}


module.exports = {APIError}
