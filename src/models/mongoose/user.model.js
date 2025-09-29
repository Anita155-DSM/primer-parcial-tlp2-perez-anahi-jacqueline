import { model, Schema } from "mongoose";

// TODO: completar relacion embebida y configurar el virtuals para el populate inverso con assets

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { //solamente lo ordeno porque me confundo sino
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: {
      type: String,
      enum: ["secretary", "administrator"],
      default: "secretary",
    },
    deletedAt: { type: Date, default: null },
    //modelo embebido
    profile: {
      employee_number: {
        type: String,
        unique: true,
        required: true
      },
      first_name: { 
        type: String,
        required: true
      },
      last_name: { 
        type: String,
        required: true
      },
      phone: { 
        type: String
      }
  },
}, { 
    timestamps: true 
});

// ! FALTA COMPLETAR ACA
//relaciones
UserSchema.virtual('assets',{
    ref: 'Asset',
    localField: '_id',
    foreignField: 'responsible'
})

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

export const UserModel = model("User", UserSchema);
