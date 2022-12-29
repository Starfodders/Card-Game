
Scaling down, going to focus on simple card game around 1 deck for now. This is because I need to be reasonable with the time that I have.
System will be Slay the Spire heavily inspired. 

Main Character - Zuko, made a sprite for him but all it has is an idle animation.

System
- Draw phase, action phase, end turn
- Get Deck, draw next 5 cards
- 3 Energy at start of action phase which can be used to play cards
- Cards are a mix of neutral, element, character specific.
- Built up using classes and extended so that the cards can be used for other decks in the future
- Neutral involves basic attacks and defenses, tactics for card draw and manipulation
- Element specific are more powerful, apply effects. Same goes for character specific
- Aim to have 25% neutral, 50% element, 25% character ratio of cards to start
- Let's try to get a working deck in order before adding ability to add and discard cards from deck

Card Skeleton
- Energy Cost
- Card Art
- Card Name
- Element affix (if any)
- Card description which includes damage (if any), effects (if any)


Example Cards - Neutral
1. Strike (1 En, Deal 3 damage)
2. Block (1 En, Block 2 damage)

Example Cards - Fire Elemental
1. Flame Wave (2 En, Deal 2 Damage to all enemies)
2. Barrage (2 En, Deal 1 damage 5 times)
3. Burning Block (1 En, Block 1 damage and attackers take 1 damage)

Example Cards - Character (Zuko)
1. Track (1 En, draw 2 cards. Next turn draw 1 less card)
2. Dancing Blade (2 En, deal 2 damage and gain 3 block)
3. Fire Lotus (3 En, deal 10 damage, gaining 1 less energy next turn)



Terminology (Syntax)
- 'Your Deck'  variable refers to the active deck during the game. Later on will add more decks that can be edited but during fights, 'your deck' will always be active

Terminology (Design)
- Attack cards, Tactics, and specials are all different color card backgrounds