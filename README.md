# website-wine-pair
This used JQuery libraries. 

The main issues I had were in the order I called them and which ones

I used The JQuery Ui-css first in the header

And in the body before closing I had JQuery min.js followed by JQuery-ui
The lower part of the list of scripts I had my /main.js which had the function of the autocomplete called

This all proved to be a simple issues of setup and order
It still needs to be fixed since when selecting an image we get the issues of all images being replaced by a single image from the database.