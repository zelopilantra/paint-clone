const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const color = document.querySelector(".color");
const tools = document.querySelectorAll(".tool");
const sizeButtons = document.querySelectorAll(".size");
const clear = document.querySelector(".clear");

let brushSize = 20;

let isPainting = false;

let activeTool = "brush";
color.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value;
});
canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
    isPainting = true;

    if (activeTool == "brush") {
        draw(clientX, clientY);
    }
    if (activeTool == "eraser") {
        erase(clientX, clientY);
    }
});
canvas.addEventListener("mouseup", ({ clientX, clientY }) => {
    isPainting = false;
});
canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
    if (isPainting) {
        if (activeTool == "brush") {
            draw(clientX, clientY);
        }
        if (activeTool == "eraser") {
            erase(clientX, clientY);
        }
    }
});

const draw = (x, y) => {
    ctx.beginPath();
    ctx.globalCompositeOperation = "source-over";
    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop,
        brushSize / 2,
        0,
        2 * Math.PI
    );
    ctx.fill();
};
const erase = (x, y) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();

    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop,
        brushSize / 2,
        0,
        2 * Math.PI
    );
    ctx.fill();
};

const selectTool = ({ target }) => {
    const selectedTool = target.closest("button");
    const action = selectedTool.getAttribute("data-action");
    if (action) {
        tools.forEach((tool) => tool.classList.remove("active"));
        selectedTool.classList.add("active");
        activeTool = action;
    }
};

tools.forEach((tool) => {
    tool.addEventListener("click", selectTool);
});
const selectSize = ({ target }) => {
    const selectedTool = target.closest("button");
    const size = selectedTool.getAttribute("data-size");

    sizeButtons.forEach((button) => button.classList.remove("active"));
    selectedTool.classList.add("active");
    brushSize = size;
};

sizeButtons.forEach((button) => {
    button.addEventListener("click", selectSize);
});

clear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
