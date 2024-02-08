import { Router } from "express";
import {UserDTO} from "../dto/user";
import { getUsers, addUser, getUser, updateUser, deleteUser } from "../controllers/userController";
const router = Router();

router.get('/', getUsers);
router.post('/', addUser)
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;