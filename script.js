const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check if email is valid
function emailValidator(input) {
  const email = input.value;
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email).toLowerCase())) showSuccess(input);
  else showError(input, 'Invalid Email Address');
}

// Check if field is required
function checkRequired(inputArray) {
  let valid = true;
  inputArray.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is Required`);
      valid = false;
    } else {
      showSuccess(input);
    }
  });
  return valid;
}

function checkLength(input, min, max) {
  const length = input.value.length;
  if (length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters`
    );
    return;
  }
  if (length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
    return;
  }
  showSuccess(input);
}

// Check if passwords match
function checkPasswordMatch(input1, input2) {
  if (input1.value != input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get field name
function getFieldName(input) {
  if (input.id === 'password2') return 'Confirm Password';
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!checkRequired([username, email, password, confirmPassword])) return;
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkLength(confirmPassword, 6, 20);
  emailValidator(email);
  checkPasswordMatch(password, confirmPassword);
});
