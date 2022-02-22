const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@actions': 'src/store/actions',
    '@reducers': 'src/store/reducers',
    '@sagas': 'src/store/sagas',
    '@constans': 'src/store/constans',
  })(config);

  return config;
};
