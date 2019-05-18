/**
 * Define all custom errors in one place. The {@code Object.setPrototypeOf(...)} abracadabra is
 * needed to ensure that the prototype chain does not break when extending built-ins in TypeScript.
 */

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || "resource not found")
    this.name = "NotFoundError"
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
