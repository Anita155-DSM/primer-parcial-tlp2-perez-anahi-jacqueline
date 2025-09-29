export const createCategoryValidation = [
  // TODO: completar las validaciones para crear una categoria
  body('name')
  .notEmpty()
  .isLength({min: 3, max: 100})
  .withMessage("El apellido debe tener entre 2 y 50 caracteres"),
  body('description')
  .opcional()
  .isLength({max: 500})
  .withMessage("el maximo es de 500 caracteres")
];
