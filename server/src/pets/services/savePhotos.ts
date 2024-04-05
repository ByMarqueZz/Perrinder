import * as fs from 'fs'
import * as path from 'path'
import { Pet } from '../entities/pet.entity'

export default async function savePhotos(photo: any, pet: Pet):Promise<string> {
    console.log(photo)
    return photo
}