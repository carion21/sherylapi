const { Sequelize } = require("sequelize");
const QueryTypes = Sequelize.QueryTypes;


class Stock {

    static tableName = 'sh_srv05_stocks';

    constructor(info) {
        this.uuid = info.uuid;
        this.reference = info.reference;
        this.unit_price = info.unit_price;
        this.quantity = info.quantity;
        this.description = info.description;
        this.article_id = info.article_id;
        this.etat = info.etat;
        this.status_id = info.status_id;
        this.created_at = info.created_at;
        this.updated_at = info.updated_at;
    }

    static format_result(result) {
        let stocks = []
        result.forEach(r => {
            stocks.push(new Stock(r))
        })
        return stocks
    }

    static async getAll() {
        let results = await global.sequelize.query(
            `SELECT * FROM ${Stock.tableName}`,
            {
                type: QueryTypes.SELECT
            }
        )

        return Stock.format_result(results)
    }

    static async getByOneColumn(where) {
        let results = await global.sequelize.query(
            `
                SELECT * FROM ${Stock.tableName} 
                WHERE ${where.column} = '${where.value}'
            `,
            {
                type: QueryTypes.SELECT
            }
        )

        return Stock.format_result(results)
    }

    static async getByManyColumns(where) {
        let query = `SELECT * FROM ${Stock.tableName} WHERE `
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

        return Stock.format_result(results)
    }

}

module.exports = Stock