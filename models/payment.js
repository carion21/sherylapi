const { Sequelize } = require("sequelize");
const QueryTypes = Sequelize.QueryTypes;


class Payment {

    static tableName = 'sh_srv05_payments';

    constructor(info) {
        this.uuid = info.uuid;
        this.reference = info.reference;
        this.fidelux_card_reference = info.fidelux_card_reference;
        this.coupon = info.coupon;
        this.amount_net = info.amount_net;
        this.amount_reduction = info.amount_reduction;
        this.amount_rate = info.amount_rate;
        this.amount_ttc = info.amount_ttc;
        this.order_id = info.order_id;
        this.etat = info.etat;
        this.status_id = info.status_id;
        this.created_at = info.created_at;
        this.updated_at = info.updated_at;
    }

    static format_result(result) {
        let payments = []
        result.forEach(r => {
            payments.push(new Payment(r))
        })
        return payments
    }

    static async getAll() {
        let results = await global.sequelize.query(
            `SELECT * FROM ${Payment.tableName}`,
            {
                type: QueryTypes.SELECT
            }
        )

        return Payment.format_result(results)
    }

    static async getByOneColumn(where) {
        let results = await global.sequelize.query(
            `
                SELECT * FROM ${Payment.tableName} 
                WHERE ${where.column} = '${where.value}'
            `,
            {
                type: QueryTypes.SELECT
            }
        )

        return Payment.format_result(results)
    }

    static async getByManyColumns(where) {
        let query = `SELECT * FROM ${Payment.tableName} WHERE `
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

        return Payment.format_result(results)
    }

}

module.exports = Payment