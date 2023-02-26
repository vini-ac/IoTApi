require('dotenv').config();

//import util = require('util');

const configs = {
  base: {
    ENV: process.env.NODE_ENV,
    DESCRIPTION: process.env.APP_DESCRIPTION || 'Devices API',

    PREFIX: process.env.APP_PREFIX || 'v1',
    VERSION: process.env.APP_VERSION || '1.0',
    API_EXPLORER_PATH: process.env.APP_API_EXPLORER_PATH || '/',

    DEVICES_APP: {
      mongodb: process.env.APP_DEVICES_MONGODB,
      database: process.env.APP_DEVICES_MONGOBASE,
      collection: process.env.APP_DEVICES_MONGOCOLLECTION
    },
    MQTT_APP:{
      host: process.env.MQTT_HOST,
      port: process.env.MQTT_PORT,
      user: process.env.MQTT_USER,
      password: process.env.MQTT_PASSWORD
    }
  },
  development: {},
  production: {
    PORT: process.env.APP_PORT || 7071,
  },
  test: {
    PORT: 7072,
  },
}

const config = { ...configs.base };

export { config }