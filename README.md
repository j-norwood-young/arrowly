# Arrowly
## Point at stuff

Arrowly lets you upload an image, and point arrows at it. You can go back to your image at any time by going to the URL or inputing a code. 

It is currently in early development phase. You can upload a pic, draw a single arrow, add a line of text to the arrow. It saves the original picture on upload and retrieves it using the code or location hash. 

### It still needs
* Better-looking arrows
* Multiple arrows
* Saving of arrows
* Changing colours
* Changing arrowhead styles
* Changing line widths/styles
* Better font placement if near an edge

The front end is built with Brunch and the back end runs on NodeJS with a MongoDB database. To run install, `npm install`.

To run (assuming you have Mongo, Node and Brunch) run the API with `npm server.js` and the Brunch with `brunch w --server`.