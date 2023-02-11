const { Sequelize } = require("sequelize");
const QueryTypes = Sequelize.QueryTypes;


class ArticleSale {

    static tableName = 'sh_srv05_article_sales';

    constructor(info) {
        this.uuid = info.uuid;
        this.reference = info.reference;
        this.unit_price = info.unit_price;
        this.quantity = info.quantity;
        this.date_start = info.date_start;
        this.date_end = info.date_end;
        this.stock_id = info.stock_id;
        this.etat = info.etat;
        this.status_id = info.status_id;
        this.created_at = info.created_at;
        this.updated_at = info.updated_at;
    }

    static format_result(result) {
        let articleSales = []
        result.forEach(r => {
            articleSales.push(new ArticleSale(r))
        })
        return articleSales
    }

    static async getAll() {
        let results = await global.sequelize.query(
            `SELECT * FROM ${ArticleSale.tableName}`,
            {
                type: QueryTypes.SELECT
            }
        )

        return ArticleSale.format_result(results)
    }

    static async getByOneColumn(where) {
        let results = await global.sequelize.query(
            `
                SELECT * FROM ${ArticleSale.tableName} 
                WHERE ${where.column} = '${where.value}'
            `,
            {
                type: QueryTypes.SELECT
            }
        )

        return ArticleSale.format_result(results)
    }

    static async getByManyColumns(where) {
        let query = `SELECT * FROM ${ArticleSale.tableName} WHERE `
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

        return ArticleSale.format_result(results)
    }

}

module.exports = ArticleSale