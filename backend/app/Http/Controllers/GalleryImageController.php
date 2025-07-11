<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GalleryImage;
use App\Models\ImgCategory;
use Illuminate\Support\Facades\Storage;

class GalleryImageController extends Controller
{
    public function store(Request $request)
    {
        // ✅ 1. Validate inputs
        // $request->validate([
        //     'title' => 'required|string',
        //     'description' => 'nullable|string',
        //     'added_by' => 'required|string',
        //     'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'category' => 'required|string',
        //     'category_description' => 'nullable|string',
        // ]);

        // ✅ 2. Handle image uploads
        $imagePaths = [];
        $firstImage = null;

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $photo) {
                $photo->store('gallery', 'public');
                $hashName = $photo->hashName();
                $imagePaths[] = $hashName;

                // Save the first image separately for the category
                if ($index === 0) {
                    $firstImage = $hashName;
                }
            }
        }

        // ✅ 3. Create category
        $category = ImgCategory::create([
            'name' => $request->input('category'),
            'description' => $request->input('category_description'),
            'image' => $firstImage, // Save the first image
        ]);

        // ✅ 4. Create gallery image entry (with all uploaded images)
        $galleryImage = new GalleryImage();
        $galleryImage->imgcategory_id = $category->id;
        $galleryImage->title = $request->title;
        $galleryImage->description = $request->description;
        $galleryImage->uploaded_by = $request->added_by;
        $galleryImage->images = $imagePaths; // Stored as JSON
        $galleryImage->save();

        return response()->json([
            'message' => 'Gallery and category created successfully.',
            'gallery' => $galleryImage,
            'category' => $category,
        ]);
    }

    public function index(Request $request)
    {
        $search=$request->query('search');
        // ✅ 5. List all gallery images with their categories
        $galleryImages = GalleryImage::latest()->with('category')->when($search,function($query,$search){
            return $query->where('title','like','%'.$search.'%')->orWhere('description','like','%'.$search.'%');
        })->paginate(10);
        $allSearchImages=[];
        if($search=='allSearch'){
            
            $galleryImages = GalleryImage::latest()->select("images")->paginate(5);
            foreach($galleryImages as $image){
                $allSearchImages = array_merge($allSearchImages,$image->images);
            }

        }

        if($allSearchImages){
            return response()->json($allSearchImages);
        }

        return response()->json($galleryImages);
    }
    public function show($id)
    {
        // optional: implement viewing one image
        $galleryImage = GalleryImage::with('category')->findOrFail($id);
        return response()->json($galleryImage);
    }

     public function update(Request $request, $id)
    {
        // For robustness, always validate
        // $validator = Validator::make($request->all(), [
        //     'title' => 'required|string|max:255',
        //     'description' => 'nullable|string',
        //     'imgcategory_id' => 'required|integer|exists:categories,id',
        //     'newImages' => 'nullable|array',
        //     'newImages.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        //     'imagesToDelete' => 'nullable|array',
        //     'imagesToDelete.*' => 'string',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json(['errors' => $validator->errors()], 422);
        // }

        // 1. Find the gallery item
        $imageGallery = GalleryImage::findOrFail($id);
        
        // 2. Because of the 'casts' in the model, $imageGallery->images is now a PHP array!
        $currentImages = $imageGallery->images ?? [];

        // 3. Handle Deletions
        if ($request->filled('imagesToDelete')) {
            $imagesToDelete = $request->input('imagesToDelete');
            
            // Delete files from storage
            foreach ($imagesToDelete as $imageName) {
                // Use Laravel's Storage facade for safety and flexibility
                if (in_array($imageName, $currentImages)) {
                    Storage::disk('public')->delete('gallery/' . $imageName);
                }
            }

            // Remove the deleted image names from our PHP array
            $currentImages = array_diff($currentImages, $imagesToDelete);
        }

        // 4. Handle New Uploads
        $newImagePaths = [];
        if ($request->hasFile('newImages')) {
            foreach ($request->file('newImages') as $photo) {
                $path = $photo->store('gallery', 'public');
                $newImagePaths[] = basename($path);
            }
        }
        
        // Merge existing and new image paths
        $finalImages = array_merge($currentImages, $newImagePaths);

        // 5. Update the model's attributes
        $imageGallery->title = $request->input('title');
        $imageGallery->description = $request->input('description');
        $imageGallery->imgcategory_id = $request->input('imgcategory_id');
        
        // 6. THE KEY FIX: Re-index the array and assign it back.
        // The 'casts' property will automatically handle json_encoding on save.
        $imageGallery->images = array_values($finalImages);
        
        $imageGallery->save();

        // 7. Return the updated model WITH the category relationship loaded
        // The '.load()' method adds the relationship data to the existing model instance.
        $imageGallery->load('category');

        return response()->json($imageGallery);
    }
    public function destroy($id)
    {   
        $galleryImage = GalleryImage::findOrFail($id);
        // unlink images from storage
        foreach ($galleryImage->images as $image) {
            Storage::disk('public')->delete('gallery/' . $image);

        }
        $galleryImage->delete();
        
        // destroyed successfully
         GalleryImage::destroy($id);
        return response()->json([
            'message' => 'Gallery image deleted successfully.',
        ]);

        // optional: implement image delete
    }
}
