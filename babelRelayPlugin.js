const getBabelRelayPlugin = require('babel-relay-plugin');

const schemaData = require('./data/schema.json').data;

const plugin = getBabelRelayPlugin(schemaData);

module.exports = plugin;