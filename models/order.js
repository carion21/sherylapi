const { Sequelize } = require("sequelize");
const QueryTypes = Sequelize.QueryTypes;


class Order {

    static tableName = 'sh_srv05_orders';

    constructor(info) {
        this.uuid = info.uuid;
        this.reference = info.reference;
        this.amount_ttc = info.amount_ttc;
        this.total_quantiy = info.total_quantiy;
        this.etat = info.etat;
        this.status_id = info.status_id;
        this.created_at = info.created_at;
        this.updated_at = info.updated_at;
    }

    static format_result(result) {
        let orders = []
        result.forEach(r => {
            orders.push(new Order(r))
        })
        return orders
    }

    static async getAll() {
        let results = await global.sequelize.query(
            `SELECT * FROM ${Order.tableName}`,
            {
                type: QueryTypes.SELECT
            }
        )

        return Order.format_result(results)
    }

    static async getByOneColumn(where) {
        let results = await global.sequelize.query(
            `
                SELECT * FROM ${Order.tableName} 
                WHERE ${where.column} = '${where.value}'
            `,
            {
                type: QueryTypes.SELECT
            }
        )

        return Order.format_result(results)
    }

    static async getByManyColumns(where) {
        let query = `SELECT * FROM ${Order.tableName} WHERE `
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

        return Order.format_result(results)
    }

}

module.exports = Order