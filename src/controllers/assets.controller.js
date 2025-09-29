import { AssetModel } from "../models/mongoose/asset.model.js";
import { CategoryModel } from "../models/mongoose/category.model.js";

export const createAsset = async (req, res) => {
  try {
    // TODO: crear asset (usuario autenticado)
    const assetExisting = await AssetModel.findOne({ inventoryNumber });
    if (assetExisting) {
      return res.status(400).json({ msg: "El articulo ya existe" });
    }
    const newAsset = await AssetModel.create({
      inventoryNumber,
      description,
      brand,
      model,
      acquisitionDate,
      responsible,
      category
    })
    return res.status(201).json({ msg: "Asset creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllAssets = async (_req, res) => {
  try {
    const assets = await AssetModel.find({ deletedAt: null }).populate('User').populate('Category');
    // TODO: listar assets con el responsible y sus categories (populate) (solo admin)
    return res.status(200).json({ data: assets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyAssets = async (req, res) => {
  try {
    // TODO: assets con sus categories (populate) del usuario logueado (solo si el usuario logueado es responsible de assets)
    const existingAsset = await AssetModel.findById(req.params.id);
    if (!existingAsset) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }
    return res.status(200).json({ data: myAssets });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    // TODO: eliminar un asset (solo si el usuario logueado es el responsible del asset)
    //eliminación lógica
    const asset = await AssetModel.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() }, //se lo considera algo asi como eliminado y se pone su fecha
      { new: true }
    );
    //eliminacion en cascada
    
    return res.status(204).json({ msg: "Asset eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
