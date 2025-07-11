<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Mail;
class ContactController extends Controller
{
    //
    public function index(){
        $contact = Contact::all();
        $totalContact=count($contact);
        return [
            'data' => $contact,
            'totalContact' => $totalContact
        ];
    }

    public function store(Request $request){
        $email = $request->email;
        $name = $request->name;
        $message = $request->message;
        $origin = $request->headers->get('origin');
        $contact = new Contact();
        $contact->email = $email;
        $contact->name = $name;
        $contact->message = $message;
        $contact->save();
        $mail=Mail::to($email)->send(new ContactMail($email,$name,$message,$origin));

        return [
              'success' => true,
              'message' => 'Email sent successfully'
        ];
    }

    public function deleteData($id){
        $contact = Contact::destroy($id);
        // $contact->delete();
        return [
            'success' => true,
            'message' => 'Contact deleted successfully'
        ];
    }

}
