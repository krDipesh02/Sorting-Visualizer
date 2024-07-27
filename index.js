
// declaring size of array and array
const n = 100;
const arr = [];
var selectedAlgorithm;

initialize();

//assigning random values to array
function initialize(){
    for(let i=0; i<n; i++)
    {
        arr[i] = (Math.random());
    }
    showBars();
}

//function for which sorting algo is chosen from dropdown menu 
document.addEventListener('DOMContentLoaded', () => {
    const sortingDropdown = document.getElementById('sortingDropdown');
  
    sortingDropdown.addEventListener('click', (event) => {
      if (event.target.classList.contains('dropdown-item')) {
        selectedAlgorithm = event.target.textContent;
        //console.log('Selected Algorithm:', selectedAlgorithm);
        play(selectedAlgorithm);
      }
    });
  });

//function to animate the algo when start button is clicked
function play(selectedAlgorithm)
{
    document.querySelector(".start-button").addEventListener('click',()=>{
        console.log(`Chosen Algorithm: ${selectedAlgorithm}`);
        choose_sorting(selectedAlgorithm,arr);
    });
}

//function for comparing which algo is chosen among the algorithms
function choose_sorting(selectedAlgorithm,arr)
{
    if(selectedAlgorithm == "Selection Sort")
    {
        const dummy_array = [...arr];
        const swaps = selectionSort(dummy_array);
        animate(swaps);
    }
    else if(selectedAlgorithm == "Bubble Sort")
    {
        const dummy_array = [...arr];
        const swaps = bubbleSort(dummy_array);
        animate(swaps);
    }

    else if(selectedAlgorithm == "Insertion Sort")
    {
        const dummy_array = [...arr];
        const swaps = animateInsertionSort(dummy_array);
        animate(swaps);
    }
}

//Animating swaps
function animate(swaps){
    if(swaps.length == 0)
    {
        showBars();
        return ;
    }

    const[i,j] = swaps.shift();
    [arr[i],arr[j]] = [arr[j],arr[i]];
    showBars([i,j]);
    setTimeout(function(){
        animate(swaps);
    },10);
}

// implementing bubble sort
function bubbleSort(arr){
    const swaps = [];
    do{
        var swapped = false;
        for(let i = 1; i< arr.length; i++)
        {
            if(arr[i-1] > arr[i])
            {
                swapped = true;
                swaps.push([i-1,i]);
                [arr[i-1],arr[i]] = [arr[i],arr[i-1]];
            }
        }
    }while(swapped);
    return swaps;
}

//implementing selection sort
function selectionSort(arr) {
    const swaps = [];
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        swaps.push([i,minIdx]);
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }

    return swaps;
}

// Animate insertion sort
async function animateInsertionSort(arr) {
    const swaps = await insertionSort(arr);
    animate(swaps);
}

// Insertion sort implementation
async function insertionSort(arr) {
    const swaps = [];
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            swaps.push([j, j - 1]);
            [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
            j--;
        }
    }
    return swaps;
}

//creating bars according to arrray values
function showBars(indexes){
    container.innerHTML = "";
    for(let i=0; i<arr.length; i++)
    {
        let bar = document.createElement("div");
        bar.style.height = arr[i]*100 + "%";
        bar.classList.add("bar");

        if(indexes && indexes.includes(i))
        {
            bar.style.backgroundColor = "red";
        }
        container.appendChild(bar);
    }
}



