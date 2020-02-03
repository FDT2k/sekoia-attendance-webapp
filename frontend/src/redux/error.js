export default class APIError extends Error {

   constructor(message,code) {
       super(message);
       this.name = this.constructor.name;
       this.message = message;
       this.error_code = code;
   }
}
