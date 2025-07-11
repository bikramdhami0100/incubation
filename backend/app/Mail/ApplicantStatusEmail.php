<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ApplicantStatusEmail extends Mailable
{
    use Queueable, SerializesModels;
  public $subject;
    public $name;
    public $userMessage;
    public $email;
    public $phone;
    public $teamMembers;
    public $title;
    public $description;
    public $status;
    /**
     * Create a new message instance.
     */
    public function __construct($status,$name,$email,$phone,$teamMembers,$title,$description, $subject,$userMessage)
    {
        //
        $this->name=$name;
        $this->subject=$subject;
         $this->userMessage=$userMessage;
         $this->email=$email;
         $this->phone=$phone;
         $this->teamMembers=$teamMembers;
         $this->title=$title;
         $this->description=$description;
         $this->status=$status;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Applicant Status Email',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'applicantstatusemail',
            with:[
                'userMessage'=>$this->userMessage,
                'name'=>$this->name,
                'email'=>$this->email,
                'phone'=>$this->phone,
                'members'=>$this->teamMembers,
                'title'=>$this->title,
                'description'=>$this->description,
                'status'=>$this->status
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
