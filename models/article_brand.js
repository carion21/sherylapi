const { Sequelize } = require("sequelize");
const QueryTypes = Sequelize.QueryTypes;


class ArticleBrand {

    static tableName = 'sh_srv05_article_brands';

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
        let articleBrands = []
        result.forEach(r => {
            articleBrands.push(new ArticleBrand(r))
        })
        return articleBrands
    }

    static async getAll() {
        let results = await global.sequelize.query(
            `SELECT * FROM ${ArticleBrand.tableName}`,
            {
                type: QueryTypes.SELECT
            }
        )

        return ArticleBrand.format_result(results)
    }

    static async getByOneColumn(where) {
        let results = await global.sequelize.query(
            `
                SELECT * FROM ${ArticleBrand.tableName} 
                WHERE ${where.column} = '${where.value}'
            `,
            {
                type: QueryTypes.SELECT
            }
        )

        return format_result(results)
    }

    static async getByManyColumns(where) {
        let query = `SELECT * FROM ${ArticleBrand.tableName} WHERE `
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

        return format_result(results)
    }

}

module.exports = ArticleBrand