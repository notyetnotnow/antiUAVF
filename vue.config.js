const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css:{
    loaderOptions:{
      module:{
        rules: [
          {
            test: /\.css$/,
            oneOf: [
              // this matches `<style module>`
              {
                resourceQuery: /module/,
                use: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      localIdentName: '[local]_[hash:base64:5]'
                    }
                  }
                ]
              },
              // this matches plain `<style>` or `<style scoped>`
              {
                use: [
                  'vue-style-loader',
                  'css-loader'
                ]
              }
            ]
          }
        ]
      }
    }
  }
})

