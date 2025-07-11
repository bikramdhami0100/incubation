<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use App\Models\Admin;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
class NewsController extends Controller
{
    //
    public function index(Request $request)
    {
        $searchTerm = $request->query('search');
        $news = News::latest()->when($searchTerm, function ($query, $searchTerm) {
            return $query->where('title', 'like', '%' . $searchTerm . '%')->orWhere('description', 'like', '%' . $searchTerm . '%');
        })->paginate(10);
        // get the added_by name from admin table
        $news->load('admin');

        return $news;
    }
    public function store(Request $request)
    {  
        // $validate=$request->validate([
        //     'title'=>'required',
        //     'category'=>'required',
        //     'description'=>'required',
        //     // 'added_by'=>'required',
        //     'news_photo'=>'required',
        // ]);
         
        // if(!$validate){
        //     return redirect()->back()->with('error','Please fill all the fields');
        // }
        $news = new News();
        $news->title = $request->title;
        $news->category = $request->category;
        $news->description = $request->description;
        $news->added_by = $request->added_by;
        if($request->hasFile('news_photo')){
            $photo = $request->file('news_photo');
            $photo->store('news', 'public');
            $news->news_photo = $photo->hashName();
        }
        $news->save();
        return ['status'=>'success','message'=>'News created successfully','news'=>$news];
    }
    public function show($id)
    {
         
        $news = News::find($id);
        $news->load('admin');
        
        return ['news'=>$news];
    }

    public function update(Request $request, $id)
    {
        
        $news = News::find($id);

        // if file is coming from frontend first unlink the existing file
        if($request->hasFile('news_photo') && $news->news_photo){
            $image_path = public_path('storage/news/'.$news->news_photo);
            if(file_exists($image_path)){
                unlink($image_path);
                // Storage::disk('public')->delete('news/'.$news->news_photo);
            }
        }else{
            $news->news_photo = $request->news_photo;
        }

        if($request->hasFile('news_photo')){
            $photo = $request->file('news_photo');
            $photo->store('news', 'public');
            $news->news_photo = $photo->hashName();
        }
        $news->title = $request->title;
        $news->category = $request->category;
        $news->description = $request->description;
        $news->save();
        return ['request'=>$request->all(),'id'=>$id,'file'=>$request->file('news_photo'),'otherData'=>$request->except('news_photo')];
    }
    public function destroy(Request $request,$id)
    {
        //search params data image path we have to remove image from storage
        $news_photo = $request->news_photo;
        //remove image from storage
        if($news_photo){
          Storage::disk('public')->delete('news/'.$news_photo);

        }
        $news = News::destroy($id);
        
        return ['status'=>'success','message'=>'News deleted successfully',];
    }
}
