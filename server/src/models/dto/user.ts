

export const UserDTO = async (user: any) => {
    let isValid = true;
    const atributtes = ['name', 'lastName', 'phone', 'email', 'password'];
    atributtes.forEach((attr) => {
        if (!user[attr]) {
            isValid = false;
        }
    });
    return isValid;
}