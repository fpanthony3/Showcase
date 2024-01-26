const validateInput = () => {
  // Define the allowed characters
  const allowedCharacters = /^[-_.+=]+$/;

  // Get all TextInputs on the module/page
  const textInputs = document.querySelectorAll('input[type="text"]');

  // Iterate through each TextInput and check the input
  textInputs.forEach((textInput) => {
    const inputValue = textInput.value;

    // Check if the input contains only allowed characters
    if (!allowedCharacters.test(inputValue)) {
      // Display an error message or handle the error as needed
      alert('Error: Only hyphen (-), underscore (_), period (.), plus sign (+), and equal sign (=) are allowed.');
      // You can also clear the TextInput or take other actions based on your requirements
      textInput.value = '';
    }
  });
};

/*
// Example of using the function within a button press
const validateButton = document.getElementById('validateButton');

validateButton.addEventListener('click', () => {
  validateInput();
});
*/