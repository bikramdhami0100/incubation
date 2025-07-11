<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\IncubationEmail;
use Illuminate\Support\Facades\Mail;

class IncubationEmailController extends Controller
{
   public function sendEmail(Request $request)
{
    try {
        $to = "bikramdhami334@gmail.com";
        $name = "Bikram Dhami";
        $subject = "Email from Incubation Center Website";
        $userMessage = "Hello world from incubation center.";

        // ✅ Send mail and get SentMessage object
        $sentMessage = Mail::to($to)->send(
            new IncubationEmail($name, $subject, $userMessage)
        );

        // ✅ Get Message ID (optional)
        $messageId = method_exists($sentMessage, 'getMessageId') ? $sentMessage->getMessageId() : null;

        return[
            'success' => true,
            'message' => 'Email sent successfully',
            'message_id' => $messageId,
        ];
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage(),
        ], 500);
    }
} 

public function onlyApplicant(Request $request)
{
     try {
            $to=$request->email;
          $phone=$request->phone;
          $title=$request->application_title;
          $description=$request->application_description;
          $name=$request->applicantName;
          $teamMembers=$request->teamMembers;
        $subject = "Email from Incubation Center Website";
        $userMessage = "Hello world from incubation center.";
        $ccEmails = [];
        foreach ($teamMembers as $member) {
            if (isset($member['email'])) {
                $ccEmails[] = $member['email'];
            }
        }
        // ✅ Send mail and get SentMessage object

         $sentMessage = Mail::to($to)->cc($ccEmails) ->send(
            new IncubationEmail($name,$to,$phone,$teamMembers,$title,$description, $subject,$userMessage)
        );
        return [
            'success' => true,
            'message' => 'Email sent successfully',
            'response' => $request->all(),
            'teamMembers'=>$teamMembers,
            'ccEmails'=>$ccEmails
        ];
     } catch (\Exception $th) {
        //throw $th;
        return [
            'success' => false,
            'error' => $th->getMessage(),
        ];
     }
}
}
