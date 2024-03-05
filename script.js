const GRIDSIDE=600;



const sliderContainer=document.querySelector('#slider-container')
const slider=document.querySelector('#slider');
const sliderValue=document.querySelector('#slider-value');

const shadingColors=['#1a1a1a','#333333','#4d4d4d','#666666','#808080','#999999','#b3b3b3','#cccccc','#e6e6e6','#ffffff'];
let shadingIndex=0;
const shadingMode=document.querySelector("#shading-btn");

const colorPicker=document.querySelector('#color-picker');

let rainbowIndex=0;
const rainbowColors=['#e81416','#ffa500','#faeb36','#79c314','#487de7','#4b369d','#70369d'];
const rainbowBtn=document.querySelector('#rainbow-colors');

const clearBtn=document.querySelector('#clear-btn');

const lockBtn=document.querySelector('#lock-btn')

const sketchArea=document.querySelector("#sketch-area");
sketchArea.style.width=sketchArea.style.height=`${GRIDSIDE}px`;



  function mouseOverEvent(gridCell) {
    if (!gridCell.dataset.colored) {
        gridCell.style.backgroundColor =
            rainbowBtn.classList.contains('active') ?
                rainbowColors[Math.floor(Math.random() * rainbowColors.length)] :
                 colorPicker.classList.contains('active')?
                 colorPicker.value:
                    shadingColors[Math.floor(Math.random() * shadingColors.length)];
                     // Default to empty string if neither rainbow nor color picker is active
        gridCell.dataset.colored = true;
    }
}

    function clickEvent(gridCell){
            gridCell.style.backgroundColor='white';
             delete gridCell.dataset.colored;
    }

function createGridCells(squaresPerSide){


    const numOfSquares=squaresPerSide*squaresPerSide;
    const widthOrHeight=`${(GRIDSIDE/squaresPerSide)-2}px`;



    
    colorPicker.addEventListener('mouseover', ()=>{
        colorPicker.classList.add('active');
        rainbowBtn.classList.remove('active');
        shadingMode.classList.remove('active');
        
        const gridCells=document.querySelectorAll('.cell');
        gridCells.forEach( gridCell=> {
            gridCell.removeEventListener('mouseover', mouseOverEvent);
            gridCell.removeEventListener('click', clickEvent);
            gridCell.addEventListener('mouseover', (e)=> mouseOverEvent(gridCell));
            gridCell.addEventListener('click', (e)=> clickEvent(gridCell))
        });
    });

    shadingMode.addEventListener('click', ()=>{
        shadingMode.classList.add('active');
           rainbowBtn.classList.remove('active');
              colorPicker.classList.remove('active');
               const gridCells=document.querySelectorAll('.cell');
        gridCells.forEach( gridCell=> {
            gridCell.removeEventListener('mouseover', mouseOverEvent);
            gridCell.removeEventListener('click', clickEvent);
            gridCell.addEventListener('mouseover', (e)=> mouseOverEvent(gridCell));
            gridCell.addEventListener('click', (e)=> clickEvent(gridCell))
        });
    });
    rainbowBtn.addEventListener('click', ()=>{
        rainbowBtn.classList.add('active');
        colorPicker.classList.remove('active');
        shadingMode.classList.remove('active');


        const gridCells=document.querySelectorAll('.cell');
        gridCells.forEach( gridCell =>{
            gridCell.removeEventListener('mouseover', mouseOverEvent );
            gridCell.removeEventListener('click', clickEvent);
            gridCell.addEventListener('mouseover', (e) =>mouseOverEvent(gridCell));
            gridCell.addEventListener('click', (e)=> clickEvent(gridCell));
        });
    });

    for(let i=0;i<numOfSquares;i++){
        const gridCell=document.createElement("div");
        
        gridCell.style.width = gridCell.style.height= widthOrHeight
        gridCell.classList.add('cell');
        
        sketchArea.append(gridCell);
} 


  
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
    



