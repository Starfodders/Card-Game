
Using Destroy(), reference the card being used and add it to the destroy pile. This will be added back into the deck later and shuffled.

Look into Next.JS to replace Express.JS as it includes bundling.

Create new HTML elements using string template literals, match the card drawn

Now working on the HTML card elements

Right now, deck has a .useCard() method that successfully moves it into discard pile. However this doesn't mutate original hand array.
Need to add event listeners to detect which card is being used, locate it and remove it from hand array to add to discard.