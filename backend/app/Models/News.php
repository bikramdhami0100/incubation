<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    //
    protected $primaryKey = 'id';
    protected $fillable = [
        'title',
        'category',
        'description',
        'added_by',
        'news_photo',
    ];
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'added_by', 'id');
    }
}
