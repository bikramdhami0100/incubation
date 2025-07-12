<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\DB;
use App\Models\Admin;
class AdminProfileController extends Controller
{
    //
    public function show()  {
        $admin = Admin::all();
        return [
            'admin' => $admin
        ];
    }
    public function update(Request $request,$id) {
          
        $validate=$request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ]);
        $admin = Admin::find($id);
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->save();

        return [
            'message' => " Updated successfully",
            // 'id' => $admin
        ];
    }
    public function changeImage(Request $request,$id) {
        
          $admin = Admin::find($id);

        if($request->hasFile('profile_image')){
            // unlink old image
            if($admin->profile_image){
                $image_path = public_path('storage/admin/'.$admin->profile_image);
                if(file_exists($image_path)){
                    unlink($image_path);
                    // Storage::disk('public')->delete('admin/'.$admin->profile_image);
                }
            }

            $photo = $request->file('profile_image');
            $photo->store('admin', 'public');
            $admin->profile_image = $photo->hashName();
        }
        $admin->save();
        return [
            // 'request' => $request->all(),
             'message'=>" Updated successfully",
            // 'id' => $id
        ];
    }
     
    public function changePassword(Request $request,$id) {
        
        // validate 
         $request->validate([
            'currentPassword' => 'required',
            'newPassword' => 'required',
         ]);
        $currentPassword = $request->currentPassword;
        $newPassword = $request->newPassword;

        $admin = Admin::find($id);
        if (Hash::check($currentPassword, $admin->password)) {
            $admin->password = bcrypt($newPassword);
            $admin->save();
        }
        return [
            'request' => $request->all(),
            'message'=>" Updated successfully",
            // 'admin'=>$admin
        ];
    }
     
}
