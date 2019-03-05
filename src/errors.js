export class ValidationError extends Error {
  constructor (msg, rules) {
    super(msg)
    Object.setPrototypeOf(this, ValidationError.prototype)
    this.name = this.constructor.name
    this.rules = rules || []
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError)
    }
  }
}
