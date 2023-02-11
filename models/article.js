const { Sequelize } = require("sequelize");
const QueryTypes = Sequelize.QueryTypes;


class Article {

    static tableName = 'sh_srv05_articles';

    constructor(info) {
        this.id = info.id;
        this.uuid = info.uuid;
        this.reference = info.reference;
        this.label = info.label;
        this.description = info.description;
        this.picture = info.picture;
        this.pictures = info.pictures;
        this.color = info.color;
        this.category_id = info.category_id;
        this.article_model_id = info.article_model_id;
        this.article_brand_id = info.article_brand_id;
        this.etat = info.etat;
        this.status_id = info.status_id;
        this.created_at = info.created_at;
        this.updated_at = info.updated_at;
        this.article_gender_id = info.article_gender_id;
        this.article_type_id = info.article_type_id;
    }

    static format_result(result) {
        let articles = []
        result.forEach(r => {
            articles.push(new Article(r))
        })
        return articles
    }

    static async getAll() {
        let results = await global.sequelize.query(
            `SELECT * FROM ${Article.tableName}`,
            {
                type: QueryTypes.SELECT
            }
        )

        return Article.format_result(results)
    }

    static async getByOneColumn(where) {
        let results = await global.sequelize.query(
            `
                SELECT * FROM ${Article.tableName} 
                WHERE ${where.column} = '${where.value}'
            `,
            {
                type: QueryTypes.SELECT
            }
        )

        return Article.format_result(results)
    }

    static async getByManyColumns(where) {
        let query = `SELECT * FROM ${Article.tableName} WHERE `
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

        return Article.format_result(results)
    }

}

module.exports = Article