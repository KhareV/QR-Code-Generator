const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");
const spinner = document.getElementById("spinner");
const scanner = document.getElementById("qrCodeContainer");

const onGenerateSubmit = (e) => {
    e.preventDefault();
    clearUI();

    const url = document.getElementById("url").value;
    const size = document.getElementById("size").value;

    if (url === "") {
        alert("Please enter a URL");
    } else {
        showSpinner();
        setTimeout(() => {
            hideSpinner();
            generateQRCode(url, size);
            scanner.style.display = "block";
            setTimeout(() => createSaveBtn(qr.querySelector("canvas").toDataURL()), 50);
        }, 1000);
    }
};

const generateQRCode = (url, size) => {
    new QRCode("qrcode", { text: url, width: size, height: size });
};

const clearUI = () => {
    qr.innerHTML = "";
    const saveBtn = document.getElementById("save-link");
    if (saveBtn) saveBtn.remove();
};

const showSpinner = () => spinner.style.display = "block";
const hideSpinner = () => spinner.style.display = "none";

const createSaveBtn = (saveUrl) => {
    const link = document.createElement("a");
    link.id = "save-link";
    link.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.innerHTML = "Save Image";
    link.href = saveUrl;
    link.download = "qrcode.png";
    document.getElementById("generated").appendChild(link);
};

hideSpinner();
form.addEventListener("submit", onGenerateSubmit);
