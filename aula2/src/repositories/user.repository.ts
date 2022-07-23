import db from "../db";
import User from "../models/user.model";
import DatabaseError from "../models/errors/database.error.model";

class UserRepository {
    //get tudo
    async findAllUsers(): Promise<User[]>{
        const query = `
            SELECT uid, username
            FROM app_user
        `;

        const {rows} = await db.query<User>(query);

        return rows || []
    }

    // get por id
    async findById(uid: string): Promise<User>{
        try {
            const query = `
                SELECT uid, username
                FROM app_user WHERE uid = $1 
            `;

            const values = [uid]
            const {rows} = await db.query<User>(query, values);
            const [user] = rows

            return user
        } catch (error) {
            console.log(error);
            throw new DatabaseError('Erro na Consulta por ID', error);
        }
    }

    //post ou criando usuário
    async create(user: User): Promise<string> {
        const script = `
            INSERT INTO app_user(
                username, password
            )
            VALUES($1, crypt($2, 'my_pass'))
            RETURNING uid
        `;

        const values = [user.username, user.password]
        const {rows} = await db.query<{uid: string}>(script, values)
        const [newUser] = rows

        return newUser.uid;
    }

    //put atualizando dados
    async update(user: User): Promise<void> {
        const script = `
        UPDATE 
            app_user
        SET 
            username = $1,
            password = crypt($2, 'my_pass')
        WHERE uid = $3`;

        const values = [user.username, user.password, user.uid];
        await db.query(script, values)
    }

    //delete elimidas apenas o usuário determinado pelo uid
    async remove(uid: string): Promise<void> {
        const script = `DELETE FROM app_user WHERE uid = $1`

        const values = [uid]
        await db.query(script, values)
    }
}

export default new UserRepository()