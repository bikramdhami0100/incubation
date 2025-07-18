<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;
     
    public $token,$name,$email,$origin;
    /**
     * Create a new message instance.
     */
    public function __construct(  $token,$name,$email,$origin )
    {
        //
        $this->token=$token;
        $this->name=$name;
        $this->email=$email;
        $this->origin=$origin;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reset Password Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'resetpasswordemail',
            with:[
                'token'=>$this->token,
                'name'=>$this->name,
                'email'=>$this->email,
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
