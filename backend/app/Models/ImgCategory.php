<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImgCategory extends Model
{
    use HasFactory;

    protected $table = 'imgcategories'; // Laravel default would expect 'img_categories'

    protected $fillable = [
        'name',
        'description',
        'image',
    ];

    // Relationship: A category has many gallery images
    public function galleryImages()
    {
        return $this->hasMany(GalleryImage::class, 'imgcategory_id');
    }
}
