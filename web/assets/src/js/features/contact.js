export function init() {

	// Copy contact email address to clipboard when clicked

	if (document.querySelector(".copyemail")) {
		document.querySelector(".copyemail").addEventListener("click", (e) => {
			e.preventDefault();
			const copyText = document.querySelector(".copyemailinput");
			copyText.select();
			copyText.setSelectionRange(0, 100);
			document.execCommand("copy");
			document.querySelector(".copynotification").classList.add("visible");
			setTimeout(() => {
				document.querySelector(".copynotification").classList.remove("visible");
			}, 1500);
		});
	}

}