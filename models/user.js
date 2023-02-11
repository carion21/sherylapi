const { Sequelize } = require("sequelize");
const QueryTypes = Sequelize.QueryTypes;


class User {

    static tableName = 'users';

    constructor(info) {
        this.id = info.id;
        this.first_name = info.first_name;
        this.last_name = info.last_name;
        this.email = info.email;
        this.password = info.password;
        this.etat = info.etat;
        this.created_at = info.created_at;
        this.updated_at = info.updated_at;
        this.etat = info.etat;
        this.status_id = 1;
        this.profil_id = 2;
    }

    static format_result(result) {
        let users = []
        result.forEach(r => {
            users.push(new User(r))
        })
        return users
    }

    static async getAll() {
        let results = await global.sequelize.query(
            `SELECT * FROM ${User.tableName}`,
            {
                type: QueryTypes.SELECT
            }
        )

        return User.format_result(results)
    }

    static async getByOneColumn(where) {
        let results = await global.sequelize.query(
            `
                SELECT * FROM ${User.tableName} 
                WHERE ${where.column} = '${where.value}'
            `,
            {
                type: QueryTypes.SELECT
            }
        )

        return User.format_result(results)
    }

    static async getByManyColumns(where) {
        let query = `SELECT * FROM ${User.tableName} WHERE `
        let whereClause = []

        where.forEach(w => {
            whereClause.push(`${w.column} = '${w.value}'`)
        })

        query += whereClause.join(' AND ')

        let results = await global.sequelize.query(
            query,
            {
                type: QueryTypes.SELECT
            }
        )

        return User.format_result(results)
    }

    async create() {
        let rtab = await global.sequelize.query(
            `
                INSERT INTO ${User.tableName} (first_name, last_name, email, password, etat, created_at, updated_at, status_id, profil_id)
                VALUES ('${this.first_name}', '${this.last_name}', '${this.email}', '${this.password}', '${this.etat}', '${this.created_at}', '${this.updated_at}', '${this.status_id}', '${this.profil_id}')
            `,
            {
                type: QueryTypes.INSERT
            }
        )

        return {
            id: rtab[0]
        }
    }

    static async update() {
        return await global.sequelize.query(
            `
                UPDATE ${User.tableName}
                SET first_name = '${this.first_name}', last_name = '${this.last_name}', email = '${this.email}', password = '${this.password}', etat = '${this.etat}', created_at = '${this.created_at}', updated_at = '${this.updated_at}', status_id = '${this.status_id}', profil_id = '${this.profil_id}'
                WHERE id = '${this.id}'
            `,
            {
                type: QueryTypes.UPDATE
            }
        )
    }
}

module.exports = User;