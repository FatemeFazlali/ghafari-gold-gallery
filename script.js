function copyLink(text) {

    navigator.clipboard.writeText(text)
        .then(function () {

            showCopyMessage();

        })
        .catch(function () {

            // Fallback for older browsers

            const textarea =
                document.createElement("textarea");

            textarea.value = text;

            document.body.appendChild(textarea);

            textarea.select();

            document.execCommand("copy");

            document.body.removeChild(textarea);

            showCopyMessage();

        });
}


function showCopyMessage() {

    const toast =
        document.getElementById("copy-toast");

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2000);
}
