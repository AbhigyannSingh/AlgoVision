import { 
    FINAL_COLOR, 
    MakeDelay, 
    POSITION_FINAL_COLOR, 
    PRIMARY_COLOR, 
    COMPARE_COLOR, 
    SWAP_COLOR, 
    Swap, 
    randomNumberFrom, 
    MIN_COLOR, 
    disableAllButtons, 
    delay 
} from "../Utilities/utils";

async function partition(elements, start, end) {
    const pivotIndex = randomNumberFrom(start, end);
    Swap(elements[pivotIndex], elements[end]);
    await MakeDelay(delay);
    elements[end].style.background = MIN_COLOR; // Current pivot color
    let pivotPosition = start;

    for (let i = start; i < end; i++) {
        elements[i].style.background = COMPARE_COLOR;

        if (parseInt(elements[i].style.height) < parseInt(elements[end].style.height)) {
            elements[pivotPosition].style.background = COMPARE_COLOR;
            await MakeDelay(delay);
            Swap(elements[i], elements[pivotPosition]);
            await MakeDelay(delay);
            elements[i].style.background = SWAP_COLOR;
            elements[pivotPosition].style.background = SWAP_COLOR;
            
            if (pivotPosition !== start) {
                elements[pivotPosition - 1].style.background = PRIMARY_COLOR;
            }

            pivotPosition++;
        }

        await MakeDelay(delay);
        elements[i].style.background = PRIMARY_COLOR;
        elements[pivotPosition].style.background = PRIMARY_COLOR;
    }

    elements[end].style.background = PRIMARY_COLOR; // Pivot to original color
    await MakeDelay(delay);
    Swap(elements[pivotPosition], elements[end]);
    await MakeDelay(delay);
    elements[pivotPosition].style.background = POSITION_FINAL_COLOR;

    return pivotPosition;
}

async function quickSortHelper(elements, start, end) {
    if (start >= end) {
        if (start === end) {
            elements[start].style.background = POSITION_FINAL_COLOR;
        }
        return;
    }

    const pivot = await partition(elements, start, end);
    await quickSortHelper(elements, start, pivot - 1);
    await quickSortHelper(elements, pivot + 1, end);
}

export async function quickSort() {
    disableAllButtons(true);
    document.getElementById("qsort").className = 'btndisabled';

    const elements = document.querySelectorAll('.element-bar');
    const n = elements.length;
    await quickSortHelper(elements, 0, n - 1);

    for (let i = 0; i < n; i++) {
        await MakeDelay(delay);
        elements[i].style.background = FINAL_COLOR;
    }

    document.getElementById("qsort").className = 'btn';
    disableAllButtons(false);
}
