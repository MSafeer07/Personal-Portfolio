<?php
// Only accept submissions from the contact form
if ($_SERVER["REQUEST_METHOD"] !== "POST" || !isset($_POST["submit"])) {
	header("Location: index.html");
	exit;
}

// Remove line breaks and tags so nobody can inject extra email headers
function clean($value) {
	return trim(str_replace(["\r", "\n"], ' ', strip_tags($value)));
}

$name    = clean($_POST['name'] ?? '');
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$subject = clean($_POST['subject'] ?? '');
$message = trim(strip_tags($_POST['message'] ?? ''));

if ($name === '' || !$email || $subject === '' || $message === '') {
	http_response_code(400);
	exit('Please fill in all fields with a valid email address.');
}

$to        = 'a944427@gmail.com';            // your personal email
$site_from = 'no-reply@yourdomain.com';      // an address on YOUR website's domain

$headers  = "From: Portfolio Contact Form <$site_from>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$body = "Name: $name\n"
      . "Email: $email\n"
      . "Subject: $subject\n\n"
      . "Message:\n$message\n";

if (mail($to, "Portfolio: $subject", $body, $headers)) {
	header("Location: thank-you.html");
	exit;
}

http_response_code(500);
echo 'Sorry, your message could not be sent. Please email me directly at a944427@gmail.com.';