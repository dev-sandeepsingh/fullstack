require('dotenv').config; // eslint-disable-line no-unused-expressions
const highlightSql = require('sequelize-log-syntax-colors');
const { format } = require('sql-formatter');
const { Op } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const DOCKER_TEST_DATABASE_URL =
  'postgres://postgres:ucreate@localhost:5436/nodejs_boilerplate_test';

const operatorsAliases = Op; // https://github.com/sequelize/sequelize/issues/8417#issuecomment-355123149

const config = {
  development: {
    url: process.env.DATABASE_URL,
    sync: false,
    logging: text => console.log(highlightSql(format(text))), // eslint-disable-line no-console,
    ssl: false,
    dialectOptions: {
      ssl: false,
    },
    rollbarAccessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    reportErrorRequest: true,
  },
  test: {
    url: DOCKER_TEST_DATABASE_URL,
    sync: process.env.SYNC_DATABASE || false,
    logging: false,
    operatorsAliases,
    ssl: false,
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    sync: false,
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
    rollbarAccessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    reportErrorRequest: true,
  },
};

module.exports = config;
module.exports.config = config[env];
