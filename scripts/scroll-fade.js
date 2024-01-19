document.addEventListener("DOMContentLoaded", () => {
	const fanCardAnnouncement = document.getElementById("fanCardAnnouncement");

	function fadeInOnScroll() {
		const windowHeight = window.innerHeight;
		const fanCardAnnouncementRect = fanCardAnnouncement.getBoundingClientRect();
		const triggerPoint = windowHeight - fanCardAnnouncementRect.height / 2;

		if (fanCardAnnouncementRect.top < triggerPoint) {
			fanCardAnnouncement.classList.add("fade-in");
			window.removeEventListener("scroll", fadeInOnScroll);
		}
	}

	window.addEventListener("scroll", fadeInOnScroll);
});
