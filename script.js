            var score_str = "";
            var score_list = ["","","","",""];
            const d_object = new Date();
            var day = d_object.getDate();
            var month = d_object.getMonth()+1;
            var year = d_object.getFullYear();
            var date = `(${String(month)}/${String(day)}/${String(year)})`;
            var height = 6; //number of guesses
            var width = 5; //length of the word
            var switch_n = 0;
            var row = 0; //current guess (attempt #)
            var col = 0; //current letter for that attempt
            var stats = localStorage.getItem("games-won");
            var rec_word = localStorage.getItem("curr-word");
            
            if (stats==null){
                stats = 0;
            }
            console.log(stats);
            var gameOver = false;
            
            var wordList = ["mario","arjun","gator","foxes","bunny","viper","goose","snail","mamba","crane","snake","bison","bongo","bruin","camel","chimp","Dingo","Fitch","Hippo","Horse","Hyena","Koala","Lemur","Liger","Llama","Magot","Moose","Morse","Mouse","Okapi","Otter","Panda","Pongo","Puppy","Rhino","Sheep","Shrew","Skunk","Sloth","Swine","Tapir","Tiger","Vixen","Whale","Zebra","Trout","Squid","eagle","finch","heron","macaw","quail","raven","robin","owlet","shark","crabs","prawn","lambs","boars","bucks","deers","goats","hares","moles","orcas","seals"];
            
            
            var word = "HYENA";
            if(rec_word==word){
                window.alert("You have already played the turtle!")
                gameOver = true;
            }
            
            
            
            window.onload = function(){
                intialize();
            }
            
            function compileScore(){
                for(l in score_list){
                    score_str = score_str+score_list[l];

                }
                return score_str;
            }
            function switchBackground(){
                
                if(switch_n == 0){
                    document.body.style.backgroundColor = "DimGray";
                    switch_n+=1;
                    document.getElementById("btn_switch").innerText = "Light Mode";
                }
                else if(switch_n == 1){
                    document.body.style.backgroundColor = "white"
                    switch_n-=1;
                    document.getElementById("btn_switch").innerText = "Dark Mode";

                    
                }
                

            }
            function intialize() {
            
                // Create the game board
                for (let r = 0; r < height; r++) {
                    for (let c = 0; c < width; c++) {
                        // <span id="0-0" class="tile">P</span>
                        let tile = document.createElement("span");
                        tile.id = r.toString() + "-" + c.toString();
                        tile.classList.add("tile");
                        tile.classList.add("animate__animated");
                        tile.innerText = "";
                        document.getElementById("board").appendChild(tile);
                    }
                }
            
                // Create the key board
                let keyboard = [
                    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                    ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
                    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "???" ]
                ]
            
                for (let i = 0; i < keyboard.length; i++) {
                    let currRow = keyboard[i];
                    let keyboardRow = document.createElement("div");
                    keyboardRow.classList.add("keyboard-row");
            
                    for (let j = 0; j < currRow.length; j++) {
                        let keyTile = document.createElement("div");
            
                        let key = currRow[j];
                        keyTile.innerText = key;
                        if (key == "Enter") {
                            keyTile.id = "Enter";
                        }
                        else if (key == "???") {
                            keyTile.id = "Backspace";
                        }
                        else if ("A" <= key && key <= "Z") {
                            keyTile.id = "Key" + key; // "Key" + "A";
                        } 
            
                        keyTile.addEventListener("click", processKey);
            
                        if (key == "Enter") {
                            keyTile.classList.add("enter-key-tile");
                        } else {
                            keyTile.classList.add("key-tile");
                        }
                        keyboardRow.appendChild(keyTile);
                    }
                    document.body.appendChild(keyboardRow);
                }
                
            
                // Listen for Key Press
                document.addEventListener("keyup", (e) => {
                    processInput(e);
                })
            }
            
            function processKey() {
                e = { "code" : this.id };
                processInput(e);
            }
            
            function processInput(e) {
                if (gameOver) return; 
            
                // alert(e.code);
                if ("KeyA" <= e.code && e.code <= "KeyZ") {
                    if (col < width) {
                        let currTile = document.getElementById(row.toString() + '-' + col.toString());
                        if (currTile.innerText == "") {
                            currTile.innerText = e.code[3];
                            

                            currTile.classList.add("animate__bounceIn");
                            col += 1;
                        }
                    }
                }
                else if (e.code == "Backspace") {
                    if (0 < col && col <= width) {
                        col -=1;
                        
                    }
                    
                    let currTile = document.getElementById(row.toString() + '-' + col.toString());
                    currTile.innerText = "";
                }
            
                else if (e.code == "Enter") {
                    update();
                }
            
                if (!gameOver && row == height) {
                    gameOver = true;
                    document.getElementById("answer").innerText = word;
                    
                }
            }
            
            function update() {
                localStorage.setItem("curr-word",word);
                let guess = "";
                document.getElementById("answer").innerText = "";
                
                //string up the guesses into the word
                for (let c = 0; c < width; c++) {
                    let currTile = document.getElementById(row.toString() + '-' + c.toString());
                    let letter = currTile.innerText;
                    guess += letter;
                }
            
                guess = guess.toUpperCase(); //case sensitive
                
                var list_length = wordList.length;
                var count = 0;
                
                
                for(i in wordList){
                    count+=1;
                    
                    
                    var current_thing = wordList[i];
                    
                    if (guess == current_thing.toUpperCase()){
                        
                        break
                    }
                    if(count==list_length){
                        
                        document.getElementById("answer").innerText = "Not in word list";
                        return;
                    }
                }

               
                
                //start processing guess
                let correct = 0;
            
                let letterCount = {}; //keep track of letter frequency, ex) KENNY -> {K:1, E:1, N:2, Y: 1}
                for (let i = 0; i < word.length; i++) {
                    let letter = word[i];
            
                    if (letterCount[letter]) {
                       letterCount[letter] += 1;
                    } 
                    else {
                       letterCount[letter] = 1;
                    }
                }
            
                
            
                //first iteration, check all the correct ones first
                for (let c = 0; c < width; c++) {
                    let currTile = document.getElementById(row.toString() + '-' + c.toString());
                    let letter = currTile.innerText;
            
                    //Is it in the correct position?
                    if (word[c] == letter) {
                        score_list[c] = "????";
                        
                        currTile.classList.add("correct");
                        currTile.classList.add("animate__flipInX");
            
                        let keyTile = document.getElementById("Key" + letter);
                        keyTile.classList.remove("present");
                        keyTile.classList.add("correct");
            
                        correct += 1;
                        letterCount[letter] -= 1; //deduct the letter count
                    }
            
                    if (correct == width) {
                        stats=parseInt(stats)+1;
                        localStorage.setItem("games-won",stats);
                        var stats_get = localStorage.getItem("games-won");
                        console.log(stats_get);
                        gameOver = true;
                    }
                }
            
                
                //go again and mark which ones are present but in wrong position
                for (let c = 0; c < width; c++) {
                    let currTile = document.getElementById(row.toString() + '-' + c.toString());
                    let letter = currTile.innerText;
            
                    // skip the letter if it has been marked correct
                    if (!currTile.classList.contains("correct")) {
                        //Is it in the word?         //make sure we don't double count
                        if (word.includes(letter) && letterCount[letter] > 0) {
                            
                            // currTile.classList.add("present")
                            // currTile.classList.add("animate__flipInX");
                            
                            let keyTile = document.getElementById("Key" + letter);
                            
                                score_list[c] = "????"; 
                               
                                currTile.classList.add("animate__flipInX");
                                currTile.classList.add("present")
                                keyTile.classList.add("present");
                                
                            
                            letterCount[letter] -= 1;
                        } // Not in the word or (was in word but letters all used up to avoid overcount)
                        else {
                            for(let c=0;c<width;c++){
                                if(score_list[c]==""){
                                    score_list[c] = "????";
                                }
                            }
                            currTile.classList.add("absent");
                           
                            let keyTile = document.getElementById("Key" + letter);
                            keyTile.classList.add("absent")
                        }
                    }
                }
            
                row += 1; //start new row
                document.getElementById("score-1").innerHTML = "Guesses"+date+": "+row;
                document.getElementById("correct").innerHTML = "Total Correct: "+stats_get;
                console.log(score_list);
                col = 0; //start at 0 for new row
                document.getElementById("row"+row).innerHTML = compileScore();
                if(row<=5){
                    score_list = ["","","","",""]; 
                    score_str = "";
                }
                
            }
