const { Sequelize } = require("sequelize");
const QueryTypes = Sequelize.QueryTypes;


class DetailOrderTemp {

    static tableName = 'sh_srv05_detail_order_temps';

    constructor(info) {
        this.id = info.id;
        this.uuid = info.uuid;
        this.quantity = info.quantity;
        this.amount = info.amount;
        this.article_sale_id = info.article_sale_id;
        this.order_id = info.order_id;
        this.status_id = info.status_id;
        this.etat = info.etat;
        this.status_id = info.status_id;
        this.created_at = info.created_at;
        this.updated_at = info.updated_at;
    }

    static format_result(result) {
        let detailOrderTemps = []
        result.forEach(r => {
            detailOrderTemps.push(new DetailOrderTemp(r))
        })
        return detailOrderTemps
    }

    static async getAll() {
        let results = await global.sequelize.query(
            `SELECT * FROM ${DetailOrderTemp.tableName}`,
            {
                type: QueryTypes.SELECT
            }
        )

        return DetailOrderTemp.format_result(results)
    }

    static async getByOneColumn(where) {
        let results = await global.sequelize.query(
            `
                SELECT * FROM ${DetailOrderTemp.tableName} 
                WHERE ${where.column} = '${where.value}'
            `,
            {
                type: QueryTypes.SELECT
            }
        )

        return DetailOrderTemp.format_result(results)
    }

    static async getByManyColumns(where) {
        let query = `SELECT * FROM ${DetailOrderTemp.tableName} WHERE `
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

        return DetailOrderTemp.format_result(results)
    }

    static async create() {
        let results = await global.sequelize.query(
            `
                INSERT INTO ${DetailOrderTemp.tableName} (uuid, quantity, amount, article_sale_id, order_id, status_id, etat, created_at, updated_at)
                VALUES (?,?,?,?,?,?,?,?,?)
            `,
            {
                replacements: [
                    this.uuid,
                    this.quantity,
                    this.amount,
                    this.article_sale_id,
                    this.order_id,
                    this.status_id,
                    this.etat,
                    this.created_at,
                    this.updated_at
                ]
            }
        )

        return results
    }

    static async update() {
        let results = await global.sequelize.query(
            `
                UPDATE ${DetailOrderTemp.tableName}
                SET quantity = ?, amount = ?, article_sale_id = ?, order_id = ?, status_id = ?, etat = ?, updated_at = ?
                WHERE uuid = ?
            `,
            {
                replacements: [
                    this.quantity,
                    this.amount,
                    this.article_sale_id,
                    this.order_id,
                    this.status_id,
                    this.etat,
                    this.updated_at,
                    this.uuid
                ]
            }
        )

        return results
    }

    static async delete() {
        let results = await global.sequelize.query(
            `
                DELETE FROM ${DetailOrderTemp.tableName}
                WHERE uuid = ?
            `,
            {
                replacements: [
                    this.uuid
                ]
            }
        )

        return results
    }

}

module.exports = DetailOrderTemp