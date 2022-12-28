Hello! Trying to build a card-game as one of my first large-scale software projects. 

Content will be taken from Avatar the Last Airbender and used as the basis for the game's mechanics. 

This project includes copyrighted material for which I do not hold the copyright. I am using this material solely for personal use and I do not intend to sell or profit from its use in any way. All rights to this material belong to the original copyright holder.

Project start Dec 25, 2022 (I don't know how to format .md docs)
- Project init, doing some research I'm worried about how to implement this. I need to possibly learn HTML canvas which had not been covered in really any courses. Should be fine!
- If I want to display the final result on my portfolio website, how would that look? I know I need to run a web server but back-end is still an enigma to me.

Dec 26 2022
- Made simple dice sprites but need to figure out how to implement dice rolling functionality, build mana system. 
- Switched over to plain JS, figured using a library may be ambitious when I need to develop something using plain JS first! No problem.
GOOD
- Sprites I made are loaded nicely and the rolling works, need to assign actual values to the elements as opposed to merely an image

BAD
- Need to reset the stored elements when rolled, or else the animation plays and the original elements are still there
- I also pushed some changes to my repo, then suddenly node index.js wasn't working? It was running fine before? Had to install jsdom
- (UPDATE) I'm an idiot, was node running the wrong file (index.js instead of server.js which served the file)

Dec 27 2022
- Started by updating the dice roll to include three at once and show a bit of an animation. Added a sound effect. 
- Something I realized is that I naturally take a FP (Functional Programming) approach vs an OOP (Object-Oriented Approach), its what makes sense to me at this time
- Added a delay to the rolls so that they populate their areas more 'naturally', unsure if this will be kept
- Added BG, need to fix the CSS. I feel like I forget how to write CSS everytime
- Look into AutoBundlers. Was recommended not to include script tags in my HTML file. Maybe NextJS? Or learn Webpack.
- I Keep running into issues with 'import' and 'export'. Should I learn proper nodeJS syntax or download Babel? 
GOOD
- Continued work on everything, nothing special in particular. 

BAD
- Realized that I may need to add more complexity. Neutral dice should be added? Or have basic moves that take any element? 
- Or simplify the ENTIRE thing? Maybe just make a Zuko-based game just so I can have focus and deliver a working product?