
var scores, activePlayer, firstPick, secondPick, firstTileNumber, secondTileNumber, tilesCount, arrTotal;
tilesCount;


//setTimeout(function(){ init() }, 700);
init();
function init() 
{
    console.log("Init")
    firstPick = 0;
    secondPick = 0;
    firstTileNumber = 0;
    secondTileNumber = 0;
    scores = [0, 0];
    activePlayer = 0;
    
    
    if (screen.height > screen.width){
    screen.orientation.lock('landscape');
    }


    var input = document.querySelector('.final-score').value;
    //document.querySelector('.btn-new').style.display = 'none';
    document.querySelector('.final-score').style.display = 'none';
    //document.querySelector('.btn-new').style.display = 'none';
    

    if(input) {
        tilesCount = input;
    } 
    else {
        tilesCount = 24;
    }
    
    //******************************************************** */
    // This  code creates array of arrys of random numbers
    var array1 = [];
    var array2 = [];
    
    function Shuffle(){
        var intArr = [];
        var arr2 = [0,0];
        var arrayOfArrys = [];
        for (var i=0, t=(tilesCount / 2); i<t; i++) {
            
            var number = Math.round(Math.random() * t);
            if(intArr.includes(number) || number === 0)
            {
                i--
            }
            else{
                intArr.push(number);
            } 
            
        } 
        for (var i=0; i<tilesCount / 2; i++) {
                
            arr2 = [0, intArr[i]]
            arrayOfArrys.push(arr2);
            
        }
        return arrayOfArrys;
    }
    array1 = Shuffle();
    array2 = Shuffle();

    arrTotal = array1;

    for (var i=0; i<array2.length; i++) {
        arrTotal.push(array2[i])
    }
    console.log(arrTotal);

    //******************************************************************************** */
    // This function creates tile img elements and shuffles them. 
    var arr = [];
    for (var i=0, t=tilesCount; i<t; i++) {
       
        var number1 = Math.round(Math.random() * t);
    
        if(arr.includes(number1) || number1 === tilesCount)
        {
            i--
        }
        else{
            arr.push(number1);
        }  
    }   

    for (var i=0; i<arr.length; i++) {  
        var tileImg = document.createElement('img');
        tileImg.src= "tile-back.png";
        tileImg.className= "tile";
        tileImg.id= "tile-" + arr[i];
        document.getElementById('tiles').appendChild(tileImg);
        
    }
    //*************************************************************************** */
}

var reload;
document.querySelector('.btn-new').addEventListener('click', function() {window.location.replace(window.location.pathname + window.location.search + window.location.hash);});


//Next player
function nextPlayer() {
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    console.log('active player is ' + activePlayer)
    document.getElementById('tile-' + firstTileNumber).src = ('tile-back.png');
    document.getElementById('tile-' + secondTileNumber).src = ('tile-back.png');
    firstPick = secondPick = 0;
    firstTileNumber = secondTileNumber = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}


//player score function
function score(){ setTimeout(function(){ 
    
    console.log('Score')
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
                //document.querySelector('.btn-new').style.display = 'none';
                //reload = document.querySelector('.btn-new').addEventListener('click', function() {window.location.replace(window.location.pathname + window.location.search + window.location.hash);});
                document.querySelector('#name-1').innerHTML = 'There is a draw!' + '<br>' + scores[0] + ' : ' + scores[1];
                document.querySelector('.player-1-panel').classList.add('draw');
                document.querySelector('.player-1-panel').classList.remove('active');
                document.querySelector('.player-0-panel').classList.remove('active');
                document.querySelector('.player-0-panel').style.opacity = '0';
            }
            else{
                //reload = document.querySelector('.btn-new').addEventListener('click', function() {window.location.replace(window.location.pathname + window.location.search + window.location.hash);});
                document.querySelector('#name-' + activePlayer).innerHTML = 'Winner!';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            }
        }

    }
    else{setTimeout(function(){ nextPlayer() }, 700);}   
}, 500)
}

//***************************************************************************************** */

//add event listeners for the tiles

addEventListeners();

function addEventListeners() {

    document.getElementById('tile-0').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-0').src = ('tile-' + arrTotal[0][1] + '.png');

            if(firstPick === 0){
                firstPick = arrTotal[0][1];
                arrTotal[0][0] = 1;
                firstTileNumber = 0;
                console.log(firstTileNumber);
                console.log(firstPick);
                
            }
            else if(arrTotal[0][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[0][1];
                secondTileNumber = 0;
                console.log(firstTileNumber);
                console.log(secondPick);
                score();
            }
                
        }
        
    });

    document.getElementById('tile-1').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-1').src = ('tile-' + arrTotal[1][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[1][1];
                arrTotal[1][0] = 1;
                firstTileNumber = 1;
                console.log(firstPick);
                
            }
            else if(arrTotal[1][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[1][1];
                secondTileNumber = 1;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-2').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-2').src = ('tile-' + arrTotal[2][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[2][1];
                arrTotal[2][0] = 1;
                firstTileNumber = 2;
                console.log(firstPick);
            }
            else if(arrTotal[2][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[2][1];
                secondTileNumber = 2;
                console.log(secondPick);
                score();
            }
        }
        
    });

    document.getElementById('tile-3').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-3').src = ('tile-' + arrTotal[3][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[3][1];
                arrTotal[3][0] = 1;
                firstTileNumber = 3;
                console.log(firstPick);
            }
            else if(arrTotal[3][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[3][1];
                secondTileNumber = 3;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-4').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-4').src = ('tile-' + arrTotal[4][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[4][1];
                arrTotal[4][0] = 1;
                firstTileNumber = 4;
                console.log(firstPick);
            }
            else if(arrTotal[4][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[4][1];
                secondTileNumber = 4;
                console.log(secondPick);
                score();
            }
        }    
    });

    document.getElementById('tile-5').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-5').src = ('tile-' + arrTotal[5][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[5][1];
                arrTotal[5][0] = 1;
                firstTileNumber = 5;
                console.log(firstPick);
            }
            else if(arrTotal[5][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[5][1];
                secondTileNumber = 5;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-6').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-6').src = ('tile-' + arrTotal[6][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[6][1];
                arrTotal[6][0] = 1;
                firstTileNumber = 6;
                console.log(firstPick);
            }
            else if(arrTotal[6][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[6][1];
                secondTileNumber = 6;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-7').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-7').src = ('tile-' + arrTotal[7][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[7][1];
                arrTotal[7][0] = 1;
                firstTileNumber = 7;
                console.log(firstPick);
            }
            else if(arrTotal[7][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[7][1];
                secondTileNumber = 7;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-8').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-8').src = ('tile-' + arrTotal[8][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[8][1];
                arrTotal[8][0] = 1;
                firstTileNumber = 8;
                console.log(firstPick);
            }
            else if(arrTotal[8][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[8][1];
                secondTileNumber = 8;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-9').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-9').src = ('tile-' + arrTotal[9][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[9][1];
                arrTotal[9][0] = 1;
                firstTileNumber = 9;
                console.log(firstPick);
            }
            else if(arrTotal[9][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[9][1];
                secondTileNumber = 9;
                console.log(secondPick);
                score();
            }
        }
    });



    document.getElementById('tile-10').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-10').src = ('tile-' + arrTotal[10][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[10][1];
                arrTotal[10][0] = 1;
                firstTileNumber = 10;
                console.log(firstPick);
            }
            else if(arrTotal[10][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[10][1];
                secondTileNumber = 10;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-11').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-11').src = ('tile-' + arrTotal[11][1] + '.png');
            
            if(firstPick === 0)
                {
                firstPick = arrTotal[11][1];
                arrTotal[11][0] = 1;
                firstTileNumber = 11;
                console.log(firstPick);
                }
            else if(arrTotal[11][0] !== 0)
                {
                    console.log('pick another Tile!')
                }

            else
                {
                arrTotal[11][0] = 0;
                secondPick = arrTotal[11][1];
                secondTileNumber = 11;
                console.log(secondPick);
                
                score();
            }
        }
        
    });

    document.getElementById('tile-12').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-12').src = ('tile-' + arrTotal[12][1] + '.png');
        
            if(firstPick === 0){
                
                firstPick = arrTotal[12][1];
                arrTotal[12][0] = 1;
                firstTileNumber = 12;
                console.log(firstPick);
            }
            else if(arrTotal[12][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else if(secondPick === 0){
                secondPick = arrTotal[12][1];
                secondTileNumber = 12;
                console.log(secondPick);
                score();
            }
        }
        
    });

    document.getElementById('tile-13').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-13').src = ('tile-' + arrTotal[13][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[13][1];
                arrTotal[13][0] = 1;
                firstTileNumber = 13;
                console.log(firstPick);
            }
            else if(arrTotal[13][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[13][1];
                secondTileNumber = 13;
                console.log(secondPick);
                score();
            }
        }
        
    });

    document.getElementById('tile-14').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-14').src = ('tile-' + arrTotal[14][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[14][1];
                arrTotal[14][0] = 1;
                firstTileNumber = 14;
                console.log(firstPick);
            }
            else if(arrTotal[14][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[14][1];
                secondTileNumber = 14;
                console.log(secondPick);
                score();
            }
        }
        
    });

    document.getElementById('tile-15').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-15').src = ('tile-' + arrTotal[15][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[15][1];
                arrTotal[15][0] = 1;
                firstTileNumber = 15;
                console.log(firstPick);
            }
            else if(arrTotal[15][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[15][1];
                secondTileNumber = 15;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-16').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-16').src = ('tile-' + arrTotal[16][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[16][1];
                arrTotal[16][0] = 1;
                firstTileNumber = 16;
                console.log(firstPick);
            }
            else if(arrTotal[16][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[16][1];
                secondTileNumber = 16;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-17').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-17').src = ('tile-' + arrTotal[17][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[17][1];
                arrTotal[17][0] = 1;
                firstTileNumber = 17;
                console.log(firstPick);
            }
            else if(arrTotal[17][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[17][1];
                secondTileNumber = 17;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-18').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-18').src = ('tile-' + arrTotal[18][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[18][1];
                arrTotal[18][0] = 1;
                firstTileNumber = 18;
                console.log(firstPick);
            }
            else if(arrTotal[18][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[18][1];
                secondTileNumber = 18;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-19').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-19').src = ('tile-' + arrTotal[19][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[19][1];
                arrTotal[19][0] = 1;
                firstTileNumber = 19;
                console.log(firstPick);
            }
            else if(arrTotal[19][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[19][1];
                secondTileNumber = 19;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-20').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-20').src = ('tile-' + arrTotal[20][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[20][1];
                arrTotal[20][0] = 1;
                firstTileNumber = 20;
                console.log(firstPick);
            }
            else if(arrTotal[20][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[20][1];
                secondTileNumber = 20;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-21').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-21').src = ('tile-' + arrTotal[21][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[21][1];
                arrTotal[21][0] = 1;
                firstTileNumber = 21;
                console.log(firstPick);
            }
            else if(arrTotal[21][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[21][1];
                secondTileNumber = 21;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-22').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-22').src = ('tile-' + arrTotal[22][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[22][1];
                arrTotal[22][0] = 1;
                firstTileNumber = 22;
                console.log(firstPick);
            }
            else if(arrTotal[22][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[22][1];
                secondTileNumber = 22;
                console.log(secondPick);
                score();
            }
        }
    });

    document.getElementById('tile-23').addEventListener('click', function() {
        if(secondTileNumber === 0){
            document.getElementById('tile-23').src = ('tile-' + arrTotal[23][1] + '.png');
            
            if(firstPick === 0){
                firstPick = arrTotal[23][1];
                arrTotal[23][0] = 1;
                firstTileNumber = 23;
                console.log(firstPick);
            }
            else if(arrTotal[23][0] !== 0)
                {
                    console.log('pick another Tile!')
                }
            else{
                secondPick = arrTotal[23][1];
                secondTileNumber = 23;
                console.log(secondPick);
                score();
            }
        }
    });

};
