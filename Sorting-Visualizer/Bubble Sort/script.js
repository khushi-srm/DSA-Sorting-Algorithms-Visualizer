const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sortButton = document.getElementById('sort-button');

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

async function bubbleSort(array) {
    let n = array.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray(array,j+1);
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
    }
}

drawArray(array,0);

sortButton.addEventListener('click', async () => {
    await bubbleSort(array);
});

function resetFunc(){
    array = generateRandomArray(40);
    drawArray(array,0);
}
reset.addEventListener('click',()=>{
    resetFunc();
})