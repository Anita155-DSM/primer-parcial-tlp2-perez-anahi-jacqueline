import { CategoryModel } from "../models/mongoose/category.model.js";

export const createCategory = async (req, res) => {
  try {
    // TODO: crear category (solo admin)
    const { name, description } = req.body;
    const categoryExisting = await CategoryModel.findOne({ name });
    if (categoryExisting) {
      return res.status(400).json({ msg: "La categoría ya existe" });
    }
    const newCategory = await CategoryModel.create({
      name,
      description
    });
    return res.status(201).json({ msg: "Categoría creada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (_req, res) => {
  try {
    // TODO: listar categories con sus assets (populate inverso) (solo admin)
    const categories = await CategoryModel.find({ deletedAt: null }).populate('assets');
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    // TODO: eliminar category (solo admin) y actualizar assets que referencian
    const existingCategory = await CategoryModel.findById(req.params.id);
    if (!existingCategory) {
      return res.status(404).json({ msg: "La categoría no existe" });
    }
    //eliminación lógica
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() }, //se lo considera algo asi como eliminado y se pone su fecha
      { new: true }
    );
    return res.status(204).json({ msg: "Categoría eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
