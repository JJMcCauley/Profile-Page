const svg1 = document.getElementById("logo-1");
const svg2 = document.getElementById("logo-2");
const toFill = document.getElementsByClassName("to-fill");
const toFillArray = [...toFill]

svg1.addEventListener("mouseenter", () => {
    toFillArray[0].classList.add("orange-fill");
    toFillArray[1].classList.add("orange-fill");
})

svg1.addEventListener("mouseleave", () => {
    toFillArray[0].classList.remove("orange-fill");
    toFillArray[1].classList.remove("orange-fill");
})

if (svg2) {
    svg2.addEventListener("mouseenter", () => {
        toFillArray[2].classList.add("orange-fill");
        toFillArray[3].classList.add("orange-fill");
    })

    svg2.addEventListener("mouseleave", () => {
        toFillArray[2].classList.remove("orange-fill");
        toFillArray[3].classList.remove("orange-fill");
    })
}