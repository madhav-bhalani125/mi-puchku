
// DOM Elements
const titleScreen = document.getElementById("title-screen");
const scene = document.getElementById("scene");
const helloKitty = document.getElementById("hello-kitty");
const cinnamoroll = document.getElementById("cinnamoroll");
const kittySpeech = document.getElementById("kitty-speech");
const cinnamorollSpeech = document.getElementById("cinnamoroll-speech");
const polaroidSlider = document.getElementById("polaroid-slider");

// Conversations
const conversations = [
  {
    kitty: "I'm feeling a little sad...",
    cinnamoroll: "Don’t worry, I’m here for you!",
  },
  {
    kitty: "I love sunny days!",
    cinnamoroll: "Me too! Let’s go for a picnic!",
  },
  {
    kitty: "What’s your favorite snack?",
    cinnamoroll: "Anything sweet, especially cakes!",
  },
  { kitty: "You’re my best friend.", cinnamoroll: "And you’re mine, Kitty!" },
  { cinnamoroll: "Look down there, I have a surprise for you!" },
];

let currentIndex = 0;
let clickHereButton; // Declare the button globally

// Start Title Screen
document.getElementById("start-btn").addEventListener("click", () => {
  titleScreen.style.display = "none";
  scene.style.display = "flex";
  animateCharacters();
  showConversation(0);
});

// Animate Characters
function animateCharacters() {
  gsap.from(helloKitty, { x: "-100%", duration: 1 });
  gsap.from(cinnamoroll, { x: "100%", duration: 1 });
}

// Show Conversation
function showConversation(index) {
  if (index >= conversations.length) return; // Prevent overflow

  currentIndex = index;
  const convo = conversations[index];
  kittySpeech.textContent = convo.kitty || "";
  cinnamorollSpeech.textContent = convo.cinnamoroll || "";

  gsap.to(kittySpeech, { display: "block", opacity: 1, duration: 0.5 });
  gsap.to(cinnamorollSpeech, {
    display: "block",
    opacity: 1,
    duration: 0.5,
    delay: 1,
  });

  // Handle surprise button logic
  handleSurprise(convo);
}

// Function to handle "Click Here" button visibility
function handleSurprise(conversation) {
  if (
    conversation.cinnamoroll === "Look down there, I have a surprise for you!"
  ) {
    if (!clickHereButton) {
      // Create the button dynamically
      clickHereButton = document.createElement("button");
      clickHereButton.id = "click-here-btn";
      clickHereButton.textContent = "Click Here";
      clickHereButton.style.position = "absolute";
      clickHereButton.style.bottom = "10%";
      clickHereButton.style.left = "50%";
      clickHereButton.style.transform = "translateX(-50%)";
      clickHereButton.style.padding = "10px 20px";
      clickHereButton.style.fontSize = "1.2rem";
      clickHereButton.style.backgroundColor = "#ff4980";
      clickHereButton.style.color = "white";
      clickHereButton.style.border = "none";
      clickHereButton.style.borderRadius = "5px";
      clickHereButton.style.cursor = "pointer";
      clickHereButton.style.zIndex = "10";

      // Add event listener for button click
      clickHereButton.addEventListener("click", () => {
        clickHereButton.style.display = "none"; // Hide the button
        showPolaroidSlider(); // Show the Polaroid slider
      });

      scene.appendChild(clickHereButton); // Add button to the scene
    }
    clickHereButton.style.display = "block"; // Ensure the button is visible
  } else if (clickHereButton) {
    clickHereButton.style.display = "none"; // Hide the button for other conversations
  }
}

// Function to handle the Polaroid slider
function showPolaroidSlider() {
  gsap.to(polaroidSlider, { opacity: 1, duration: 1, display: "flex" });
}

// Navigation Buttons
document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex > 0) showConversation(currentIndex - 1);
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < conversations.length - 1)
    showConversation(currentIndex + 1);
});

// Polaroid Slider Click
document.querySelectorAll(".polaroid").forEach((polaroid, index) => {
  polaroid.addEventListener("click", () => {
    alert(`Dialogue for photo ${index + 1}`);
  });
});
