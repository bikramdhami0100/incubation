<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Applicant;
class Application extends Model
{
    //
    protected $primaryKey = 'id';
    protected $fillable = [
        'title',
        'description', 
        'end_date',
        'status',
    ];
    public function applicant()
    {
        return $this->hasMany(Applicant::class, 'application_id', 'id');
    }
   
}
