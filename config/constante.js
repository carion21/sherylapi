const PORT_SYSTEM = 8000
const APP_NAME = "SherylApi"
const APP_AUTHOR = "Michael MEDI"
const ORDER_TEMP_IN_MIN = 30

const moment = require('moment')
moment.locale("fr");
const { Op, QueryTypes } = require("sequelize");

const {
    cryptWithBcrypt,
    crypt
} = require('./hashub');

const { v4: uuidv4 } = require('uuid');

require('dotenv').config()
const Sequelize = require('sequelize')


//const MODE = "dev"
//const MODE = "prod"

class Constante {

    constructor() {

    }

    static getPort() {
        return PORT_SYSTEM
    }

    static getEnvnow(req) {
        return req.app.settings.env
    }

    static getAppName() {
        return APP_NAME
    }

    static getOrderTemp() {
        return ORDER_TEMP_IN_MIN
    }

    static getMoment() {
        return moment
    }

    static getSequelizeObject() {
        const sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                dialect: "mysql",
                pool: {
                    max: parseInt(process.env.DB_POOL_MAX),
                    min: parseInt(process.env.DB_POOL_MIN),
                    idle: parseInt(process.env.DB_POOL_IDLE)
                }
            }
        )
        return sequelize
    }

    static getOp() {
        return Op
    }

    static getListeMois() {
        return mois
    }

    static getHashemail(email) {
        //return crypt(email)
        return email
    }

    static getHashphone(telephone) {
        //return crypt(telephone)
        return telephone
    }

    static getHashpass(motdepasse) {
        return cryptWithBcrypt(motdepasse)
    }

    static genUuid() {
        return uuidv4()
    }

    static genCode(mot) {
        let min = 10000000000
        let max = 99999999900
        let text = mot + "-"
        min = Math.ceil(min);
        max = Math.floor(max);
        let nb = Math.floor(Math.random() * (max - min + 1)) + min
        let code = text + nb + Date.now()
        code = crypt(code)
        return code
    }

    static isInt(variable) {
        if (!Number.isNaN(Number.parseInt(variable))) {
            return true
        } else {
            return false
        }
    }

    static isFloat(variable) {
        if (!Number.isNaN(Number.parseFloat(variable))) {
            return true
        } else {
            return false
        }
    }

    /**
     * 
     * @param {*} str 
     * @returns 
     */
    static removeExtraSpace(str) {
        //str = str.replace(/[\s]{1,}/g, ""); // Enlève les espaces doubles, triples, etc.
        str = str.replace(/^[\s]{1,}/, ""); // Enlève les espaces au début
        str = str.replace(/[\s]{1,}$/, ""); // Enlève les espaces à la fin
        return str;
    }

    static cleanBlank(str) {
        return String(str).split(' ').join('') || "NA"
    }

    /* static formatDate(str) {
        console.log(str);
        let ndate = new Date(str)
        return moment(ndate).format('YYYY-MM-DD')
    } */

    static formatDate(str) {
        return moment(str, 'DD/MM/YYYY').format('YYYY-MM-DD')
    }

    static get_date_now() {
        return moment().format('YYYY-MM-DD HH:mm:ss')
    }



}

module.exports = Constante