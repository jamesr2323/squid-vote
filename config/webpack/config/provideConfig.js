const path = require('path')
const webpack = require('webpack')
const _ = require('lodash')
const fs=require('fs');

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      useState: ['react', 'useState'],
      useEffect: ['react', 'useEffect'],
      useContext: ['react', 'useContext'],
      useMemo: ['react', 'useMemo'],
      useRef: ['react', 'useRef'],
      ReactDOM: ['react-dom'],
      _: 'lodash',
      uuidv4: ['uuid', 'v4'],
      axios: 'axios'
   })
  ]
}