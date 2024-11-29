
const htmlContent = `
  <div>
    <h1>this is my commit</h1>
    <p>awdwd</p>
    <button id="dropdownButton">Cart</button>
    <div id="dropdownMenu" class="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div>
`;
// Insert the HTML content into the div with id "content"
document.getElementById('content').innerHTML = htmlContent;

// Add event listener to the button to toggle the dropdown menu
document.getElementById('dropdownButton').addEventListener('click', function() {
    document.getElementById('dropdownMenu').classList.toggle('show');
  });