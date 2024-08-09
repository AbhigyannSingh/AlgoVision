import { 
    COMPARE_COLOR, 
    delay, 
    disableAllButtons, 
    FINAL_COLOR, 
    MakeDelay, 
    POSITION_FINAL_COLOR, 
    PRIMARY_COLOR, 
    Swap, SWAP_COLOR 
} from "../Utilities/utils";

let n;

function gap(g) {
    if (g <= 1) {
        return 0;
    }
    return Math.ceil(g / 2);
}

async function inPlaceMerge(arr, start, end) {
    const g = gap(end - start + 1);

    for (let i = start; i <= end; i++) {
        await MakeDelay(20);
        arr[i].style.background = COMPARE_COLOR;
    }

    for (let currentGap = g; currentGap > 0; currentGap = gap(currentGap)) {
        for (let i = start; i + currentGap <= end; i++) {
            const j = i + currentGap;
            arr[i].style.background = COMPARE_COLOR;
            arr[j].style.background = COMPARE_COLOR;
            await MakeDelay(delay);

            if (parseInt(arr[i].style.height) > parseInt(arr[j].style.height)) {
                arr[i].style.background = SWAP_COLOR;
                arr[j].style.background = SWAP_COLOR;
                await MakeDelay(delay);
                Swap(arr[i], arr[j]);
            }

            await MakeDelay(delay);
            if (end === n && start === 0) {
                arr[i].style.background = POSITION_FINAL_COLOR;
                arr[j].style.background = POSITION_FINAL_COLOR;
            } else {
                arr[i].style.background = PRIMARY_COLOR;
                arr[j].style.background = PRIMARY_COLOR;
            }
        }
    }
}

async function mergeSortHelper(arr, start, end) {
    if (start >= end) {
        return;
    }

    const mid = start + Math.floor((end - start) / 2);
    await mergeSortHelper(arr, start, mid);
    await mergeSortHelper(arr, mid + 1, end);
    await inPlaceMerge(arr, start, end);
}

export async function mergeSort() {
    disableAllButtons(true);
    document.getElementById("msort").className = 'btndisabled';

    const arr = document.querySelectorAll('.element-bar');
    n = arr.length;
    await mergeSortHelper(arr, 0, n - 1);

    for (let i = 0; i < n; i++) {
        await MakeDelay(delay);
        arr[i].style.background = FINAL_COLOR;
    }

    document.getElementById("msort").className = 'btn';
    disableAllButtons(false);
}
