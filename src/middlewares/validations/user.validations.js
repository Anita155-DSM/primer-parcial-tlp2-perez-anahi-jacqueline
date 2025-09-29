import { UserModel } from "../../models/mongoose/user.model";

export const createUserValidation = [
  // TODO: completar las validaciones para crear un usuario
  //user validaciones
  body("username")
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El nombre de usuario debe ser alfanumerico"),
  body("email")
    .isEmail()
    .withMessage("El email debe ser valido"),
  body("password")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una letra mayuscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe tener al menos una letra minuscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe tener al menos un numero entero"),
  body("role")
    .isIn(['secretary', 'administrador']) //solo permite que los valores dentro del array sean validos
    .withMessage("El rol permido es: secretario o admin"),
  //profile validaciones
  body('profile.employee_number')
    .notEmpty(),
  body("profile.first_name")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-z]+$/)
    .withMessage("El nombre solo puede contener letras"),
  body("profile.last_name")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),
  body("profile.phone")
    .opcional()
    .matches(/[0-9]/)
    .withMessage("El numero de teléfono solo puede contener numeros"),
  body('category')
  .notEmpty()
];
