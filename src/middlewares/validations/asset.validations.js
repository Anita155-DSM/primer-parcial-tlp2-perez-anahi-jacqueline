import { UserModel } from "../../models/mongoose/user.model.js";
import { CategoryModel } from "../../models/mongoose/category.model.js";
import { body } from "express-validator";
import mongoose from "mongoose";

export const createAssetValidation = [
  // TODO: completar las validaciones para crear un recurso
  body('inventoryNumber')
    .notEmpty(),
  body('description')
    .notEmpty(),
  body('brand')
    .notEmpty()
    .isLength({ min: 2, max: 100 })
    .withMessage("El modelo debe tener entre 2 y 100 caracteres"),
  body('model')
    .notEmpty()
    .isLength({ min: 2, max: 100 })
    .withMessage("El modelo debe tener entre 2 y 100 caracteres"),
  body('status')
    .notEmpty()
    .isIn(['good', 'regular', 'bad', 'out_of_service']),
  body('acquisitionDate')
    .optional()
    .isDate()
    .withMessage("La fecha no es valida"),    
  body('acquisitionValue')
    .notEmpty()
    .withMessage("El valor de adquisición es obligatorio")
    .isFloat({ min: 0.01 }) //esto dice que debe ser positivo
    .withMessage("El valor de adquisición debe ser un número positivo"),
  body('responsible')
    .notEmpty()
    .withMessage("El responsable es obligatorio")
    .isMongoId()
    .withMessage("El ID del responsable debe ser un ObjectId válido")
    .custom(async (value) => {
      const user = await UserModel.findOne({ //busca en el modelo de user
        _id: value, 
        deletedAt: null //qu4e este vigente esto pensado desde eliminacion logica
      });
      if (!user) { //si no existe
        throw new Error("El responsable debe existir y estar activo");
      }
      return true;
    }),
  body('categories')
    .isArray({ min: 1 })
    .withMessage("Debe proporcionar al menos una categoría")
];
/*
● inventory_number: formato específico, único, obligatorio
● description: 10-500 caracteres, obligatorio
● brand y model: 2-100 caracteres, obligatorio
● status: valores permitidos ('good', 'regular', 'bad', 'out_of_service')
● acquisition_date: fecha válida, no futura, obligatorio
● acquisition_value: número positivo, obligatorio
● responsible_id: debe existir y ser funcionario activo
● categories: array de IDs válidos de categorías existentes
*/