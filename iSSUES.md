Dec 27, 2022

<!-- I've created a Card class then extended this class for Attacks and Defenses. What about cards that deal damage and then get defense at same time? -->
            (Fix Dec 30 - placed these into attributes object within card constructor)
I've placed all the created cards into a single array to loop over to create a deck. Is there an easier way to group them to be looped?

Dec 31
- When creating cards, I want to reference the card drawn to display their description (which changes with each card). Trouble referencing the attributes prop within the card using THIS, it references Window instead. Need to fix
<!-- - Mousedown event and differentiate it between a drag event.  -->
<!-- - Successfully able to reset the card's position based on its inital X Y, but the eventlistener for the body remains -->
        (Fixed Jan 06 - see below)

Jan 02 
- Function AssignHPListener() doesn't work to change the style of the progress bar
<!-- - Getting TypeError: cannot read properties of undefined (reading: id) when modifying the enemy HPs. Unsure why? -->
        (Fixed Jan 03 - Changed from a For loop to a For Each applied onto EnemyArray. I'm honestly not sure why this fixed the problem)
- When DiscardUsedCard() is called, the correct HTML element is removed. However since I'm using 'splice' and finding the first valid index, it'll remove the wrong array index typically

Jan 05 
<!-- - Still working on mousedrag. Successfully removed event listener for the card following the cursor on mouseup. -->
        (Fixed Jan 06 - successful release on drag, attached the listener to body instead)
<!-- - Trying to reset the card to its initial position on mouseup, however the mousemove listener is being run and its value is being considered, sending the element erroneously. -->
        (Fixed Jan 06 - needed to reset initial X Y to 0, not to equal the values. The latter adds these values to left/right, which is why it was not working as intended)

Jan 07 
- Enemy.takeDamage() does not update the HTML element properly.

Jan 10
- When using 'block' first, the next move will always be BLOCK even if it's not. This bug doesn't exist for attack, then block. However this works if played from 0 -> 5 index, not descending?
- Also if enemy dies with an attack, the card is removed from hand but the HTML element remains
