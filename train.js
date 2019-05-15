
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDWA4oXzEk3P7oDxsIgF_-rH-25shV38w4",
    authDomain: "trainscheduler-61e31.firebaseapp.com",
    databaseURL: "https://trainscheduler-61e31.firebaseio.com",
    projectId: "trainscheduler-61e31",
    storageBucket: "trainscheduler-61e31.appspot.com",
    messagingSenderId: "269363234172",
    appId: "1:269363234172:web:d9a75bc82e1a65ed"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//setting my database equal to a variable 
let trainData = firebase.database().ref();

//add train function
$("#add-train-btn").on("click", function (event) {

    event.preventDefault();

    //get values entered in the form
    let trainName = $("#train-name-input").val().trim();
    let destination = $("#destination-input").val().trim();
    let firstTrain = $("#first-train-input").val().trim();
    let frequency = $("#frequency-input").val().trim();

    // Creates local object for holding train data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    // Uploads train data to the database
    trainData.push(newTrain);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

//access the "children data" in firebase
trainData.on("child_added", function (snapshot) {
    console.log(snapshot.val());
    let now = moment();
    let arrival = snapshot.val().firstTrain;
    let frequency = snapshot.val().frequency;
    let trainName = snapshot.val().name;
    let trainDestination = snapshot.val().destination;
    //min away is the difference of now to the arrival time 
    let minAway = moment.utc(moment(arrival, "HH:mm").diff(moment(now, "HH:mm"))).format("HH:mm");
    console.log(minAway)
    //if next arrival or first train is right now, then set arrival time to now plus the train frequency
    if (this.arrival === now) {
        let arrival = now.add(this.frequency, "m").format("hh:mm A");
    };

    $("#train-table > tbody").append(
        $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(frequency),
            $("<td>").text(arrival),
            $("<td>").text(minAway)
        )
    );

});


// couldn't get next arrival to update once it reached the current time (now)

