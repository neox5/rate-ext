document.addEventListener("load", () => {
  const ahrefs = document.getElementsByName("a")
  
  console.log("load:", ahrefs);
})

document.addEventListener("DOMContentLoaded", () => {
  const ahrefs = document.getElementsByName("a")
  
  console.log("DOMContentLoaded:", ahrefs);
})

const search = document.getElementById("search");
  
const h3s = search.querySelectorAll("h3");


console.log("outside:", search);
// console.log("outside:", ahrefs);

h3s.forEach(h3 => console.log(h3.innerText, ":", h3.parentElement.getAttribute("href")));