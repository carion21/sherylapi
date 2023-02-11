const { Sequelize } = require("sequelize");
const QueryTypes = Sequelize.QueryTypes;


class ArticleGender {

    static tableName = 'sh_srv05_article_genders'

    constructor(info) {
        this.uuid = info.uuid;
        this.label = info.label;
        this.description = info.description;
        this.etat = info.etat;
        this.status_id = info.status_id;
        this.created_at = info.created_at;
        this.updated_at = info.updated_at;
    }

    static format_result(result) {
        let articleGenders = []
        result.forEach(r => {
            articleGenders.push(new ArticleGender(r))
        })
        return articleGenders
    }

    static async getAll() {
        let results = await global.sequelize.query(
            `SELECT * FROM ${ArticleGender.tableName}`,
            {
                type: QueryTypes.SELECT
            }
        )

        return ArticleGender.format_result(results)
    }

    static async getByOneColumn(where) {
        let results = await global.sequelize.query(
            `
                SELECT * FROM ${ArticleGender.tableName} 
                WHERE ${where.column} = '${where.value}'
            `,
            {
                type: QueryTypes.SELECT
            }
        )

        return ArticleGender.format_result(results)
    }

    static async getByManyColumns(where) {
        let query = `SELECT * FROM ${ArticleGender.tableName} WHERE `
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

        return ArticleGender.format_result(results)
    }

}

module.exports = ArticleGender