const colorPicker = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");


const copyColor = ele => {
    navigator.clipboard.writeText(ele.dataset.color);
    ele.innerText = "COPIED";
    setTimeout(() => ele.innerText = ele.dataset.color, 1000);
}



const showColors = () => {
    if(!pickedColors.length) return; 
    colorList.innerHTML = pickedColors.map(color => 
        `<li class="color">
            <span class="rect" style="background: ${color}; border: 1px solid ${color === "#ffffff" ? "#ccc":color }"></span>
            <span class="value" data-color="${color}">${color}</span>
        </li>
        `
    ).join("");
    document.querySelector(".picked-colors").classList.remove("hide");
    // add a click event to each color element to copy the color code
    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });
};
showColors();




const activateEyeDroper = () => {
    document.body.style.display = "none";
    setTimeout(async () => {
        try {
            // Openning the eye dropper and getting the selected color
            const eyeDropper = new EyeDropper();
            const { sRGBHex } = await eyeDropper.open();
            navigator.clipboard.writeText(sRGBHex);
            // Adding the color to the list if it doesn't already exist
            if(!pickedColors.includes(sRGBHex)) {
                pickedColors.push(sRGBHex);
                localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
                showColors();
            }
        } catch(error) {
            console.log("Faild to copy the color code!");
        }
        document.body.style.display = "block";
    }, 10);
}



// Clearing all picked colors, updating local storage, and hiding the pickedColors element
const clearAllColors = () => {
    pickedColors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
}

clearAll.addEventListener("click", clearAllColors);
colorPicker.addEventListener("click", activateEyeDroper);