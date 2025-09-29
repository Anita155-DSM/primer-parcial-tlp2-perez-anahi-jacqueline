import { UserModel } from "../models/mongoose/user.model.js";
export const register = async (req, res) => {
  try {
    const { name, email, password, profile } = req.body;
    const newUser = await UserModel.create({
      name,
      email,
      password,
      profile
    });
    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente
    const profile = await UserModel.findById(req.user._id).populate('profile');
    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
