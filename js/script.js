let aiFlag = false;
let count = 0;
const free = Array.prototype.slice.call(document.querySelectorAll('.cell'));

const playerX = [];
const playerO = [];
let change = false;
const winX = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const winO = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


const value = li => {
    const id = Number(li.getAttribute('data-id'));


    if(change){
     li.textContent="O";
     change=!change;
 } else{
     li.textContent="X";
     change=!change;
 }

};
const fillingPlayer = li => {
    const id = Number(li.getAttribute('data-id'));
    if(change){
        playerX.push(id);
    } else{
        playerO.push(id);
    }
    for(let i=0; i<free.length; i++){
        if(free[i]==li){
            free.splice(i,1);

        }
    }

};
const check = (value, winValue) => {
    count++


     for(let k=0; k<winValue.length; k++){
    for(let j=0; j<winValue[k].length; j++){
        for(let i=0; i<value.length; i++){
         if(winValue[k][j]==value[i]){
                winValue[k].splice(j,1);

            }
            }
        }


         if(winValue[k].length==0){
         if(change){
             setTimeout(() => {
                 alert('WinX');
             location.reload()
             },10)

        }
         else{
            setTimeout(() => {
                 alert('WinO');
             location.reload()
             },10)
        }
    }else if(count==9){
             count=0;
            setTimeout(() => {
                 alert('WinNONE');
             location.reload()
             },10)
         }

    }

};
const rand = () => {
    const randoM = Math.floor(Math.random() * free.length);
    return  free[randoM];
};
const ai = () => {
    const el = rand();
    value(el)
   fillingPlayer(el)
    if(!change){
          check(playerO, winO);
        }else{
            check(playerX, winX);
        }

};;


document.addEventListener('click', e => {
    const _this = e.target;
    if (_this.matches('.cell')) {
        const checkFree = free.some(elem => elem == _this);

        if(checkFree){
       value(_this);
        fillingPlayer(_this);
        if(!change){
          check(playerO, winO);  
        }else{
            check(playerX, winX); 
        }
        
        if(aiFlag){
            setTimeout(() => {
             ai();   
            },200)
            
        }
        
      }
        
    }
    if (_this.matches('.btn')) {
        aiFlag=!aiFlag
        if(aiFlag){
        _this.style.background='green'
        }else{
           _this.style.background='red' 
        }
    }
    
});







