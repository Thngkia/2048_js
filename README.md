# 2048 (Game)
## Content
  * [Description](#description)
  * [Gameplay](#gameplay)
  * [Technologies](#Technologies)
  * [MVP](#MVP)
  * [References](#references)


![sample gif of 2048](https://thngkia.github.io/2048_js/images/2048.gif)
### Description
Click [here](https://thngkia.github.io/2048_js/) for the game

This is an adaption of the popular game by Gabriele Cirulli. The way this game works is by sliding game tiles in all 4 directions where the numbers will combine and the goal is reach 2048 and beyond.

### Gameplay
Using the 4 arrow keys on your keyboard, slide the tiles in the direction of where you would like all the tiles to go.
When tiles of the same number meets, they will combine to form a tile with double the value.

*hint: try to keep the largest tile at one of the corners of the grid

If you would like to get some assistance, there is the basic and the advanced auto run functions


### Technologies
HTML, CSS, JavaScript

Libraries: Bootstrap, Font Awesome

### MVP

Features:
1. Basic game functions of tiles sliding in all 4 directions to combine tiles
2. Button to reset the game
3. Button to reset the high score
4. Instructions 
5. Button for hint
  - This is based on the next move that is most likely to produce the highest score
6. Button for Auto Run (Basic)
  - This is a version of auto run that was designed based on an observation of the game. The board will try its best to keep its largest value at the bottom left of the board by sliding left and down continuously.
7. Button for Auto Run (Advanced)
  - This function tries to find the next best possible value by calculating the value of the combinations that is taking place. It will then attempt the said move. As the values get larger, it will attempt to free up more squares to prevent game over. 

This game was made with some of the following methodologies
* Arrays and nested loops 
* DOM manipulation
* Event handling
* Scopes
* and more...

### References
https://en.wikipedia.org/wiki/2048_(video_game)