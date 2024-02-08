import { getDB } from "../database";
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { UserDTO } from "../dto/user";

export async function getUsers(req: Request, res: Response) {
    const db = getDB();
    const users = await db.collection('users').find().toArray();
    res.json(users);
}

export async function addUser(req: Request, res: Response) {
    const db = getDB();
    const user = req.body;
    const isValid = await UserDTO(user);
    if (!isValid) {
        res.status(400).json({
            message: 'Invalid data'
        });
        return;
    }
    await db.collection('users').insertOne(user);
    res.json(user);
}

export async function getUser(req: Request, res: Response) {
    const db = getDB();
    const { id } = req.params;
    const user = await db.collection('users').findOne({ _id: new ObjectId(id)});
    res.json(user);
}

export async function updateUser(req: Request, res: Response) {
    const db = getDB();
    const { id } = req.params;
    const user = req.body;
    await db.collection('users').updateOne({
        _id: new ObjectId(id)
    }, {
        $set: user
    });
    res.json({
        message: 'User updated'
    });
}

export async function deleteUser(req: Request, res: Response) {
    const db = getDB();
    const { id } = req.params;
    await db.collection('users').deleteOne({ _id: new ObjectId(id)});
    res.json({
        message: 'User deleted'
    });
}