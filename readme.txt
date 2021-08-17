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
"dev": "concurrently  \"npm run serve\" \"npm run start\"" add a script called dev in package.json
in terminal npm run-script dev

mongodb atlas cn be accessed in https://cloud.mongodb.com/
