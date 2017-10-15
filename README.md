# MangaReader
Functional specification   

Normally a functional specification should contain (at the very least) a series of screen and beneath those screens a list of the functionality included on that page.     
I’ll make those in a bit. 

Step 1

* Users should be able to select a folder and open the images in the reader
* Users should be able to move between the opened images
  * By clicking on the page
  * By clicking on the arrows at the edges of the window
  * By using the keyboard arrow keys


- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](http://electron.atom.io/docs/tutorial/quick-start).

## To Use

```bash
# Install dependencies
npm install
# Run the app
npm start
```