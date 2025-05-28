// DOM Elements
const titleScreen = document.getElementById("title-screen");
const scene = document.getElementById("scene");
const helloKitty = document.getElementById("hello-kitty");
const cinnamoroll = document.getElementById("cinnamoroll");
const kittySpeech = document.getElementById("kitty-speech");
const cinnamorollSpeech = document.getElementById("cinnamoroll-speech");
const polaroidSlider = document.getElementById("polaroid-slider");
const navButtons = document.querySelector(".nav-buttons");
const polaroidImages = document.querySelectorAll(".polaroid");

let currentIndex = 0; // Track the current conversation index
let polaroidIndex = 0; // Track the current Polaroid to display
let clickHereButton; // Declare the "Click Here" button globally
let feelingsButton; // Declare the "Click Here" button for feelings text
let promptDisplayed = false; // Flag to ensure the prompt is shown only once

// Conversations
const conversations = [
  {
    kitty: "ello",
    cinnamoroll: "ellooo mi cutu😚😚",
  },

  {
    kitty: "😔😔",
    cinnamoroll: " ",
  },
  {
    kitty: "kuch nahi. humko bas bahot gussa aa rha",
    cinnamoroll: "ole baba kya hogya?",
  },
  {
    kitty: " ",
    cinnamoroll: "theek ba.",
  },

  {
    kitty: "hum sed hogaya😔",
    cinnamoroll: " ",
  },

  { kitty: "no.", cinnamoroll: "mi dobi. comeeee hereeee🫂" },

  {
    kitty: "kuch nahi. baad mei kahenge aapko",
    cinnamoroll: "kya hua? hua kya?",
  },

  {
    kitty: "CHUP BILKUL CHUP",
    cinnamoroll: "anu. anu. anu. anu. anu.",
  },

  {
    kitty: "bolenge baad mei",
    cinnamoroll: "anu what happened? kisine kuch bola aapko?",
  },

  {
    kitty: "abhi i am trying to get it together",
    cinnamoroll: " ",
  },

  {
    kitty: " ",
    cinnamoroll: " ",
  },
  {
    kitty: "jeshh. abhi dimag thoda shant hai",
    cinnamoroll: "you there?😒",
  },

  {
    kitty: "THODA SHANT HAI.",
    cinnamoroll: "yayayayayayyayay!! felling better?",
  },

  {
    kitty: "KABHI BHI BLAST HO SAKTA HAI",
    cinnamoroll: " ",
  },

  {
    kitty: "PHIR TO HUM SABKO LINE MEI KHADA KARKE UNKI AUKAT DIKHA DENGE",
    cinnamoroll: " ",
  },

  {
    kitty: "TUM NA ZYADA BOLO MATT",
    cinnamoroll: "HUMPE KYU BHADAK RAHE HAI LEKIN AAP 😒",
  },

  {
    kitty: "PEG KAR DENGE TUMHE",
    cinnamoroll: " ",
  },

  {
    kitty: "THARKI SAALA",
    cinnamoroll: "🫦🫦",
  },

  {
    kitty: "HUH?",
    cinnamoroll: "JAO TUM HUMKO BAAT HI NAHI KARNA",
  },
  {
    kitty: "theek ba😔",
    cinnamoroll: "I MEAN -   JAO AAP😒",
  },
  {
    kitty: "KYA HAI AB",
    cinnamoroll: "rukiye abhi, we have something for YOU",
  },
  {
    kitty: " ",
    cinnamoroll: "SHH!! chup chap niche ka button pe click karo",
  },
];

// Start Title Screen
document.getElementById("start-btn").addEventListener("click", () => {
  titleScreen.style.display = "none";
  scene.style.display = "flex";
  animateCharacters();
  showConversation(0);
});

// Animate Characters
function animateCharacters() {
  gsap.from(cinnamoroll, { x: "-100%", duration: 1 });
  gsap.from(helloKitty, { x: "100%", duration: 1 });
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
    delay: 0.5,
  });

  handleSurprise(convo);
}

// Handle "Click Here" button visibility and event
function handleSurprise(conversation) {
  if (
    conversation.cinnamoroll === "SHH!! chup chap niche ka button pe click karo"
  ) {
    if (!clickHereButton) {
      // Create the "Click Here" button dynamically
      clickHereButton = document.createElement("button");
      clickHereButton.id = "click-here-btn";
      clickHereButton.textContent = "IDHAR IDHAR CHALE AAIYE";
      clickHereButton.style.position = "absolute";
      clickHereButton.style.bottom = "10%";
      clickHereButton.style.left = "40%";
      clickHereButton.style.transform = "translateX(-50%)";
      clickHereButton.style.padding = "10px 20px";
      clickHereButton.style.fontSize = "1.2rem";
      clickHereButton.style.backgroundColor = "#ff4980";
      clickHereButton.style.color = "white";
      clickHereButton.style.border = "none";
      clickHereButton.style.borderRadius = "5px";
      clickHereButton.style.cursor = "pointer";
      clickHereButton.style.zIndex = "10";

      // Add event listener to show Polaroid slider
      clickHereButton.addEventListener("click", () => {
        clickHereButton.style.display = "none"; // Hide the button
        showPolaroidSlider(); // Show the Polaroid slider
        //add a audio which plays when polaroid displayed
        const audio = new Audio("./SESAME.mp3");
        audio.play();
      });

      scene.appendChild(clickHereButton); // Add button to the scene
    }
    clickHereButton.style.display = "block"; // Ensure the button is visible
  } else if (clickHereButton) {
    clickHereButton.style.display = "none"; // Hide the button for other conversations
  }
}

// Show Polaroid Slider and hide characters and buttons
function showPolaroidSlider() {
  // Hide unnecessary elements
  helloKitty.style.display = "none";
  cinnamoroll.style.display = "none";
  navButtons.style.display = "none";
  kittySpeech.style.display = "none";
  cinnamorollSpeech.style.display = "none";

  // Attach event listener to display Polaroids one by one
  document.addEventListener("click", showNextPolaroid);
}

// Display Polaroids one by one on mouse click
function showNextPolaroid() {
  if (polaroidIndex < polaroidImages.length) {
    const currentPolaroid = polaroidImages[polaroidIndex];
    currentPolaroid.style.display = "block"; // Show the current Polaroid
    gsap.from(currentPolaroid, { opacity: 0, y: 50, duration: 0.8 }); // Animate its entry
    polaroidIndex++; // Move to the next Polaroid
  }

  // If it's the last Polaroid, show the prompt and button
  if (polaroidIndex === polaroidImages.length) {
    setTimeout(showFeelingsPrompt, 1000); // Delay to show the feelings prompt
  }
}

// Show feelings prompt after last Polaroid
function showFeelingsPrompt() {
  if (promptDisplayed) return; // Prevent showing the prompt multiple times

  const promptText = document.createElement("div");
  promptText.id = "feelings-prompt";
  promptText.textContent = "DO YOU WANNA KNOW HOW MUCH SHE MEANS TO ME?";
  promptText.style.textAlign = "center";
  promptText.style.fontSize = "1.5rem";
  promptText.style.marginTop = "20px";
  promptText.style.color = "#ff4980";

  feelingsButton = createButton("Click Here", displayFeelings);
  polaroidSlider.appendChild(promptText);
  polaroidSlider.appendChild(feelingsButton);

  promptDisplayed = true; // Flag set to prevent re-triggering
}

// Display feelings text (float around and disappear)
function displayFeelings() {
  feelingsButton.style.display = "none"; // Hide the button

  const feelings = [
    "Suniye abhi",
    "Hume nahi pata aapko kya hua",
    "Aur aap kyu gussa ho but i am hoping you're feeling better now.",
    "Vaise bhi getting angry is my thing agar aap hi gussa ho jaoge toh hum kya kare phir",
    "Abhi aapne ye kya kardiya dekho. Humein ye sab banane pe majbur kar diye aap",
    "Now chup chap study. gussa kyu karna khota khota",
    "Aap to humare cutu ho, aap angry young woman kahe bann rahe?",
    "I know aapka syllabus baki hoga or you might not be feeling so good recently",
    "Sab theek ho jayega. Ekto hum itna durr rehta hai",
    "Varna abhi aapko ghumi ghumi le jata",
    "im sorry hum office ka vajah se kabhi kabhi aapse baat nahi kar pata hun",
    "Idk if you know this",
    "But im so glad that i met you <3",
    "Aapko abhi humko batana ho kya hua toh bata sakte ho😚😚😚😚",
    "❤️",
    "❤️",
    "❤️",
    "❤️",
    "❤️",
    "❤️",
    "❤️",
    "❤️",
    "❤️",
    "❤️",
    "❤️",
    "❤️",
  ];

  let timeline = gsap.timeline();

  feelings.forEach((text, index) => {
    const feelingText = document.createElement("div");
    feelingText.textContent = text;
    feelingText.className = "floating-text";
    feelingText.style.position = "absolute";
    feelingText.style.fontSize = "1.5rem";
    feelingText.style.color = "black";
    feelingText.style.padding = "10px 20px";
    feelingText.style.backgroundColor = "rgb(255, 236, 236, 0.6)";
    feelingText.style.borderRadius = "5px";
    feelingText.style.fontFamily = "'Vibur', cursive";
    feelingText.style.fontWeight = "400";
    feelingText.style.fontStyle = "normal";

    // Randomize the initial position from different corners/sides but within viewport
    feelingText.style.left = `${Math.random() * 70 + 10}%`; // Ensures it's within bounds
    feelingText.style.top = `${Math.random() * 50 + 10}%`; // Ensures it's within bounds

    document.body.appendChild(feelingText);

    // Create the animation for this text
    timeline
      .from(feelingText, {
        opacity: 0,
        x: Math.random() * 300 - 150, // Random movement within screen bounds
        y: Math.random() * 300 - 150, // Random movement within screen bounds
        duration: 2, // Slower movement
        ease: "power1.out",
      })
      .to(feelingText, {
        opacity: 0,
        duration: 2,
        delay: 2, // Stay visible for 2 seconds
        onComplete: () => feelingText.remove(),
      });
  });

  // Once all the floating texts have been displayed, we can re-show the prompt
  timeline.add(() => {
    setTimeout(() => {
      showFeelingsPrompt();
    }, 3000); // Wait until all texts disappear before showing the prompt again
  });
}

// Helper function to create buttons
function createButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.padding = "10px 20px";
  button.style.fontSize = "1rem";
  button.style.backgroundColor = "#ff4980";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.marginTop = "20px";
  button.addEventListener("click", onClick);
  return button;
}

// Navigation Buttons
document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex > 0) showConversation(currentIndex - 1);
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < conversations.length - 1)
    showConversation(currentIndex + 1);
});
