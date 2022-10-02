// Grab all the buttons as in array
// loop through them and add click addeventlistener to each element
// when elements are clickedm get the button's inner text and store them in some variable
// grab the display element
// and create a function to display clicke text to the display element


const allButtons = Array.from(document.querySelectorAll('.btn'));
console.log(allButtons);
const displayElm = document.querySelector(".display");

const operators = ['%', '/', '*', '-', '+'];

let lastOperator = ""

const audio = new Audio('aww.audio.wav')

let strToDisplay = "";
allButtons.map((btn, i) => {
    btn.addEventListener('click', ()=>{
        const val = btn.innerText;

        displayElm.style.color = "black";
        displayElm.style.background = "";
        displayElm.classList.remove("prank");

        if(val === 'AC'){
            strToDisplay = "";
            display();
            return;
        }

        if(val === 'C'){
            // strToDisplay = strToDisplay.slice(0, strToDisplay.length -1);
            strToDisplay = strToDisplay.slice(0, -1);
            return display(strToDisplay);
        }

        if(val === "="){
    

            const lastItem = strToDisplay[strToDisplay.length-1];

            // for(i=0; i< operators.length; i++){
            //     const lastItem = strToDisplay[strToDisplay.length-1];
            //     if(lastItem == operators[i]){
            //         strToDisplay = strToDisplay.slice(0, -1);
            //     }
            // }

            if(operators.includes(lastItem)){
                strToDisplay =strToDisplay.slice(0,-1);
            }

            return total();
        }


        if(operators.includes(val)){
            lastOperator = val;
            if(!strToDisplay){
                return;
            }
            const lastItem = strToDisplay[strToDisplay.length -1];
            if(operators.includes(lastItem)){
                strToDisplay =strToDisplay.slice(0,-1);
            }

        }


        if(val === ".") {

            if(lastOperator){
                const operatorIndex = strToDisplay.lastIndexOf(lastOperator);

                const lastNumberSet = strToDisplay.slice(operatorIndex + 1);

                if(lastNumberSet.includes(".")){
                    return;
                }

                if(!lastOperator && strToDisplay.includes(".")){
                    return;
                }
            }

            if(!lastOperator && strToDisplay.includes(".")){
                return;
            } 
        }

        
        // console.log(val);
        strToDisplay += val;
        // console.log(strToDisplay);
        display(strToDisplay);
    })
})

const display = (str) => {
    displayElm.innerText = str || "0.00";
}


const total = () => {

    const extra = randomNumber();

    if(extra > 0){
        displayElm.style.color = "white";
        displayElm.style.background = "red";
        displayElm.classList.add("prank");
        audio.play();
    }
    const ttl = eval(strToDisplay) + extra;
    strToDisplay = ttl.toString();

    display(strToDisplay);
}


const randomNumber = () => {
    const num = Math.round(Math.random()*10);
    return num < 8 ? num : 0;
}