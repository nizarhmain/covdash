const CracoLessPlugin = require("craco-less");

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#183545",
              "@border-radius-base": "10px",
              "@border-color-base": "#d9d9d9"
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};