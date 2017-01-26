<?php
require("../lib/SendGrid/sendgrid-php.php");

function checkClean($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function helloEmail($t, $n)
{
    $from = new SendGrid\Email("Atelier Lumikha", "workat@lumikha.co");
    $subject = "Lumikha Application";
    $to = new SendGrid\Email($n, $t);
    $content = new SendGrid\Content("text/html", "some text here");
    $mail = new SendGrid\Mail($from, $subject, $to, $content);
    $mail->setTemplateId("REFERREPLY_TEMPLATE_ID_HERE");
    return $mail;
}

function sendHelloEmail($t, $n)
{
    $apiKey = 'API_KEY_HERE';
    $sg = new \SendGrid($apiKey);
    $request_body = helloEmail($t, $n);
    $response = $sg->client->mail()->send()->post($request_body);
    return $response->statusCode();
}

$yfname = checkClean($_POST['youfirstname']);
$ylname = checkClean($_POST['youlastname']);
$yemail = checkClean($_POST['youemail']);

$tfname = checkClean($_POST['themfirstname']);
$tlname = checkClean($_POST['themlastname']);
$temail = checkClean($_POST['thememail']);

$referred_friend_name = $tfname.' '.$tlname;

if(sendHelloEmail($temail, $referred_friend_name) == 202) {
	echo "sent";
} else {
	echo "fail";
}

/*
$to2 = $temail;
$subject2 = "You're Invited";
$message2 = "<h1>RSVP</h1>
        <div>
            <p>Hello. You have been invited you to apply for a position at Atelier Lumikha.</p>

            <p>We're hiring all kinds of people for all kinds of things. Cool things. Likeable things. With likeable people.</p>

            <p>Come check us out and tell us who sent you.<p>

            <p>Your Friendly Lumikhans</p>
        </div>";
    
$headers2 = 'From: Atelier Lumikha <workat@lumikha.co>' . "\r\n" . 'Content-type: text/html; charset=iso-8859-1' . "\r\n" . 'X-Mailer: PHP/' . phpversion()  . "\r\n";
if(mail($to2, $subject2, $message2, $headers2)) {
    echo "sent";
} else {
    echo "fail";
}
*/

?>