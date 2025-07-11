<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    //
    protected $primaryKey = 'id';
    protected $fillable = [
        'title',
        'description',
        'file',
        'added_by',
    ];
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'added_by', 'id');
    }
}
