import usersModel from "../models/users.models.js";

const getUsersAll = async () => {
  return await usersModel.find();
};

const getUserById = async (id) => {
  return await usersModel.findOne({ _id: id}); 
};

const deleteUser = (id) => {
  return users.filter((user) => user.id !== id);
};


export default { getUsersAll, getUserById, deleteUser };
