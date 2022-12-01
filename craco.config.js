const path = require('path')

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    babel: {
        plugins: [['import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css'
        }]]
    }
}