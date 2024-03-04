const GRIDSIDE=960;



const sliderContainer=document.querySelector('#slider-container')
const slider=document.querySelector('#slider');
const sliderValue=document.querySelector('#slider-value');



const colorPicker=document.querySelector('#color-picker');

let rainbowIndex=0;
const rainbowColors=['#e81416','#ffa500','#faeb36','#79c314','#487de7','#4b369d','#70369d'];
const rainbowBtn=document.querySelector('#rainbow-colors');

const clearBtn=document.querySelector('#clear-btn');

const lockBtn=document.querySelector('#lock-btn')

const sketchArea=document.querySelector("#sketch-area");
sketchArea.style.width=sketchArea.style.height=`${GRIDSIDE}px`;



function createGridCells(squaresPerSide){

    const numOfSquares=squaresPerSide*squaresPerSide;
    const widthOrHeight=`${(GRIDSIDE/squaresPerSide)-2}px`;
    for(let i=0;i<numOfSquares;i++){
        const gridCell=document.createElement("div");
        
        gridCell.style.width = gridCell.style.height= widthOrHeight
        gridCell.classList.add('cell');
        
        sketchArea.append(gridCell);


        sketchArea.addEventListener('mousedown', e=>{
            setTimeout(function(){

                gridCell.addEventListener('mouseover', e=>{
            if(!gridCell.dataset.colored){
                 gridCell.style.backgroundColor=`${colorPicker.value}`;
                 gridCell.dataset.colored=true;
            } 
         });
         gridCell.addEventListener('click', e=>{
            gridCell.style.backgroundColor='white';
            delete gridCell.dataset.colored;
         });   
            },2000)
  
       
});
      
        }
         
         
         rainbowBtn.addEventListener('click', e=>{
             const gridCells=document.querySelectorAll('.cell');
             for(let i=0;i<gridCells.length;i++){
                 const gridCell=gridCells[i];
                 gridCell.addEventListener('mouseover', e=>{
                     if(!gridCell.dataset.colored)
                     gridCell.style.backgroundColor=rainbowColors[rainbowIndex];
            rainbowIndex=(rainbowIndex+1) % rainbowColors.length;
            gridCell.dataset.colored=true;        
        });
    }
});
      
  

    clearBtn.addEventListener('click', e=>{
        if(confirm('all your progress will be lost are you sure')){
            const cells=document.querySelectorAll('.cell');
            cells.forEach(cell =>{
                cell.style.backgroundColor='white';
                delete cell.dataset.colored;
            });
        }        
    });
} 
//  when i click rainbowtbtn i want the colors to change into rainbow


 

createGridCells(slider.value)
slider.addEventListener('click', ()=>{

       while(sketchArea.firstChild){
        sketchArea.removeChild(sketchArea.firstChild)
    }
    sliderValue.textContent=`${slider.value} x ${slider.value} (resolution)`;
    createGridCells(slider.value)
});
    







