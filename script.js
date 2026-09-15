/* =========================================
   GHAFARI GOLD GALLERY
   Clipboard / Copy Functions
========================================= */


/**
 * Copy text to the user's clipboard.
 * Works with modern browsers and has a
 * fallback for browsers where Clipboard API
 * is unavailable.
 */
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


/**
 * Fallback copy method.
 */
function fallbackCopy(text) {

    const textarea = document.createElement("textarea");

    textarea.value = text;

    // Keep textarea invisible
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    textarea.style.width = "1px";
    textarea.style.height = "1px";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    // Make sure the complete value is selected
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


/**
 * Show the small copy notification.
 */
function showCopyMessage(message) {

    const toast =
        document.getElementById("copy-toast");

    // If toast element doesn't exist,
    // use an alert as a last resort.
    if (!toast) {

        alert(message);

        return;

    }

    toast.textContent = message;

    toast.classList.add("show");

    // Clear any existing timer
    if (window.copyToastTimer) {

        clearTimeout(window.copyToastTimer);

    }

    // Hide after 2 seconds
    window.copyToastTimer =
        setTimeout(function () {

            toast.classList.remove("show");

        }, 2000);
}


/* =========================================
   PAGE READY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Ghafari Gold Gallery page loaded successfully."
        );

    }
);
