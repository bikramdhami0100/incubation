<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'imgcategory_id',   // foreign key to ImgCategory
        'images',           // JSON array of image paths
        'title',
        'description',
        'uploaded_by',
    ];

    protected $casts = [
        'images' => 'array', // Laravel will convert JSON to array
    ];

    // Relationship: belongs to one ImgCategory
    public function category()
    {
        return $this->belongsTo(ImgCategory::class, 'imgcategory_id');
    }
}
