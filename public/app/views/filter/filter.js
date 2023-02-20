const form = document.getElementById('filter-form');

form.addEventListener('submit', (event) => {
    console.log("hell yeah");
  event.preventDefault(); // prevent the default form submission

  // construct query string from form data
  const queryString = new URLSearchParams(new FormData(form)).toString();
  
  // send GET request to API endpoint with query string
  fetch(`/api/students?${queryString}`)
    .then(response => response.json())
    .then(students => {
      console.log(students);
      // display filtered students on the front-end
    })
    .catch(error => console.error(error));
});
