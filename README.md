### TO DO

1.

### Project Overview Structure

1. Please use only hook file to pass data instead of useContext or other API</br>
   Hook file should receive data from redux
2. Component folder src should contains components that are basic and can use anywhere in the project</br>
   If you want your page related components,, please write it in your folder's
3. Only if you are getting cors related errors, use proxy keyword in package.json, in other case,
   just called it directly or setup proxy middleware
4. Don't forget to .gitignore all .env related folders, devlopment related folders, build related folders
5. Use Config folder instead of .env for frontend which is more simpler
6. Currently it only support for js file, but you can still write jsx syntax, and if you want to <br/>use jsx file, add it in webpack.config.js
7. Use lazy loading as possible to smaller bundle size

### Tips

1. if your opertaing system is window, change production script as

```
"prod" : "webpack --mode production && copy assets\\con_cc.svg build\\icon.svg"
```
