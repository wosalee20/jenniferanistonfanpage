let lastScrollTop = 0;

window.addEventListener("scroll", () => {
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	const header = document.querySelector("header");
	const isScrollingDown = scrollTop > lastScrollTop;

	header.classList.toggle("hidden", isScrollingDown);

	lastScrollTop = scrollTop;
});
function toggleMenu() {
	const menu = document.querySelector(".menu-links");
	const icon = document.querySelector(".hamburger-icon");
	menu.classList.toggle("open");
	icon.classList.toggle("open");
}

const loginForm = document.querySelector(".login-form");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const backToLoginLink = document.getElementById("backToLoginLink");

// Show the forgot password form when the link is clicked
forgotPasswordLink.addEventListener("click", (event) => {
	event.preventDefault();
	loginForm.style.display = "none";
	forgotPasswordForm.style.display = "block";
});

// Show the login form when the "RETURN TO SIGN IN" link is clicked
backToLoginLink.addEventListener("click", (event) => {
	event.preventDefault();
	loginForm.style.display = "block";
	forgotPasswordForm.style.display = "none";
});
