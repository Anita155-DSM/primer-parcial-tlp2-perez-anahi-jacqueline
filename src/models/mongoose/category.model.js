import { Schema, model } from "mongoose";

// TODO: configurar el virtuals para el populate inverso con assets

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    description: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

// ! FALTA COMPLETAR ACA
//populate reverso
CategorySchema.virtual('assets',{
    ref: 'Asset',
    localField: '_id',
    foreignField: 'responsible'
})

CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });

export const CategoryModel = model("Category", CategorySchema);
