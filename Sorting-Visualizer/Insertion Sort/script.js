const main = document.getElementById('main');
const button = document.getElementById('btn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const reset = document.getElementById('reset-btn')
 
let array = generateRandomArray(40);
let barWidth = canvas.width / array.length;

function generateRandomArray(size) {
    return Array(size).fill(0).map(() => Math.floor(Math.random() * 400) + 10);
}
function drawArray(array,idx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < array.length; i++) {
        let x = i * barWidth;
        let y = canvas.height - array[i];
        if(idx===i){
            ctx.fillStyle = '#Ff0000';
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

async function insertionSort(){
    let i=1
    let j;
    while(i<array.length){
        j=i-1;
        let temp = array[i];
        while(j>=0){
            if(array[j]>temp){
                array[j+1]=array[j];
                drawArray(array,j);
                j--;
                await new Promise(resolve=>setTimeout(resolve,50));
            }else{
                break;
            }
        }
        array[j+1]=temp;
        i++;
    }
}

function resetFunc(){
    array = generateRandomArray(40);
    drawArray(array,0);
}
button.addEventListener('click',async ()=>{
    await insertionSort(array);
});

reset.addEventListener('click',()=>{
    resetFunc();
})
drawArray(array,0);