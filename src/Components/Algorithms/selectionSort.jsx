import { 
    COMPARE_COLOR, 
    FINAL_COLOR, 
    MakeDelay, 
    POSITION_FINAL_COLOR, 
    PRIMARY_COLOR, 
    SWAP_COLOR, 
    Swap, 
    MIN_COLOR, 
    disableAllButtons, 
    delay 
} from "../Utilities/utils";

export async function selectionSort() {
    disableAllButtons(true);
    const elements = document.querySelectorAll('.element-bar');
    document.getElementById("ssort").className = 'btndisabled';
    const n = elements.length;

    for (let i = 0; i < n; i++) {
        let min = i;

        for (let j = i + 1; j < n; j++) {
            elements[min].style.background = MIN_COLOR;
            elements[j].style.background = COMPARE_COLOR;

            await MakeDelay(delay);

            if (parseInt(elements[j].style.height) < parseInt(elements[min].style.height)) {
                elements[min].style.background = PRIMARY_COLOR;
                min = j;
            } else {
                elements[j].style.background = PRIMARY_COLOR;
            }
        }

        if (min !== i) {
            elements[i].style.background = SWAP_COLOR;
            elements[min].style.background = SWAP_COLOR;

            await MakeDelay(delay);

            elements[min].style.background = PRIMARY_COLOR;
            elements[i].style.background = PRIMARY_COLOR;

            Swap(elements[min], elements[i]);
        }

        await MakeDelay(delay);
        elements[i].style.background = POSITION_FINAL_COLOR;
    }

    for (let i = 0; i < n; i++) {
        await MakeDelay(delay);
        elements[i].style.background = FINAL_COLOR;
    }

    document.getElementById("ssort").className = 'btn';
    disableAllButtons(false);
}
