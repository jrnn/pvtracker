import { Document, Model, model, Schema } from "mongoose"

export interface IAccount {
  email: string
  password?: string
  firstName: string
  lastName: string
  isAdmin?: boolean
  hasAccess?: boolean
}

export interface IAccountDocument extends Document, IAccount {
  createdAt: Date,
  updatedAt: Date,
  fullName(): string
}

const schema = new Schema({
  email: {
    type: String,
    required: [
      true,
      "Attribute `email` missing"
    ],
    lowercase: true,
    trim: true,
    validate: {
      validator: (email: string) => {
        const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9-]+(\.[a-z0-9]+)*(\.[a-z]{2,})$/
        return re.test(email
          .trim()
          .toLowerCase())
      },
      message: "Invalid email format"
    }
  },
  password: {
    type: String
  },
  firstName: {
    type: String,
    required: [
      true,
      "Attribute `firstName` missing"
    ],
    trim: true
  },
  lastName: {
    type: String,
    required: [
      true,
      "Attribute `lastName` missing"
    ],
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  hasAccess: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

schema.methods.fullName = function() {
  return `${this.firstName} ${this.lastName}`
}

schema.pre<IAccountDocument>("validate", async function(next) {
  await this.model("Account")
    .countDocuments({ email: this.email })
    .where({ _id: { $ne: this._id }})
    .then((count) => {
      if (count) {
        this.invalidate("email", "Email is already in use", this.email)
      }
    })

  next()
})

export const Account: Model<IAccountDocument> = model("Account", schema)
