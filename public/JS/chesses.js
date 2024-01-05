function colouring(){
    const boxes= document.querySelectorAll('.box');
    boxes.forEach(item => {
        getId= item.id;
        arr = Array.from(getId);
        back= parseInt(arr.pop());
        // arr.shift();
        front= parseInt(arr.shift());
        sum= front+back;
        if(sum%2==0){
            item.style.backgroundColor= 'rgb(72, 120, 170)  ';
        }
        else{
            item.style.backgroundColor= 'rgb(180, 220, 255) ';
        }
    });
}
colouring();

function insertImage(){
    const boxes= document.querySelectorAll('.box');
    boxes.forEach(item => {
        text = item.innerText;
        if(text.length !==0){
        if(text== "Wpawn" || text== "Bpawn"){
            item.innerHTML = `${text}<img class="allpawn" src="/images/${text}.png"> `;
        }
        else{
            item.innerHTML = `${text}<img class="allimg" src="/images/${text}.png"> `; 
        }
    }
    });
}
insertImage();

//function to not remove the same team element
function reddish() {
    document.querySelectorAll('.box').forEach(i1 => { 
        if (i1.style.backgroundColor == 'red') {

            document.querySelectorAll('.box').forEach(i2 => { 

                if (i2.style.backgroundColor == 'green' && i2.innerText.length !== 0) {

                    greenText = i2.innerText
                    redText = i1.innerText
                    redColor = ((Array.from(redText)).shift()).toString() 
                    greenColor = ((Array.from(greenText)).shift()).toString() 

                    // getId= i2.id;
                    // arr = Array.from(getId);
                    // back= parseInt(arr.pop());
                    // // arr.shift();
                    // front= parseInt(arr.shift());
                    // a = front+back;
            
                    // if (a % 2 == 0 && redColor == greenColor) {
                    //     i2.style.backgroundColor = 'rgb(72, 120, 170)'
                    // }
                    // if (a % 2 !== 0 && redColor == greenColor) {
                    //     i2.style.backgroundColor = 'rgb(180, 220, 255)'
                    // }

                    if (redColor == greenColor) {
                        i2.style.backgroundColor = 'rgb(255, 120, 120)'
                    }
                }
            })
        }
    })
}

// Moves 
tog = 1; //  it's white turn
document.querySelectorAll('.box').forEach(item=>{
    item.addEventListener('click',()=>{
        // ON CLICKING THE PARTICULAR item WE WANT TWO ACTIONS:
        // 1. on clicking the item we get all the possible path 
        // 2. if We try to move that item to the path and if there is a existence of the other team element then, 
        // that element should removed
        // To delete the opposite element
        if (item.style.backgroundColor == 'green' && item.innerText.length == 0) {
            tog = tog + 1
        }

        else if (item.style.backgroundColor == 'green' && item.innerText.length !== 0) {
            // for deleting 
            document.querySelectorAll('.box').forEach(i => {
                if (i.style.backgroundColor == 'red') {
                    redId = i.id
                    redText = i.innerText

                    document.getElementById(redId).innerText = ''
                    item.innerText = redText
                    colouring()
                    insertImage()
                    tog = tog + 1
                    
                }
            })
        }
        getarrId = item.id; // 701
        getId = parseInt(getarrId);
        arr = Array.from(getarrId);
        lastd= parseInt(arr.pop());

        function whosTurn(player){
            // player could be "B" or "W"
            if(item.innerText== `${player}pawn`){
                // PAWN:
                // Initial Move: On its first move, a pawn has the option to advance one or two squares forward.
                // Regular Move: After the initial move, a pawn can move only one square forward at a time.
                // Capture: Pawns capture diagonally. They cannot capture straight ahead or move diagonally without capturing.
                item.style.backgroundColor= 'red';
                if(player=='B' ){
                    if(document.getElementById(`${getId-100}`).innerText.length ==0 ){
                        document.getElementById(`${getId-100}`).style.backgroundColor= 'green';
                        if(document.getElementById(`${getId-200}`).innerText.length ==0 && (getId - lastd) == 700){
                            document.getElementById(`${getId-200}`).style.backgroundColor= 'green';
                        }
                    }
                    // FOR DIAGONALLY CAPTURING
                    if(lastd<8 && document.getElementById(`${getId-100+1}`).innerText.length !==0 ){
                        document.getElementById(`${getId-100+1}`).style.backgroundColor= 'green';
                    }
                    if(lastd>1 && document.getElementById(`${getId-100-1}`).innerText.length !==0 ){
                        document.getElementById(`${getId-100-1}`).style.backgroundColor= 'green';
                    }
                }
                else if(player=='W' ){
                    if(document.getElementById(`${getId+100}`).innerText.length ==0 ){
                        document.getElementById(`${getId+100}`).style.backgroundColor= 'green';
                        if(document.getElementById(`${getId+200}`).innerText.length ==0 && (getId - lastd) == 200){
                            document.getElementById(`${getId+200}`).style.backgroundColor= 'green';
                        }
                    }
                    // FOR DIAGONALLY CAPTURING
                    if(lastd<8 && document.getElementById(`${getId+100+1}`).innerText.length !==0 ){
                        document.getElementById(`${getId+100+1}`).style.backgroundColor= 'green';
                    }
                    if(lastd>1 && document.getElementById(`${getId+100-1}`).innerText.length !==0 ){
                        document.getElementById(`${getId+100-1}`).style.backgroundColor= 'green';
                    }
                }
            }
            // KING:  Moves one square in any direction.

            if (item.innerText == `${player}king`) {
                if (lastd < 8) {
                    document.getElementById(`${getId + 1}`).style.backgroundColor = 'green'

                }
                if (lastd > 1) {

                    document.getElementById(`${getId - 1}`).style.backgroundColor = 'green'
                }
                if (getId-lastd < 800) {

                    document.getElementById(`${getId + 100}`).style.backgroundColor = 'green'
                }
                if (getId-lastd > 100) {

                    document.getElementById(`${getId - 100}`).style.backgroundColor = 'green'
                }

                if (getId-lastd > 100 && lastd < 8) {

                    document.getElementById(`${getId - 100 + 1}`).style.backgroundColor = 'green'
                }
                if (getId-lastd > 100 && lastd > 1) {

                    document.getElementById(`${getId - 100 - 1}`).style.backgroundColor = 'green'
                }
                if (getId-lastd < 800 && lastd < 8) {

                    document.getElementById(`${getId + 100 + 1}`).style.backgroundColor = 'green'
                }
                if (getId-lastd < 800 && lastd > 1) {

                    document.getElementById(`${getId + 100 - 1}`).style.backgroundColor = 'green'
                }

                item.style.backgroundColor = 'red'

            }
            // ROOK: Moves horizontally or vertically any number of squares.
            if (item.innerText == `${player}rook`) {
                item.style.backgroundColor = 'red'
                for(i=1;i<9;i++){
                    // for vertical downward possibility
                    if((getId - i * 100) > 100 && document.getElementById(`${getId-100*i}`).innerText.length == 0 ){
                        document.getElementById(`${getId-100*i}`).style.backgroundColor= 'green';
                    }
                    else if((getId - i * 100) > 100 && document.getElementById(`${getId-100*i}`).innerText.length !== 0 ){
                        document.getElementById(`${getId-100*i}`).style.backgroundColor= 'green';
                        break;
                    }
                }
                for(i=1;i<9;i++){
                    // for vertical upward possibility
                    if((getId + i * 100) < 900 && document.getElementById(`${getId+100*i}`).innerText.length == 0 ){
                        document.getElementById(`${getId+100*i}`).style.backgroundColor= 'green';
                    }
                    else if((getId + i * 100) < 900 && document.getElementById(`${getId+100*i}`).innerText.length !== 0 ){
                        document.getElementById(`${getId+100*i}`).style.backgroundColor= 'green';
                        break;
                    }
                }
                for (let i = 1; i < 9; i++) {
                    // for horizontal right side possibility
                    if ((getId + i) < (getId-lastd + 9) && document.getElementById(`${getId + i}`).innerText == 0) {
                        document.getElementById(`${getId + i}`).style.backgroundColor = 'green'
                    }
                    else if ((getId + i) < ( getId-lastd+ 9) && document.getElementById(`${getId + i}`).innerText !== 0) {
                        document.getElementById(`${getId + i}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {
                     // for horizontal left side possibility
                    if ((getId - i) > (getId-lastd) && document.getElementById(`${getId - i}`).innerText == 0) {
                        document.getElementById(`${getId - i}`).style.backgroundColor = 'green'
                    }
                    else if ((getId - i) > (getId-lastd) && document.getElementById(`${getId - i}`).innerText !== 0) {
                        document.getElementById(`${getId - i}`).style.backgroundColor = 'green'
                        break
                    }
                }

            }
             // BISHOP:  Moves diagonally any number of squares.

             if (item.innerText == `${player}bishop`) {

                aup = getId-lastd;
                aside= lastd;
                a= getId;
                for (let i = 1; i < 9; i++) {
                    // for right down diagonal possibility
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`${a + i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`${a + i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    // for right up diagonal possibility
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`${a - i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`${a - i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    // for left down diagonal possibility
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`${a + i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`${a + i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }

                }


                for (let i = 1; i < 9; i++) {
                      // for left up diagonal possibility
                    if (i < aup / 100 && i < aside && document.getElementById(`${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`${a - i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`${a - i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                item.style.backgroundColor = 'red'

            }
             // QUEEN: It can move in any direction like a king (but the queen is not limited to a single square). 

             if (item.innerText == `${player}queen`) {
                aup = getId-lastd;
                aside= lastd;
                a= getId;
                for (let i = 1; i < 9; i++) {
                    // for downward possibility
                    if ((a + i * 100) < 900 && document.getElementById(`${a + i * 100}`).innerText == 0) {
                        document.getElementById(`${a + i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`${a + i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {
                    // for upward possibility
                    if ((a - i * 100) > 100 && document.getElementById(`${a - i * 100}`).innerText == 0) {
                        document.getElementById(`${a - i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`${a - i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {
                    // for right side possibility
                    if ((a + i) < (aup + 9) && document.getElementById(`${a + i}`).innerText == 0) {
                        document.getElementById(`${a + i}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`${a + i}`).innerText !== 0) {
                        document.getElementById(`${a + i}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {
                    // for left side possibility
                    if ((a - i) > (aup) && document.getElementById(`${a - i}`).innerText == 0) {
                        document.getElementById(`${a - i}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`${a - i}`).innerText !== 0) {
                        document.getElementById(`${a - i}`).style.backgroundColor = 'green'
                        break
                    }
                }



                for (let i = 1; i < 9; i++) {
                    // for right down diagonal possibility
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`${a + i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`${a + i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    // for right up diagonal possibility
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`${a - i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`${a - i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    // for left down diagonal possibility
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`${a + i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`${a + i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }

                }


                for (let i = 1; i < 9; i++) {
                      // for left up diagonal possibility
                    if (i < aup / 100 && i < aside && document.getElementById(`${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`${a - i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`${a - i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                item.style.backgroundColor = 'red'

            }

            // KNIGHT: it moves two squares vertically and one square horizontally, or two squares horizontally and one square vertically (with both forming the shape of a capital L).

            if (item.innerText == `${player}knight`) {

                aup = getId-lastd;
                aside= lastd;
                a= getId;
                if (aside < 7 && aup < 800) {
                    document.getElementById(`${a + 100 + 2}`).style.backgroundColor = 'green'
                }
                if (aside < 7 && aup > 200) {
                    document.getElementById(`${a - 100 + 2}`).style.backgroundColor = 'green'
                }
                if (aside < 8 && aup < 700) {
                    document.getElementById(`${a + 200 + 1}`).style.backgroundColor = 'green'
                }
                if (aside > 1 && aup < 700) {
                    document.getElementById(`${a + 200 - 1}`).style.backgroundColor = 'green'
                }
                if (aside > 2 && aup < 800) {
                    document.getElementById(`${a - 2 + 100}`).style.backgroundColor = 'green'
                }
                if (aside > 2 && aup > 100) {
                    document.getElementById(`${a - 2 - 100}`).style.backgroundColor = 'green'
                }
                if (aside < 8 && aup > 200) {
                    document.getElementById(`${a - 200 + 1}`).style.backgroundColor = 'green'
                }
                if (aside > 1 && aup > 200) {
                    document.getElementById(`${a - 200 - 1}`).style.backgroundColor = 'green'
                }

                item.style.backgroundColor = 'red'

            }
        }
         // Toggling the turn
         if (tog % 2 !== 0) {
            document.getElementById('tog').innerText = "White's Turn"
            whosTurn('W')
        }
        if (tog % 2 == 0) {
            document.getElementById('tog').innerText = "Black's Turn"
            whosTurn('B')
        }

        reddish()
          // winning()

        numOfKings = 0


        document.querySelectorAll('.box').forEach(win => {
            if (win.innerText == 'Wking' || win.innerText == 'Bking') {
                numOfKings += 1
            }
  
        })
  
        if (numOfKings == 1) {
            setTimeout(() => {
                
                if (tog % 2 == 0) {
                    alert('White Wins !!')
                    location.reload()
                }
                else if (tog % 2 !== 0) {
                    alert('Black Wins !!')
                    location.reload()
                }
            }, 100)
          }
    })
})
// Moving the element
document.querySelectorAll('.box').forEach(hathiTest => {

    hathiTest.addEventListener('click', function () {

        if (hathiTest.style.backgroundColor == 'red') {

            redId = hathiTest.id
            redText = hathiTest.innerText

            document.querySelectorAll('.box').forEach(hathiTest2 => {

                hathiTest2.addEventListener('click', function () {
                    if (hathiTest2.style.backgroundColor == 'green' && hathiTest2.innerText.length == 0) {
                        document.getElementById(redId).innerText = ''
                        hathiTest2.innerText = redText
                        colouring()
                        insertImage()
                    }
                })
            })

        }

    })

})
// Prvents from selecting multiple elements
z = 0
document.querySelectorAll('.box').forEach(ee => {
    ee.addEventListener('click', function () {
        z = z + 1
        if (z % 2 == 0 && ee.style.backgroundColor !== 'green') {
            colouring()
        }
    })
})