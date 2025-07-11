<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;
   public $name;
   public $email;
   public $message;
   public $origin;
    /**
     * Create a new message instance.
     */
    public function __construct($name,$email,$message,$origin)
    {
        //
        $this->name = $name;
        $this->email = $email;
        $this->message = $message;
        $this->origin = $origin;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Contact Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'contactmail',
            with:[
                'name'=>$this->name,
                'email'=>$this->email,
                'message'=>$this->message,
                'origin'=>$this->origin
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
