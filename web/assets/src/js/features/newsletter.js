export function init() {

	// Handle newsletter signup

	if (document.querySelector("form.newsletter-signup")) {

		const newsletterForm = document.querySelector("form.newsletter-signup");
		const emailField = document.querySelector("#email_address");
		const csrfField = document.querySelector("form.newsletter-signup input[type=hidden]");

		emailField.addEventListener("focus", (e) => {
			e.target.parentElement.classList.add("focused");
		});

		emailField.addEventListener("blur", (e) => {
			e.target.value == "" && e.target.parentElement.classList.remove("focused");
		});

		newsletterForm.addEventListener("submit", (e) => {
			e.preventDefault();

			const formData = new FormData();
			formData.append("email", emailField.value);
			formData.append("CRAFT_CSRF_TOKEN", csrfField.value);

			fetch("/actions/mailchimp-integration/signup/send", {
				method: "post",
				body: formData,
			});

			emailField.value = "";
			emailField.blur();
			newsletterForm.querySelector("label").textContent = "You're on the list. Speak soon!";
			newsletterForm.querySelector(".field").classList.remove("focused");
			newsletterForm.classList.add("submitted");
		});

	}

}