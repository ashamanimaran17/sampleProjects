npm init -y
npm i -S express mongoose concurrently
npm i -D webpack webpack-dev-middleware webpack-hot-middleware nodemon @babel/core @babel/cli @babel/node @babel/register @babel/preset-env @babel/preset-react
npm install react react-dom
npx webpack init
? Which of the following JS solutions do you want to use? ES6
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? Yes
? Do you want to add PWA support? No
? Which of the following CSS solutions do you want to use? SASS
? Will you be using CSS styles along with SASS in your project? Yes
? Will you be using PostCSS in your project? No
? Do you want to extract CSS for every file? No
? Do you like to install prettier to format generated configuration? Yes
[webpack-cli] ℹ INFO  Initialising project...

npm run serve

remove the index.html created by webpack and add yours 
<body>
    <div id="root"></div>
</body>
- note there is no reference to index.js

folder structure

package.json
webpack.config.js
index.html
client
 -index.js
server
 -index.js


in webpack change entry point entry: "./client/index.js",

npm run-script build - to get the dist folder
app.use(express.static(path.join(appRoot, "dist"))); to show "Hello world" from index.html!!!

to get sourcemap for debugging in chrome

 devtool: 'source-map',//add this
  devServer: {
    open: true,
    host: "localhost",
    contentBase: path.join(__dirname, '/dist/'),//add this
    inline: true,//add this
    writeToDisk: true//add this
  },

to run with node do this in sequence
npm run-script build
npm run start 

to add CSS
npm install -S classnames classnames-loader

add materail UI
npm install @material-ui/core --save
npm install typeface-roboto --save
npm install @material-ui/icons --save
In index.js
import "typeface-roboto";

to build both fronend and backend simultaneously
"dev": "concurrently  \"npm run watch\" \"npm run start\"" add a script called dev in package.json
in terminal npm run-script dev

mongodb atlas cn be accessed in https://cloud.mongodb.com/

npm install mongoose dotenv --save

to debug 
npm run start
add debug configuration attach to process

to resolve modules with shorter path, in .baberc add a config for module-resolver in plugin section
npm install --save-dev babel-plugin-module-resolver 

to implicity resolve .jsx file extensions in webpack.config.js
resolve: {
    extensions: ['','.js', '.jsx']
  },

add routing
npm install "react-router-dom" --save

to use withStyles
npm install @material-ui/styles --save

npm install moment --save

to enable eslint
npm install eslint -D
eslint does not support es6 syntax
so use
npm install babel-eslint -D
in eslint.rc
module.exports = {
  parser: "babel-eslint",
};
npm install --save prop-types

for api calls
npm install axios --save

npm install redux --save
npm install react-redux --save

npm install uuid --save


kill $(lsof -t -i:3000)
lsof -t -i:3000  -show only process id of a process running in port 3000

npm install react-bootstrap --save