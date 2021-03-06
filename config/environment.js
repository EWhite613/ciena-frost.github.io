/* jshint node: true */

var routingConfig = require('./routing')

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'frost-guide',
    podModulePrefix: 'frost-guide/pods',
    environment: environment,
    baseURL: '/frost-guide',
    locationType: 'hash',
    isFrostGuideDirectory: true,
    mirageNamespace: 'https://localhost:4200',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      routingConfig: routingConfig
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self'",
      'font-src': "'self'",
      'connect-src': "'self'",
      'img-src': "'self'",
      'style-src': "'self'",
      'media-src': "'self'",
      'child-src': 'https://bitbucket.ciena.com https://confluence.ciena.com'
    }
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/'
    ENV.locationType = 'none'

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_VIEW_LOOKUPS = false

    ENV.APP.rootElement = '#ember-testing'
  }

  if (environment === 'production') {
    ENV.baseURL = '/'
    ENV['ember-cli-mirage'] = {
      enabled: true
    }
    ENV.mirageNamespace = 'https://ciena-frost.github.io'
    ENV.isProd = true
    ENV.isDemo = true
  }

  if (environment === 'internal') {
    ENV.baseURL = '/'
    ENV['ember-cli-mirage'] = {
      enabled: true
    }
    ENV.isProd = true
    ENV.isDemo = true
  }

  return ENV
}
