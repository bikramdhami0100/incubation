<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ApplicantStatusEmail;
use App\Models\Applicant;
use Illuminate\Support\Facades\Mail;

class ApplicantStatusEmailController extends Controller
{
    //
     public function index(Request $request)
    {

        $item=$request->input('item');
        $members=json_decode($item['members'],true);
        $project=$item['application'];
        $applicant= Applicant::find($request->item['id']);
         $applicant->status=$request->status;
         $applicant->save();

         
         
         $to=$item['email'];
         $status=$request->status;
         $name=$item['name'];
         $email=$item['email'];
         $phone=$item['phone'];
         $title=$project['title'];
         $description=$project['description'];
         
         $subject = "Email from Incubation Center Website";
         $userMessage = " Message from incubation center.";
        
         $ccMembers=[];
       $ccMembers = collect($members)->map(function($member){
    return [
        'name' => $member['name'],
        'email' => $member['email'],
        'phone' => $member['phone'],
        'photo' => $member['photo'],
    ];
})->toArray();

         $ccEmails = [];
         foreach ($ccMembers as $member) {
             if (isset($member['email'])) {
                 $ccEmails[] = $member['email'];
             }
         }
        //  // ✅ Send mail and get SentMessage object
          $sentMessage = Mail::to($email)->cc($ccEmails)->send(
             new ApplicantStatusEmail($status,$name,$email,$phone,$members,$title,$description, $subject,$userMessage)
         );
      
        return [
            'message' => 'Email sent successfully',
            // 'response' => $request->item->id,
            // 'members'=>$members,
            //  'items'=>$item,
            //  'project'=>$project,
            'ccEmails'=>$ccEmails,
            'ccMembers'=>$members

        ];
    }
}
