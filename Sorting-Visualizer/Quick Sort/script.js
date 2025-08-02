const button = document.getElementById('btn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const reset = document.getElementById('reset-btn')
 
let array = generateRandomArray(40);
let barWidth = canvas.width / array.length;

function generateRandomArray(size) {
    return Array(size).fill(0).map(() => Math.floor(Math.random() * 400) + 10);
}

function drawArray(array,idx,idxx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < array.length; i++) {
        let x = i * barWidth;
        let y = canvas.height - array[i];
        if(idx===i){
            ctx.fillStyle = '#Ff0000';
        }else if(i===idxx){
            ctx.fillStyle = '#00ff00';
        }else{
            ctx.fillStyle = '#d04773';
        }
        ctx.fillRect(x, y, barWidth, array[i]);
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(array[i], x + barWidth / 2, y - 10);
    }
}

async function partition(array,low,high){
    let pivot = array[high];

    let i=low-1;
    for(let j=low;j<high;j++){
        if(array[j]<pivot){
            i++;
            [array[i],array[j]]=[array[j],array[i]];
        }
        drawArray(array,high,j);
        await new Promise(resolve=>setTimeout(resolve,100));
        
    }
    i++;
    [array[i],array[high]]=[array[high],array[i]];
    return i;
}

async function quickSort(array,low,high){
    if(low<high){
        let pidx = await partition(array,low,high);
         await quickSort(array,low,pidx-1);
         await quickSort(array,pidx+1,high);
    }
}

function resetFunc(){
    array = generateRandomArray(40);
    drawArray(array,0,array.length-1);
}

button.addEventListener('click',async ()=>{
    await quickSort(array,0,array.length-1);
});

reset.addEventListener('click',()=>{
    resetFunc();
})

drawArray(array,0,array.length-1);