const Snowflake = require('vue-snowflake');
const node = new Snowflake.init(1,1,0)

module.exports = () => node.createID()
