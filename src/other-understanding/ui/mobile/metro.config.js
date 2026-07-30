const { getDefaultConfig } = require('expo/metro-config');

/** mobile は UI 専用。core は watch しない。 */
const config = getDefaultConfig(__dirname);

module.exports = config;
