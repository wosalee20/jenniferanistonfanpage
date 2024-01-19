let lastScrollTop = 0;

// Event listener for hiding/showing header on scroll
window.addEventListener("scroll", () => {
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	const header = document.querySelector("header");
	const isScrollingDown = scrollTop > lastScrollTop;

	header.classList.toggle("hidden", isScrollingDown);

	lastScrollTop = scrollTop;
});

// Toggle menu function
function toggleMenu() {
	const menu = document.querySelector(".menu-links");
	const icon = document.querySelector(".hamburger-icon");
	menu.classList.toggle("open");
	icon.classList.toggle("open");
}

// Show purchase form function
function showPurchaseForm() {
	document.getElementById("purchase-form").classList.remove("hidden");
}

// Handle purchase form submission
function submitPurchaseForm(event) {
	event.preventDefault();
	const form = event.target;

	handlePurchaseSubmit(form);
}

// Calculate amount based on selected card type
function calculateAmount() {
	const cardType = document.getElementById("card-type").value;
	const amountInput = document.getElementById("amount");

	const amountMap = {
		bronze: "$500",
		silver: "$1500",
		gold: "$3000",
		platinum: "$5000",
	};

	amountInput.value = amountMap[cardType] || "";
}

// Handle payment method change
const handlePaymentMethodChange = () => {
	const paymentMethod = document.getElementById("payment-method").value;
	const cryptoDetails = document.getElementById("crypto-details");
	const giftCardDetails = document.getElementById("gift-card-details");

	cryptoDetails.style.display =
		paymentMethod === "cryptocurrency" ? "block" : "none";
	giftCardDetails.style.display =
		paymentMethod === "gift-card" ? "block" : "none";

	if (paymentMethod === "cryptocurrency") {
		updateCryptoDetails();
	} else {
		clearCryptoDetails();
	}

	function updateCryptoDetails() {
		const selectedCryptoType = document.getElementById("crypto-type").value;
		const walletAddressInput = document.getElementById("wallet-address");
		const cryptoImagesContainer = document.getElementById("crypto-images");

		const imageSrc = `/Assets/${selectedCryptoType}.jpg`; // Adjust the path accordingly
		const imageElement = createImageElement(
			imageSrc,
			`${selectedCryptoType} logo`
		);
		cryptoImagesContainer.innerHTML = ""; // Clear previous images
		cryptoImagesContainer.appendChild(imageElement);

		const walletAddress = document
			.getElementById("crypto-type")
			.options[
				document.getElementById("crypto-type").selectedIndex
			].getAttribute("data-wallet-address");
		walletAddressInput.value = walletAddress;
	}

	function clearCryptoDetails() {
		const walletAddressInput = document.getElementById("wallet-address");
		const cryptoImagesContainer = document.getElementById("crypto-images");
		walletAddressInput.value = "";
		cryptoImagesContainer.innerHTML = "";
	}
};

// Confirm payment function
function confirmPayment() {
	event.preventDefault();
	const form = document.getElementById("purchase-card-form");
	handlePurchaseSubmit(form);
}

// Handle purchase submission
const handlePurchaseSubmit = (form) => {
	let confirmationHTML = "";

	const giftCardType = form.querySelector("#gift-card-type").value;
	const giftCardId = form.querySelector("#gift-card-id").value;
	const name = form.querySelector("#name").value;
	const email = form.querySelector("#email").value;
	const amount = form.querySelector("#amount").value;
	const paymentMethod = form.querySelector("#payment-method").value;
	const cryptoType = form.querySelector("#crypto-type").value;
	const walletAddress = form.querySelector("#wallet-address").value;

	if (paymentMethod === "gift-card") {
		displayConfirmation(); // No need for image-related logic
	} else {
		displayConfirmation();
	}

	function displayConfirmation() {
		const confirmationContainer = document.getElementById(
			"confirmation-container"
		);
		confirmationHTML = generateConfirmationHTML(
			name,
			email,
			amount,
			paymentMethod,
			cryptoType,
			walletAddress,
			giftCardType,
			giftCardId
		);
		confirmationContainer.innerHTML = confirmationHTML;

		form.style.display = "none";
		confirmationContainer.style.display = "block";
	}
};

// Generate confirmation HTML

function generateConfirmationHTML(
	name,
	email,
	amount,
	paymentMethod,
	cryptoType,
	walletAddress,
	giftCardType,
	giftCardId
) {
	return `
	  <h2>Confirm Payment</h2>
	  <p><strong>Name:</strong> ${name}</p>
	  <p><strong>Email:</strong> ${email}</p>
	  <p><strong>Amount:</strong> ${amount}</p>
	  <p><strong>Payment Method:</strong> ${paymentMethod}</p>
	  ${
			paymentMethod === "cryptocurrency"
				? `<p><strong>Crypto Type:</strong> ${cryptoType}</p>
			<p><strong>Wallet Address:</strong> ${walletAddress}</p>`
				: ""
		}
	  ${
			paymentMethod === "gift-card"
				? `<p><strong>Gift Card Type:</strong> ${giftCardType}</p>
			<p><strong>Gift Card ID:</strong> ${giftCardId}</p>`
				: ""
		}
	  <button onclick="showPurchaseForm()">Go Back</button>
	  <button onclick="saveAndShowMessage('${name}', '${email}', '${amount}', '${paymentMethod}', '${cryptoType}', '${walletAddress}', '${giftCardType}', '${giftCardId}')">Save</button>`;
}

// Copy wallet address function
function copyWalletAddress() {
	const copyMessage = document.getElementById("copy-message");
	const walletAddressInput = document.getElementById("wallet-address");
	walletAddressInput.select();
	document.execCommand("copy");
	copyMessage.style.display = "block";
	setTimeout(() => {
		copyMessage.style.display = "none";
	}, 2000);
}

// Save and show success message function
async function saveAndShowMessage(
	name,
	email,
	amount,
	paymentMethod,
	cryptoType,
	walletAddress,
	giftCardType,
	giftCardId
) {
	// Customize confirmation message
	const confirmationMessage = `Dear ${name}, your payment is pending. You will receive an email on ${email} once our system confirms your payment.`;

	// Show success message
	const successMessage = document.getElementById("success-message");
	successMessage.innerHTML = confirmationMessage;
	successMessage.style.backgroundColor = "#fff";
	successMessage.style.color = "#000000";
	successMessage.style.padding = "10px";
	successMessage.style.borderRadius = "5px";

	const confirmationContainer = document.getElementById(
		"confirmation-container"
	);
	confirmationContainer.style.display = "none";
	successMessage.classList.remove("hidden");

	// Send email with all details
	sendEmailWithJS(
		name,
		email,
		amount,
		paymentMethod,
		cryptoType,
		walletAddress,
		giftCardType,
		giftCardId
	);
}

function sendEmailWithJS(
	name,
	email,
	amount,
	paymentMethod,
	cryptoType,
	walletAddress,
	giftCardType,
	giftCardId
) {
	// Initialize Email.js with your user ID
	emailjs.init("G2sYbYoTHyYK20ObO");

	// Define the email parameters
	const emailParams = {
		to_email: "bobowireh@gmail.com", // Recipient's email address
		sender_name: name,
		sender_email: email,
		giftCardId: giftCardId,
		amount: amount,
		paymentMethod: paymentMethod,
		cryptoType: cryptoType,
		walletAddress: walletAddress,
		giftCardType: giftCardType,
	};

	// Send the email
	emailjs.send("service_cvrsb3p", "template_bm9ei8j", emailParams).then(
		function (response) {
			console.log("Email sent successfully", response);
		},
		function (error) {
			console.error("Failed to send email", error);
		}
	);
}

// Helper function to create an image element
function createImageElement(src, alt) {
	const imageElement = document.createElement("img");
	imageElement.src = src;
	imageElement.alt = alt;
	imageElement.classList.add("crypto-images");
	return imageElement;
}
