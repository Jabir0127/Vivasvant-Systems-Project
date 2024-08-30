<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and assign form data to variables
    $fname = $conn->real_escape_string(trim($_POST['fname']));
    $lname = $conn->real_escape_string(trim($_POST['lname']));
    $email = $conn->real_escape_string(trim($_POST['email']));
    $phone = $conn->real_escape_string(trim($_POST['phone']));
    $message = $conn->real_escape_string(trim($_POST['message']));

    // Check if email or phone number already exists in the database
    $checkQuery = "SELECT * FROM users WHERE email = '$email' OR phone = '$phone'";
    $result = $conn->query($checkQuery);

    if ($result->num_rows > 0) {
        // Email or phone number exists, so ignore the insert query
        echo "Email or phone number already exists. No data was inserted.";
    } else {
        // Insert data into the database
        $insertQuery = "INSERT INTO users (fname, lname, email, phone, message) 
                        VALUES ('$fname', '$lname', '$email', '$phone', '$message')";

        if ($conn->query($insertQuery) === TRUE) {
            echo "New record created successfully.";
        } else {
            echo "Error: " . $insertQuery . "<br>" . $conn->error;
        }
    }
} else {
    echo "Invalid request method.";
}

// Close the database connection
$conn->close();
?>
