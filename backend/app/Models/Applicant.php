<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Application;
class Applicant extends Model
{
    //
    protected $primaryKey = 'id';
    protected $fillable = [
        'application_id',
        'name',
        'email',
        'phone',
        'photo',
        'members',
    ];
    public function application()
    {
        return $this->belongsTo(Application::class, 'application_id', 'id');
    }
   
}
