
let scores, activePlayer, firstPick, secondPick, firstTileNumber, secondTileNumber, tilesCount, arrTotal;
tilesCount;


// setTimeout(function(){ init() }, 700);
tilesCount = 24;
init();

// tile remove function
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

//******************************************************************************** */
// this function initializes the game
function init() 
{
    console.log("Init")
    firstPick = 0;
    secondPick = 0;
    firstTileNumber = 0;
    secondTileNumber = 0;
    scores = [0, 0];
    activePlayer = 0;

    //var input = document.querySelector('.final-score').value;
    //document.querySelector('.btn-new').style.display = 'none';
    document.querySelector('.final-score').style.display = 'none';
    document.querySelector('.player-0-panel').style.opacity = '1';
    document.querySelector('#name-0').innerHTML = 'Player 1 <div class="player-score" id="score-0">0</div>';
    document.querySelector('#name-1').innerHTML = 'Player 2 <div class="player-score" id="score-1">0</div>';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('winner','draw');
    document.querySelector('.player-1-panel').classList.remove('active','winner','draw');
    
    //******************************************************** */
    // This  code creates array of arrys of random numbers
    let array1 = [];
    let array2 = [];
    
    function Shuffle(){
        const intArr = [];
        let arr2 = [0,0];
        const arrayOfArrys = [];
        for (let i=0, t=(tilesCount / 2); i<t; i++) {
            
            const number = Math.round(Math.random() * t);
            if(intArr.includes(number) || number === 0)
            {
                i--
            }
            else{
                intArr.push(number);
            } 
            
        } 
        for (let i=0; i<tilesCount / 2; i++) {
                
            arr2 = [0, intArr[i]]
            arrayOfArrys.push(arr2);
            
        }
        return arrayOfArrys;
    }
    array1 = Shuffle();
    array2 = Shuffle();

    arrTotal = array1;

    for (let i=0; i<array2.length; i++) {
        arrTotal.push(array2[i])
    }
    console.log(arrTotal);

    //******************************************************************************** */
    // This function creates tile img elements and shuffles them. 
    const arr = [];
    console.log(tilesCount);
    for (let i=0, t=tilesCount; i<t; i++) {
       
        const number1 = Math.round(Math.random() * t);
    
        if(arr.includes(number1) || number1 == t)
        {
            i--
        }
        else{
            arr.push(number1);
        }  
    }   
    console.log(arr);

    for (let i=0; i<arr.length; i++) {  
        let tileImg = document.createElement('img');
        tileImg.src= "img/tile-back.png";
        tileImg.className= "tile t" + tilesCount;
        tileImg.id= "tile-" + arr[i];
        document.getElementById('tiles').appendChild(tileImg);
        console.log(i);
        tileImg.addEventListener('click', function() {
            if(secondTileNumber === 0){
                document.getElementById('tile-' + arr[i]).src = ('img/tile-' + arrTotal[arr[i]][1] + '.png');
                console.log('arr number'+ arr[i]);
                if(firstPick === 0){
                    firstPick = arrTotal[arr[i]][1];
                    arrTotal[arr[i]][0] = 1;
                    firstTileNumber = arr[i];
                    console.log(firstPick);
                }
                else if(arrTotal[arr[i]][0] !== 0)
                    {
                        console.log('pick another Tile!')
                    }
                else{
                    secondPick = arrTotal[arr[i]][1];
                    secondTileNumber = arr[i];
                    console.log(secondPick);
                    score();
                }
            }
        });
    }
}
//*************************************************************************** */
// let reload;
document.querySelector('.btn-new').addEventListener('click', function (){
    document.getElementsByClassName("tile").remove();
    setTimeout(function(){ init() }, 300);

}) ;
//*************************************************************************** */
// this sets selected number of tiles
document.querySelector('#numberOfTiles').addEventListener('change', (event) => {
    tilesCount = event.target.value;
}) ;
//*************************************************************************** */
//Single Player
// function singlePlayer(){
//     var randomTile = Math.round(Math.random() * tilesCount);
// }
//*************************************************************************** */
//Next player
function nextPlayer() {
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    console.log('active player is ' + (activePlayer + 1));
    document.getElementById('tile-' + firstTileNumber).src = ('img/tile-back.png');
    document.getElementById('tile-' + secondTileNumber).src = ('img/tile-back.png');
    firstPick = secondPick = 0;
    firstTileNumber = secondTileNumber = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

//*************************************************************************** */
//player score function
function score(){ setTimeout(function(){ 
    
    arrTotal.forEach(function(tile) {
        tile[0] = 0;
    });

    if(firstPick !== 0 && firstPick === secondPick){

        scores[activePlayer] ++;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        console.log(scores);
        document.getElementById('tile-' + firstTileNumber).style.opacity = '0';
        document.getElementById('tile-' + secondTileNumber).style.opacity = '0';
        firstPick = secondPick = 0; 
        firstTileNumber = secondTileNumber = 0; 
        if(scores[0] + scores[1] === tilesCount / 2){
            
            if(scores[0] === scores[1]){
                document.querySelector('#name-1').innerHTML = 'Draw!' + '<br>' + scores[0] + ' : ' + scores[1];
                document.querySelector('.player-1-panel').classList.add('draw');
                document.querySelector('.player-1-panel').classList.remove('active');
                document.querySelector('.player-0-panel').classList.remove('active');
                document.querySelector('.player-0-panel').style.opacity = '0';
            }
            else{
                document.querySelector('#name-' + activePlayer).innerHTML = 'Winner!';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            }
        }

    }
    else{setTimeout(function(){ nextPlayer() }, 700);}   
}, 500)
}