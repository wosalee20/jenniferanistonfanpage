let lastScrollTop = 0;

window.addEventListener("scroll", () => {
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	const header = document.querySelector("header");
	const isScrollingDown = scrollTop > lastScrollTop;

	header.classList.toggle("hidden", isScrollingDown);

	lastScrollTop = scrollTop;
});

const fanCardAnnouncement = document.getElementById("fanCardAnnouncement");

function bounceInOnScroll() {
	const windowHeight = window.innerHeight;
	const fanCardAnnouncementRect = fanCardAnnouncement.getBoundingClientRect();
	const triggerPoint = windowHeight - fanCardAnnouncementRect.height / 2;

	if (fanCardAnnouncementRect.top < triggerPoint) {
		fanCardAnnouncement.style.opacity = 1;
		fanCardAnnouncement.style.transform = "translateY(0)";
		fanCardAnnouncement.style.animation = "bounce 0.8s ease-in-out";
		window.removeEventListener("scroll", bounceInOnScroll);
	}
}

window.addEventListener("scroll", bounceInOnScroll);

function toggleMenu() {
	const menu = document.querySelector(".menu-links");
	const icon = document.querySelector(".hamburger-icon");
	menu.classList.toggle("open");
	icon.classList.toggle("open");
}

function startSwingAnimation(element) {
	element.classList.add("swing-animation");
	// Remove the 'swing-animation' class after the animation completes
	setTimeout(() => {
		element.classList.remove("swing-animation");
	}, 500); // Adjust the time based on your animation duration
}

function stopSwingAnimation(element) {
	element.classList.remove("swing-animation");
}
