module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  env: {
    browser: true,
    node: true
  },
  plugins: [ 'react' ],
  rules: {
    'no-console': 'off',
    'comma-dangle': 'off',
    'no-unused-vars': ['error', { args: 'none' }],
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': ['off', { html: 'ignore', explicitSpread: 'ignore' }],
    'react/prop-types': 'off'
  }
};
