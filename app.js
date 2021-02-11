let scores,
  activePlayer,
  firstPictureNumber,
  secondPictureNumber,
  nextTile,
  firstTileNumber,
  secondTileNumber,
  tilesCount,
  arrTotal,
  userTurn,
  singlePlayerGame,
  firstTileToFlipBack,
  secondTileToFlipBack;


// setTimeout(function(){ init() }, 700);
tilesCount = 24;
singlePlayerGame = false;
userTurn = true;
let availableTiles = [];
nextTile =0;
//init();

// tile remove function
Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
};

document.querySelector(".player-0-panel").style.opacity = "0";
document.querySelector(".player-1-panel").style.opacity = "0";

//******************************************************************************** */
// this function initializes the game
function init() {
  console.log("Init Start")
  firstTileNumber = null;
  secondTileNumber = null;
  firstPictureNumber = null;
  secondPictureNumber = null;
  scores = [0, 0];
  activePlayer = 0;
  userTurn = true;

  //var input = document.querySelector('.final-score').value;
  document.querySelector('.btn-start').style.display = 'none';
  document.querySelector('.btn-new').style.display = 'block';
  document.querySelector('.btn-restart').style.display = 'block';
  document.querySelector(".controls").style.display = "none";
  document.querySelector(".player-0-panel").style.opacity = "1";
  document.querySelector(".player-1-panel").style.opacity = "1";
  document.querySelector("#name-0").innerHTML =
    'Player 1 <div class="player-score" id="score-0">0</div>';
    if(singlePlayerGame){  document.querySelector("#name-1").innerHTML =
    'Computer <div class="player-score" id="score-1">0</div>';}
    else{  document.querySelector("#name-1").innerHTML =
    'Player 2 <div class="player-score" id="score-1">0</div>';}

  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-0-panel").classList.remove("winner", "draw");
  document
    .querySelector(".player-1-panel")
    .classList.remove("active", "winner", "draw");

  //******************************************************** */
  // This  code creates array of arrys of random numbers
  let subArr1 = [];
  let subArr2 = [];

  subArr1 = Shuffle();
  subArr2 = Shuffle();

  arrTotal = subArr1;
console.log(arrTotal);
  for (let i = 0; i < subArr2.length; i++) {
    arrTotal.push(subArr2[i]);
  }

  //******************************************************************************** */
  // This function creates tile img elements and shuffles them.
  const arr = [];
  for (let i = 0, t = tilesCount; i < t; i++) {
    const number1 = Math.round(Math.random() * t);

    if (arr.includes(number1) || number1 == t) {
      i--;
    } else {
      arr.push(number1);
    }
  }
  console.log(arrTotal);
  for (let i = 0; i < arr.length; i++) {
    arrTotal[arr[i]][2] = arr[i];
    // console.log('tile number ' + arr[i] + ' arrTotal2 '+ arrTotal[arr[i]][1], arrTotal[arr[i]][2])
    let tileImg = document.createElement("img");
    tileImg.src = "img/tile-back.png";
    tileImg.className = "tile t" + tilesCount;
    tileImg.id = "tile-" + arr[i];
    document.getElementById("tiles").appendChild(tileImg);
    tileImg.addEventListener("click", function () {
      console.log("clicked on tile ID-" + arr[i]+ "user turn=" + userTurn);
      if (userTurn) {
        sPArray.push(arrTotal[arr[i]]);
        console.log("executed clicked on tile ID-" + arr[i]);
        if (secondTileNumber === null) {
          document.getElementById("tile-" + arr[i]).src =
            "img/tile-" + arrTotal[arr[i]][1] + ".png";
          if (firstPictureNumber === null) {
            firstPictureNumber = arrTotal[arr[i]][1];
            arrTotal[arr[i]][0] = 1;
            firstTileNumber = arr[i];
            console.log(firstTileNumber);
            console.log(firstPictureNumber);
          } else if (arrTotal[arr[i]][0] !== 0) {
            console.log("pick another Tile!");
          } 
          else {
            userTurn = false;
            console.log("user turn changed to " + userTurn);
            secondPictureNumber = arrTotal[arr[i]][1];
            secondTileNumber = arr[i];
            console.log(secondPictureNumber);
            console.log(secondTileNumber);
            setTimeout(function () {
              score();
              console.log("score timeout 300")
            }, 300);
            
          }
        }
      }
    });
  }
}
//*************************************************************************** */
// let reload;
document.querySelector(".btn-start").addEventListener("click", function () {
  // document.querySelector('.container').style.removeProperty('margin-top');
  document.getElementsByClassName("tile").remove();
  document.querySelector(".title").style.opacity = "0"; 
  init();
});
document.querySelector(".btn-new").addEventListener("click", function () {
  document.getElementsByClassName("tile").remove();
  setTimeout(function(){ init() }, 300);
});
document.querySelector(".btn-restart").addEventListener("click", function () {
  document.querySelector(".controls").style.display = "block";
  document.querySelector('.btn-start').style.removeProperty('display');
  document.querySelector('.btn-new').style.display = 'none';
  document.querySelector('.btn-restart').style.display = 'none';
  document.querySelector(".player-1-panel").classList.remove("active", "winner", "draw");
  document.querySelector(".player-0-panel").classList.remove("active", "winner", "draw");
  document.querySelector(".player-0-panel").style.opacity = "0";
  document.querySelector(".player-1-panel").style.opacity = "0";
  document.querySelector(".title").style.opacity = "1"; 
  // document.querySelector(".container").style.marginTop = "50px";
  
  document.getElementsByClassName("tile").remove();
  selectElement('numberOfTiles', tilesCount);
  selectElement('dificultyLvl', dificultyLvl);
  // let selectedPlayMode = document.getElementById('singlePlayerCheckbox').checked;
//   (function() {
//     let element = document.getElementById('singlePlayerCheckbox');
//     element = singlePlayerGame;
// })();
function selectElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
}
});

//*************************************************************************** */
// this sets selected number of tiles
document.querySelector("#numberOfTiles").addEventListener("change", (event) => {
  tilesCount = event.target.value;
});
document.querySelector("#dificultyLvl").addEventListener("change", (event) => {
  dificultyLvl = event.target.value;
});
//*************************************************************************** */
//Single Player
let sPArray = [];
let dificultyLvl = 2;

function duplicateValuesCheck(previousTiles) {
  
  console.log("duplicate values check start")
  console.log("first tile number = " + firstTileNumber)
  console.log("first tile number = " + secondTileNumber)
  console.log(sPArray)
  let pairFound = false;
  if (sPArray.length > dificultyLvl){ sPArray = sPArray.slice(-dificultyLvl)}
  for (var i = 0; i < previousTiles.length; i++) {
    console.log("i=" + i);

    for (var j = 0; j < previousTiles.length; j++) {
      console.log(i, j);
      if (i != j && !pairFound) {
        console.log("check " + previousTiles[i][1] + " " + previousTiles[j][1]);
        if (
          previousTiles[i][1] == previousTiles[j][1] &&
          previousTiles[i][2] != previousTiles[j][2]
        ) {
          console.log("found " + previousTiles[i] +" "+ previousTiles[j]);
          firstPictureNumber = previousTiles[i][1];
          secondPictureNumber = previousTiles[j][1];
          firstTileNumber = firstTileToFlipBack = previousTiles[i][2];
          secondTileNumber = secondTileToFlipBack = previousTiles[j][2];
          pairFound = true;
        }
      }
    }
  }

  if (pairFound) {
    document.getElementById("tile-" + firstTileNumber).src =
      "img/tile-" + arrTotal[firstTileNumber][1] + ".png";
    document.getElementById("tile-" + secondTileNumber).src =
      "img/tile-" + arrTotal[secondTileNumber][1] + ".png";
    firstPictureNumber = arrTotal[firstTileNumber][1];
    secondPictureNumber = arrTotal[secondTileNumber][1];
    firstTileNumber = arrTotal[firstTileNumber][2];
    secondTileNumber = arrTotal[secondTileNumber][2];
    arrTotal[firstTileNumber][3] = 1;
    arrTotal[secondTileNumber][3] = 1;
    sPArraySplice(firstTileNumber, secondTileNumber);
  } 
  return pairFound;
}
function newRandomTilePick(){
  console.log("new random tile pick start")
  console.log("first ilenumber = " + firstTileNumber)
  // console.log("first pick =" + firstPictureNumberSP);
    //firstPictureNumberSP = Math.round(Math.random() * tilesCount);
    availableTiles = [];
    // console.log(
    //   "first tile number is" +
    //     firstTileNumber +
    //     "arrtotal value 3 is" +
    //     arrTotal[firstTileNumber]
    // );
    arrTotal.forEach(element => { if(element[3] == 0 && element[0] == 0){availableTiles.push(element)} });
    console.log(availableTiles);
    nextTile = availableTiles[randomNumber(availableTiles.length)];
      console.log(
        "new " +
          nextTile
      );
      console.log("first tile number = " + firstTileNumber);
      
      
       
      if(firstTileNumber == null){
        firstPictureNumber = nextTile[1];
        firstTileNumber = nextTile[2];
        console.log("first tile number = " + firstTileNumber);
        console.log("first pick number is " + firstPictureNumber)
        document.getElementById("tile-" + firstTileNumber).src =
        "img/tile-" + firstPictureNumber + ".png";
        arrTotal[firstTileNumber][0] = 1;
      }
      else{
        secondPictureNumber = nextTile[1];
        secondTileNumber = nextTile[2];
        console.log("second tile number = " + secondTileNumber)
        console.log("seond pick number is " + secondPictureNumber)
        document.getElementById("tile-" + secondTileNumber).src =
        "img/tile-" + secondPictureNumber + ".png";
      }
      
    // console.log("first pick =" + firstPictureNumberSP);
      // setTimeout(function () {
      //   document.getElementById("tile-" + firstPictureNumberSP).src =
      // "img/tile-back.png";
      // }, 700); 
    sPArray.push(nextTile);
    if (sPArray.length > dificultyLvl){ sPArray = sPArray.slice(-dificultyLvl)}
  
  console.log("end");
}
// function findNextTile(){
//   myRandomNumber = randomNumber();

//   if(arrTotal[myRandomNumber][3] = 0){
//     console.log("next tile is " + arrTotal[myRandomNumber] )
//     return myRandomNumber
//   }
//   else{
//     findNextTile()
//   }
// }
function playModeSelector(mode) {
 // singlePlayerGame = mode;
 singlePlayerGame = mode;

  if(mode){
    document.querySelector(".dificultyLvl").style.display = "block";
    document.querySelector("#name-1").innerHTML =
    'Computer <div class="player-score" id="score-1">0</div>';
  }
  else{
    document.querySelector(".dificultyLvl").style.display = "none";
    document.querySelector("#name-1").innerHTML =
    'Player 2 <div class="player-score" id="score-1">0</div>';
  }
}

function sPArraySplice(firstTileNumber, secondTileNumber) {
  for (var i = 0; i < sPArray.length; i++) {
    console.log("cut");
    if (sPArray[i][2] == firstTileNumber || sPArray[i][2] == secondTileNumber) {
      console.log("splice" + sPArray[i][2]);
      sPArray.splice(i, 1);
      i--;
    }
  }
}
function computerTurn() {
  
  setTimeout( async function () {
    console.log("computer turn start")
    console.log("first tile number = " + firstTileNumber)
    userTurn = false;
    console.log("user turn changed to " + userTurn);
  let pairFound;
  pairFound = duplicateValuesCheck(sPArray);
  if(pairFound){
    console.log("pair found starting score")
    console.log("first tile number = " + firstTileNumber)
    
  }
  else{
    
    console.log("pair not found starting new random tile pick")
    console.log("first tile number = " + firstTileNumber)
    newRandomTilePick();
    pairFound = duplicateValuesCheck(sPArray);
    if(pairFound){
      console.log("pair found starting score")
      console.log("first tile number = " + firstTileNumber)
      }
    else{userTurn = false;
      console.log("user turn changed to " + userTurn);
      console.log("pair not found starting new random tile pick second time")
    console.log("first tile number = " + firstTileNumber)
    setTimeout(function () {
      newRandomTilePick();
    }, 500);
    
      if(firstPictureNumber == secondPictureNumber){pairFound = true}
      console.log("starting last score in this turn")
      console.log("first tile number = " + firstTileNumber + "fPN " + firstPictureNumber)
      console.log("second tile number is " + secondTileNumber + "sPN " + secondPictureNumber)
      
    }
  }  
  console.log("first tile number = " + firstTileNumber + "fPN " + firstPictureNumber)
  console.log("second tile number is " + secondTileNumber + "sPN " + secondPictureNumber)
  setTimeout(function () {
    score();
  }, 1000);
  
  }, 700);

if(singlePlayerGame && activePlayer == 1){userTurn = false; console.log("user turn changed to " + userTurn);}
  else{userTurn = true}
}
function randomNumber(maxValue) {
  let randomNumber = Math.round(Math.random() * maxValue);
  console.log(randomNumber);
  if(randomNumber == maxValue){console.log("random number too big");
      randomNumber = randomNumber - 1;}
  return randomNumber;
}

function Shuffle() {
  const intArr = [];
  // first item in arr2 = tile already picked in current round if value=1
  //second item = img number, third item = html img element id number,
  //fourth item = if value = 1 tile already picked and cleared from the board
  let arr2;
  const arrayOfArrys = [];
  for (let i = 0, t = tilesCount / 2; i < t; i++) {
    const number = Math.round(Math.random() * t);
    if (intArr.includes(number) || number === 0) {
      i--;
    } else {
      intArr.push(number);
    }
  }
  for (let i = 0; i < tilesCount / 2; i++) {
    arr2 = [0, intArr[i], 0, 0];
    arrayOfArrys.push(arr2);
  }
  return arrayOfArrys;
}
//*************************************************************************** */
//Next player

function nextPlayer() {
  console.log("next user start")
  document.getElementById("tile-" + firstTileToFlipBack).src = "img/tile-back.png";
  document.getElementById("tile-" + secondTileToFlipBack).src = "img/tile-back.png";
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  console.log("active player is " + (activePlayer + 1) + " and user turn is" + userTurn);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");  
  singlePlayerGame && activePlayer === 1
    ? (userTurn = false,console.log("user turn changed to " + userTurn),
      computerTurn())
    : (userTurn = true);
  arrTotal.forEach(function (tile) {
    tile[0] = 0;
  });
}

//*************************************************************************** */
//player score function
function score() {
    console.log("score start")
    console.log("first tile number = " + firstTileNumber + "fPN " + firstPictureNumber)
    console.log("second tile number = " + secondTileNumber + "sPN " + secondPictureNumber)
    if (firstPictureNumber !== null && firstPictureNumber == secondPictureNumber) {
      console.log("from first if statement in score. Pair found.  " + firstPictureNumber +""+ secondPictureNumber )
      scores[activePlayer]++;
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];
      document.getElementById("tile-" + firstTileNumber).style.opacity = "0";
      document.getElementById("tile-" + secondTileNumber).style.opacity = "0";
      arrTotal[firstTileNumber][3] = 1;
      arrTotal[secondTileNumber][3] = 1;
      sPArraySplice(firstTileNumber, secondTileNumber);
      firstTileNumber = firstTileToFlipBack;
      secondTileNumber = secondTileToFlipBack;
      firstPictureNumber = secondPictureNumber = null;
      firstTileNumber = secondTileNumber = null;
      if (singlePlayerGame && activePlayer == 0) {
        userTurn = true;
      }
      else{userTurn = false;
        console.log("user turn changed to " + userTurn);}
      if (!singlePlayerGame) {
        console.log("from score")
        userTurn = true;
      }
      if (scores[0] + scores[1] === tilesCount / 2) {
        if (scores[0] === scores[1]) {
          document.querySelector("#name-1").innerHTML =
            "Draw!" + "<br>" + scores[0] + " : " + scores[1];
          document.querySelector(".player-1-panel").classList.add("draw");
          document.querySelector(".player-1-panel").classList.remove("active");
          document.querySelector(".player-0-panel").classList.remove("active");
          document.querySelector(".player-0-panel").style.opacity = "0";
        } else {
          if(scores[0] > scores[1]){
            document.querySelector("#name-" + 0).innerHTML = "Winner!";
          document
            .querySelector(".player-0-panel")
            .classList.add("winner");
          }
          else{
            document.querySelector("#name-" + 1).innerHTML = "Winner!";
          document
            .querySelector(".player-1-panel")
            .classList.add("winner");
          
        }
        document
            .querySelector(".player-"+ activePlayer + "-panel")
            .classList.remove("active");
          }
      }
      if (singlePlayerGame && activePlayer == 0) {
        console.log("from score")
        userTurn = true;
      }
      else{userTurn = false;
        console.log("user turn changed to " + userTurn);}
      if (!singlePlayerGame) {
        console.log("from score")
        userTurn = true;
      }
      if(!userTurn && scores[0] + scores[1] !== tilesCount / 2){
        console.log("switching to computer turn");
        computerTurn();}
    } else {
      console.log("from score")
      if(firstTileNumber !== null && secondTileNumber !==null){
        console.log("from score") 
        firstTileToFlipBack = firstTileNumber;
        secondTileToFlipBack = secondTileNumber;
        console.log(firstTileNumber, firstTileToFlipBack, secondTileNumber, secondTileToFlipBack)
        firstPictureNumber = secondPictureNumber = null;
        firstTileNumber = secondTileNumber = null;
      } 
      if(userTurn){
        console.log("from score")
        setTimeout(function () {
        nextPlayer();
        }, 100);
      }
      else{
        console.log("from score")
        setTimeout(function () {
        nextPlayer();
        }, 1000);
      }
    }

}
