Dec 27, 2022

<!-- I've created a Card class then extended this class for Attacks and Defenses. What about cards that deal damage and then get defense at same time? -->
            (Fix Dec 30 - placed these into attributes object within card constructor)
I've placed all the created cards into a single array to loop over to create a deck. Is there an easier way to group them to be looped?

Dec 31
- When creating cards, I want to reference the card drawn to display their description (which changes with each card). Trouble referencing the attributes prop within the card using THIS, it references Window instead. Need to fix
- Mousedown event and differentiate it between a drag event. 
- Successfully able to reset the card's position based on its inital X Y, but the eventlistener for the body remains

Jan 02 
- Function AssignHPListener() doesn't work to change the style of the progress bar
<!-- - Getting TypeError: cannot read properties of undefined (reading: id) when modifying the enemy HPs. Unsure why? -->
        (Fixed Jan 03 - Changed from a For loop to a For Each applied onto EnemyArray. I'm honestly not sure why this fixed the problem)
