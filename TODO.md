
<!-- Using Destroy(), reference the card being used and add it to the destroy pile. This will be added back into the deck later and shuffled. -->
        (Added)

Look into Next.JS to replace Express.JS as it includes bundling.

<!-- Create new HTML elements using string template literals, match the card drawn -->
            (Fixed: will look for card within directory with matching name)

<!-- Right now, deck has a .useCard() method that successfully moves it into discard pile. However this doesn't mutate original hand array. -->
            (Fixed: added Discard function which is called after card is used)
            
<!-- Need to add event listeners to detect which card is being used, locate it and remove it from hand array to add to discard. -->
        (Fixed: added this feature)

Shrink card text based on its parent container

Change progress bar HP to different color, not working?

When a monster is destroyed, find a way to remove it from memory. Otherwise duplications in monsters will be troubling

Left updating monster HP elements upon receiving damage for now. I'll have to change later once I implement drag-drop selections.

<!-- Add effect for using tactic cards (i.e. adding armour) -->
        (Added)

Add appropriate enemy selector using mouse

When an enemy dies, decrement the enemy array

In order to create a discard animation, I need to still render an HTML element and apply animation onto it
Also want to add a red appearance to the slime when it dies

Add listener for card descriptions, when a buff is added then it will update the value