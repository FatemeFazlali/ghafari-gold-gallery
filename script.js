/* =========================================
   GHAFARI GOLD GALLERY
   Clipboard / Copy Functions
========================================= */

function copyLink(text) {

    // Modern Clipboard API
    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        navigator.clipboard.writeText(text)
            .then(function () {
                showCopyMessage("✓ کپی شد");
            })
            .catch(function () {
                fallbackCopy(text);
            });

        return;
    }

    // Older-browser fallback
    fallbackCopy(text);
}


function fallbackCopy(text) {

    const textarea = document.createElement("textarea");

    textarea.value = text;

    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    textarea.style.width = "1px";
    textarea.style.height = "1px";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    textarea.setSelectionRange(
        0,
        textarea.value.length
    );

    let copied = false;

    try {
        copied = document.execCommand("copy");
    } catch (error) {
        copied = false;
    }

    document.body.removeChild(textarea);

    if (copied) {
        showCopyMessage("✓ کپی شد");
    } else {
        showCopyMessage("⚠ کپی انجام نشد");
    }
}


function showCopyMessage(message) {

    const toast =
        document.getElementById("copy-toast");

    if (!toast) {
        alert(message);
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    if (window.copyToastTimer) {
        clearTimeout(window.copyToastTimer);
    }

    window.copyToastTimer =
        setTimeout(function () {
            toast.classList.remove("show");
        }, 2000);
}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Ghafari Gold Gallery page loaded successfully."
        );

    }
);
