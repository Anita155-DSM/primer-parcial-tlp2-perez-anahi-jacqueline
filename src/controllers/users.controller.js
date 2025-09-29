import { AssetModel } from "../models/mongoose/asset.model.js";
import { CategoryModel } from "../models/mongoose/category.model";
import { UserModel } from "../models/mongoose/user.model.js";
export const getAllUsers = async (_req, res) => {
  try {
    // TODO: devolver usuarios con profile y sus assets con sus categories (populate) (solo admin)
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // TODO: eliminación lógica (deletedAt) (solo admin)
    const existingUser = await UserModel.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }
    //eliminación lógica
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() }, //se lo considera algo asi como eliminado y se pone su fecha
      { new: true }
    );
    return res.status(204).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
