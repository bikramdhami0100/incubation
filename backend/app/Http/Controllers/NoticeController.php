<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notice;

class NoticeController extends Controller
{
    //
    public function index(Request $request)
    {
        $search=$request->query('search');
        $notices = Notice::latest()->when($search,function($query,$search){
         return $query->where('title','like','%'.$search.'%')->orWhere('description','like','%'.$search.'%');
        })->paginate(10);
        // get the added_by name from admin table
        $notices->load('admin');
        return [
            'current_page' => $notices->currentPage(),
            'data' => $notices->items(),
            'total' => $notices->total(),
            'per_page' => $notices->perPage(),
            'last_page' => $notices->lastPage(),
        ];
    }
    public function store(Request $request)
    {
        $validate=$request->validate([
            'title'=>'required',
            'description'=>'required',
            'added_by'=>'required',
        ]);
        if(!$validate){
            return redirect()->back()->with('error','Please fill all the fields');
        }
        $notice = new Notice();
        $notice->title = $request->title;
        $notice->ended_at = $request->ended_at;
        $notice->description_link = $request->description_link;
        $notice->description = $request->description;
        $notice->added_by = $request->added_by;

        
        if($request->hasFile('file')){
            $file = $request->file('file');
            $file->store('notices', 'public');
            $notice->file = $file->hashName();
        }
        $notice->save();
        return ['status'=>'success','message'=>'Notice created successfully','notice'=>$notice];
    }
    public function show($id)
    {   
        $notice = Notice::find($id);
        $notice->load('admin');
        return [
            'notice'=>$notice,
            'admin'=>$notice->admin,
            'file'=>asset('storage/notices/'.$notice->file)
        ];
    }
   public function update(Request $request, $id)
{
    $notice = Notice::findOrFail($id);

    // Handle file upload
    if ($request->hasFile('file')) {
        // Delete old file if it exists
        if ($notice->file) {
            $oldPath = public_path('storage/notices/' . $notice->file);
            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }

        // Store new file
        $file = $request->file('file');
        $file->store('notices', 'public');
        $notice->file = $file->hashName();
    }

    // Update other fields
    $notice->title = $request->input('title');
    $notice->description = $request->input('description');
    $notice->ended_at = $request->input('ended_at');
    $notice->description_link = $request->input('description_link');

    $notice->save();

    return response()->json([
        'message' => 'Notice updated successfully',
        'notice' => $notice,
    ]);
}

    public function destroy(Request $request,$id)

    {
        //delete file from storage
        $notice = Notice::find($id);
        if($notice->file){
            $image_path = public_path('storage/notices/'.$notice->file);
            if(file_exists($image_path)){
                unlink($image_path);
            }
        }
        $notice = Notice::destroy($id);
        if($notice){
            return ['status'=>'success','message'=>'Notice deleted successfully'];
        }
        return ['status'=>'error','message'=>'Notice  not deleted'];
    }
}
