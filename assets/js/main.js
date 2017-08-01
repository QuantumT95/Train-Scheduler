// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBxC-bh2PJCJ06wRbLjMd3NXlEjg_EOu-M",
    authDomain: "employee-hr.firebaseapp.com",
    databaseURL: "https://employee-hr.firebaseio.com",
    projectId: "employee-hr",
    storageBucket: "",
    messagingSenderId: "708939253597"
  };

 firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#time-input").val().trim(), "30").format("mm");
  var trainFreq = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding Train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    freq: trainFreq
  };

  // Uploads Train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.freq);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");
});




// 3. Create Firebase event for adding Train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().freq;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFreq);

  // Prettify the Train start
  var trainStartPretty = moment.unix(trainStart).format("MM/DD/YY");

  // Difference between Time now + Freq
  var difference = moment(trainFreq).fromNow();
  
  console.log(difference);



  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFreq + "</td><td>" + trainStart + "</td><td>" + difference + "</td><tr>");
});