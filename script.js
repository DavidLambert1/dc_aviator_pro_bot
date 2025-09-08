const PASSWORD = "0900";
// Predefined coefficient array for prediction system
const COEFFICIENTS = [3.68, 2.11, 1.59, 1.21, 1.94, 1.16, 14.72, 17.52, 1.11, 1.42, 6.68, 1.30, 1.36];
let currentIndex = 0;
let history = [];
let isGenerating = false;

function showPasswordPrompt() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("password-screen").classList.remove("hidden");
  // Clear any previous error messages
  document.getElementById("wrong-password").classList.add("hidden");
  document.getElementById("psw-input-custom").value = "";
}

function checkPassword() {
  const input = document.getElementById("psw-input-custom").value;
  if (input === PASSWORD) {
    document.getElementById("password-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.remove("hidden");
    // Add success animation
    showSuccessMessage();
  } else {
    document.getElementById("wrong-password").classList.remove("hidden");
    // Add shake animation to input
    shakeInput();
  }
}

function contactAdmin() {
  window.open("https://t.me/daniel_costa_dc", "_blank");
}

function generateCoefficient() {
  if (isGenerating) return;
  
  isGenerating = true;
  const button = event.target;
  const originalText = button.innerText;
  
  // Show loading state
  button.innerText = "Ottenendo...";
  button.disabled = true;
  
  // Simulate processing time
  setTimeout(() => {
    // Get next coefficient from array in sequence
    const value = COEFFICIENTS[currentIndex];
    currentIndex = (currentIndex + 1) % COEFFICIENTS.length; // Cycle back to beginning
    
    const box = document.getElementById("coefficient-box");
    box.innerHTML = `
      <div style="font-size: 0.8em; margin-bottom: 10px; opacity: 0.8;">COEFFICIENTE</div>
      <div style="font-size: 1.2em; font-weight: 900;">${value}x</div>
    `;
    box.classList.remove("hidden");
    
    // Add generation animation
    box.style.animation = "none";
    setTimeout(() => {
      box.style.animation = "pulse 2s ease-in-out infinite";
    }, 10);
    
    updateHistory(value);
    
    // Reset button
    button.innerText = originalText;
    button.disabled = false;
    isGenerating = false;
  }, 1500);
}

function updateHistory(value) {
  history.unshift(value);
  if (history.length > 10) history.pop();
  
  const ticker = document.getElementById("history-ticker");
  ticker.innerHTML = `
    <span style="color: #4ecdc4; font-weight: 600;">Coefficienti Recenti:</span> 
    ${history.join(" • ")}
  `;
  
}

function showSuccessMessage() {
  const mainScreen = document.getElementById("main-screen");
  const successDiv = document.createElement("div");
  successDiv.innerHTML = `
    <div style="color: #4ecdc4; font-size: 1.1rem; margin-bottom: 20px; animation: fadeIn 0.5s ease-in;">
      ✓ Accesso concesso! Benvenuto nel sistema di previsione.
    </div>
  `;
  successDiv.style.cssText = `
    text-align: center;
    padding: 20px;
    background: rgba(78, 205, 196, 0.1);
    border-radius: 15px;
    margin-bottom: 20px;
    border: 1px solid rgba(78, 205, 196, 0.3);
  `;
  
  mainScreen.insertBefore(successDiv, mainScreen.firstChild);
  
  // Remove success message after 3 seconds
  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.parentNode.removeChild(successDiv);
    }
  }, 3000);
}

function shakeInput() {
  const input = document.getElementById("psw-input-custom");
  input.style.animation = "shake 0.5s ease-in-out";
  setTimeout(() => {
    input.style.animation = "";
  }, 500);
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// Add keyboard support
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const passwordScreen = document.getElementById("password-screen");
    const mainScreen = document.getElementById("main-screen");
    
    if (!passwordScreen.classList.contains("hidden")) {
      checkPassword();
    } else if (!mainScreen.classList.contains("hidden")) {
      generateCoefficient();
    }
  }
});

// Add input focus effects
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById("psw-input-custom");
  if (input) {
    input.addEventListener('focus', function() {
      this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
      this.style.transform = 'scale(1)';
    });
  }
});
