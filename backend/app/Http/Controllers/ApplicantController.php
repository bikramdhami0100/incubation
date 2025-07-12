<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Applicant;
use App\Models\Application;
use Illuminate\Support\Facades\Mail;
use App\Mail\IncubationEmail;
use Illuminate\Support\Facades\Storage;
use App\Mail\ApplicantStatusEmail;
class ApplicantController extends Controller
{
    //
    public function store(Request $request)
    {
        $validate=$request->validate([
            'applicantName'=>'required',
            'email'=>'required|email',
            'phone'=>'required',
            'photo'=>'required',
            'teamMembers'=>'required',
        ]);
        if(!$validate){
            return redirect()->back()->with('error','Please fill all the fields');

        }
        $teamMembers = [];
    $i = 0;
    while ($request->has("teamMembers.$i.name")) {

        $photo = $request->file("teamMembers.$i.photo");
    
        if ($photo) {
            $photo->store('applicants', 'public');
            $photoName = $photo->hashName();

            $teamMembers[] = [
                'name' => $request->input("teamMembers.$i.name"),
                'email' => $request->input("teamMembers.$i.email"),
                'phone' => $request->input("teamMembers.$i.phone"),
                'photo' =>$photoName,
            ];
        }
        $i++;
    }
    if ($request->hasFile('photo')) {
        $photo = $request->file('photo');
        $photo->store('applicants', 'public');
        $photoName = $photo->hashName();
    }
   
    $applicant = new Applicant();
    $applicant->application_id = $request->input('application_id');
    $applicant->name = $request->input('applicantName');
    $applicant->email = $request->input('email');
    $applicant->phone = $request->input('phone');
    $applicant->photo = $photoName;
    $applicant->members = json_encode($teamMembers);
    $applicant->save();
  try {  
          $application=Application::find($request->application_id);
          $to=$request->email;
          $phone=$request->phone;
          $title=$application->title;
          $description=$application->description;
          $name=$request->applicantName;
          $teamMembers=$request->teamMembers;
        $subject = "Your Application Has Been Successfully Received – Farwestern University Incubation Center";
        $userMessage = "Dear $name,\n\nThank you for applying to the Incubation Program at Farwestern University. We have successfully received your application titled \"$title\". Our team will review your submission and contact you if more information is needed.\n\nBest regards,\nFWU Incubation Center Team";
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
            // 'message' => 'Email sent successfully',
            'message' => 'Application successfully submitted',
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
    public function index()
    {
        $application = Applicant::paginate(10);
        // $application->load("applications");
        $application->load("application");
        return $application;
    }
    public function update(Request $request)
    {
         
        $applicant= Applicant::find($request->id);
        $applicant->status=$request->status;
        $applicant->save();

        $members=$applicant->members;
        $members=json_decode($members);
        $ccMembers=[];
        foreach($members as $member){
               
            $ccMembers[]=[
                'name'=>$member->name,
                'email'=>$member->email,
                'phone'=>$member->phone,
                'photo'=>$member->photo,
            ];
        }

        $to=$request->email;
        $phone=$request->phone;
        $status=$request->status;
        $name=$request->name;
        $subject = "Email from Incubation Center Website";
        $userMessage = "Hello world from incubation center.";
        $ccEmails = ['bikramdhami334@gmail.com'];
        // ✅ Send mail and get SentMessage object
         $sentMessage = Mail::to($to)->cc($ccEmails)->send(
            new ApplicantStatusEmail($name,$to,$phone,$status, $subject,$userMessage)
        );
        
        return [
            'message' => 'Applicant updated successfully',
            "response" => $request->all()
        ];
    }
    public function destroy(Request $request,$id)
    {
        $applicant=Applicant::find($id);
        // unlink all images from storage
        $photo=$applicant->photo;
        if($photo){
            Storage::disk('public')->delete('applicants/'.$photo);

        }
       Applicant::destroy($id);
        return [
            'message' => 'Applicant deleted successfully',
            'id' => $id,
            // $applicant

        ];
    }


}
