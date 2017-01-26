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
    $mail->setTemplateId("APPLYREPLY_TEMPLATE_ID_HERE");
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


$apply_pos = checkClean($_POST['applying_for']);
$fname = checkClean($_POST['firstname']);
$lname = checkClean($_POST['lastname']);
$email = checkClean($_POST['email']);
$region = checkClean($_POST['region']);
$city = checkClean($_POST['city']);
$landline = checkClean($_POST['landline']);
$mobile = checkClean($_POST['mobile']);
$educ = checkClean($_POST['education']);
$deg = checkClean($_POST['degree']);
$maj = checkClean($_POST['major']);
$comp = checkClean($_POST['company']);
$pos = checkClean($_POST['position']);
$sdatemm = checkClean($_POST['startdateMM']);
$sdateyy = checkClean($_POST['startdateYY']);
$edatemm = checkClean($_POST['enddateMM']);
$edateyy = checkClean($_POST['enddateYY']);

$applicant_name = $fname.' '.$lname;

$to = 'harry@lumikha.co';
$subject = 'Lumikha Applicant';
$message = '<h3>'.$apply_pos.' Applicant</h3>
        <div>
            <ul>
                <li>First Name: '.$fname.'</li>
                <li>Last Name: '.$lname.'</li>
                <li>Email: '.$email.'</li>
                <li>Region: '.$region.'</li>
                <li>City: '.$city.'</li>
                <li>Landline: '.$landline.'</li>
                <li>Mobile: '.$mobile.'</li>
                <li>Education: '.$educ.'</li>
                <li>Degree: '.$deg.'</li>
                <li>Major: '.$maj.'</li>
                <li>Previous Company: '.$comp.'</li>
                <li>Position: '.$pos.'</li>
                <li>Start Date: '.$sdatemm.'/'.$sdateyy.'</li>
                <li>End Date: '.$edatemm.'/'.$edateyy.'</li>
            </ul>
        </div>';
$headers = 'From: Atelier Lumikha <workat@lumikha.co>' . "\r\n" . 'CC: Diane Yoldi <diane@lumikha.co>' . "\r\n" . 'Content-type: text/html; charset=iso-8859-1' . "\r\n" . 'X-Mailer: PHP/' . phpversion()  . "\r\n";

if(mail($to, $subject, $message, $headers)) {
    /*
    $to2 = $email;
    $subject2 = "You Just Applied to Lumikha!";
    $message2 = "<h1>Okay, We Got You</h1>
            <div>
                <p>Thank you very much for your application, we really appreciate your interest.</p>

                <p>Now that we have your information, we'll review it shortly. If you look like a good fit for Lumikha, someone will give you a call in the next 2-3 working days.</p>

                <p>We'll try to call your mobile (if you gave us a mobile number), so it's a good idea to answer your phone -- especially if you are looking for gig. ;-)</p>

                <p>We're always on the lookout for great people like yourself. If you know anyone else who might be a good fit for us.</p>

                <br>
                <p>Best Wishes,</p>
                <p>Your Friendly Lumikhans</p>
            </div>";
        
    $headers2 = 'From: Atelier Lumikha <workat@lumikha.co>' . "\r\n" . 'Content-type: text/html; charset=iso-8859-1' . "\r\n" . 'X-Mailer: PHP/' . phpversion()  . "\r\n";
    if(mail($to2, $subject2, $message2, $headers2)) {
        echo "sent";
    } else {
        echo "fail";
    } 
    */

    if(sendHelloEmail($email, $applicant_name) == 202) {
        echo "sent";
    } else {
        echo "fail";
    }
} else {
	echo "fail";
}

?>