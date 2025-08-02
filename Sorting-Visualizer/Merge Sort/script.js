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

async function merge(array, s, mid, e) {
    let temp = [];
    let i = s, j = mid + 1;
    while (i <= mid && j <= e) {
        if (array[i] <= array[j]) {
            temp.push(array[i]);
            i++;
        } else {
            temp.push(array[j]);
            j++;
        }
    }
    while (i <= mid) {
        temp.push(array[i]);
        i++;
    }
    while (j <= e) {
        temp.push(array[j]);
        j++;
    }
    for (let idx = 0; idx < temp.length; idx++) {
        array[idx + s] = temp[idx];
        drawArray(array,idx+s);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    drawArray(array,i);  // Visualize the current state
    await new Promise(resolve => setTimeout(resolve, 50));  // Delay for visualization
}

async function mergeSort(array, s, e) {
    if (s < e) {
        let mid = Math.floor(s + (e - s) / 2);
        await mergeSort(array, s, mid);
        await mergeSort(array, mid + 1, e);
        await merge(array, s, mid, e);
    }
}

function resetFunc(){
    array = generateRandomArray(40);
    drawArray(array);
}

button.addEventListener('click',async ()=>{
    await mergeSort(array,0,array.length-1);
});

reset.addEventListener('click',()=>{
    resetFunc();
})

console.log(array);
drawArray(array);