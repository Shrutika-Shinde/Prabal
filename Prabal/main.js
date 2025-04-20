// Initialize Firebase (ADD YOUR OWN DATA)

const firebaseConfig = {
  apiKey: "AIzaSyCTEGmCCPdjRsUmRX7YBpDrJz2XnZUWmr8",
  authDomain: "test-form-32f19.firebaseapp.com",
  databaseURL: "https://test-form-32f19-default-rtdb.firebaseio.com",
  projectId: "test-form-32f19",
  storageBucket: "test-form-32f19.firebasestorage.app",
  messagingSenderId: "1064228431161",
  appId: "1:1064228431161:web:680b916916f7e8e0c274e8"

  };

firebase.initializeApp(firebaseConfig);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company:company,
    email:email,
    phone:phone,
    message:message
  });
}