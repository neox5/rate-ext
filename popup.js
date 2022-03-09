// // Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); // needs activeTab permission

//   // programmatically injected content script
//   // needs scripting permission
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });

// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }

const partialClass = "partial";
const filledClass = "filled";
const maxRating = 5;

const stars = document.getElementById("stars");
let currentRating;

chrome.storage.sync.get("rating", ({ rating }) => {
  currentRating = rating;
});

if (maxRating > 0) {
  for (let i=1; i<=maxRating; i++) {
    // create star div
    const star = document.createElement("div");
    star.classList.add("star");
    star.dataset.n = i;
    star.appendChild(createStarSvg());
    addListeners(star);
    stars.appendChild(star);
  }
  addFill(-1);
}

function addListeners(star) {
  const n = star.dataset.n;
  star.addEventListener("mouseover", () => addFill(n));
  
  star.addEventListener("click", () => {
    currentRating = n;
    chrome.storage.sync.set({ rating: currentRating });
    addFill(-1);
  });
  
  star.addEventListener("mouseout", () => addFill(-1));
}

function addFill(n) {
  Array.prototype.forEach.call(document.getElementsByClassName("star"), (s, i) => {
    s.classList.remove(filledClass);
    s.classList.remove(partialClass);
    
    if (n == -1 && i < currentRating) {
      s.classList.add(filledClass);
    } else {
      if (i<n && i<currentRating) {
       s.classList.add(filledClass); 
      } else if (i < n || i < currentRating) {
        s.classList.add(partialClass);
      }
    }
  }) 
}

function createStarSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttributeNS(null, "viewBox", "0 0 26 24");
  // create star path
  const path = document.createElementNS(svg.namespaceURI,"path");
  path.setAttribute("d", "m12.5 0 2.951 9.082H25l-7.725 5.613 2.95 9.081-7.725-5.612-7.725 5.612 2.95-9.081L0 9.082h9.549L12.5 0Z");
  svg.appendChild(path);
  return svg;
}