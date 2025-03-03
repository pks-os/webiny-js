const base = require("../../jest.config.base");
const { getElasticsearchIndexPrefix } = require("@webiny/api-elasticsearch");

const prefix = getElasticsearchIndexPrefix();
process.env.ELASTIC_SEARCH_INDEX_PREFIX = `${prefix}api-page-builder-`;

module.exports = { ...base({ path: __dirname }) };
