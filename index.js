var personName = "John";

function callName () {
    console.log("Original name: " + personName);

    var personName = "Jack";

    console.log("Modified name: " + personName);
}


callName();

