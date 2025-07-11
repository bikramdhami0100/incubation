<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; //

class Admin extends Model
{
    
    use HasApiTokens, Notifiable;
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'profile_image',
    ];
    protected $hidden = [
        'password',
    ];
    public function news()
    {
        return $this->hasMany(News::class, 'added_by', 'id');
    }
}
