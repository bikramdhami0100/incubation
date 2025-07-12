<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\Admin;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\User as Authenticatable;
use  App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{  
    public function show()  {
         
        $admins=Admin::all();
        return [
            'admins' => $admins
        ];

    }
    // index 
    public function index(){
         $totalNews=DB::table('news')->count();
         $totalNotices=DB::table('notices')->count();
         $totalApplicants=DB::table('applicants')->count();
         $totalApplications=DB::table('applications')->count();
         $totalContact=DB::table('contacts')->count();
         $totalGallery=DB::table('gallery_images')->count();

        return [
            'totalNews' => $totalNews,
            'totalNotices' => $totalNotices,
            'totalApplicants' => $totalApplicants,
            'totalApplications' => $totalApplications,
            'totalContact' => $totalContact,
            'totalGallery' => $totalGallery
        ];
    }
    //signup
    public function register(Request $request)
    {

       
       
        $validate=$request->validate([
            'name'=>'required',
            'email'=>'required|email',
            'password'=>'required',
            // 'role'=>'required',
        ]);
        if(!$validate){
            return response()->json(['ok' => false]);
        }
        $admin=new Admin();
        $admin->name=$request->name;
        $admin->email=$request->email;
        $admin->role=$request->role;
        if($request->hasFile('profile_image')){
            $photo = $request->file('profile_image');
            $photo->store('admin', 'public');
            $admin->profile_image = $photo->hashName();
        }
        $admin->password=bcrypt($request->password);
        $admin->save();
        return response()->json(['ok' => true]);
        return $request;
    }

    //login
    public function login(Request $request)
    {
       
    
       $validate=$request->validate([
        'email'=>'required|email',
        'password'=>'required',
       ]);
       
       if(!$validate){
        return response()->json(['ok' => false,'error'=>validate->errors()]);
       }
       $admin=Admin::where('email',$request->email)->first();
       if($admin){
        if(Hash::check($request->password,$admin->password)){
            $token=$admin->createToken($admin->email)->plainTextToken;
            Session::put("auth",$admin->id);
            Session::put("token",$token);
            //set token in cookie
            return response()->json(['ok' => true,'token'=>$token,'id'=>$admin->id]);
        }
       }
       return response()->json(['ok' => false,'error'=>'Invalid credentials']);

    }

    public function checkToken(Request $request)
    {
        $token = $request->token;
        // $cookie= $request->cookie('token');
        // $storageToken = Session::get('token');
        //  $accessToken = PersonalAccessToken::findToken($token);

        // if ($storageToken==$token) {
        //    return response()->json(['ok' => true, 'token' => $storageToken]);
        // }
        return response()->json(['ok' => false, 'error' => 'Invalid token',$token,$accessToken]);
    }

    public function forgetPassword(Request $request)
    {
        $validate=$request->validate([
            'email'=>'required|email',
        ]);
        if(!$validate){
            return ['ok' => false,'error'=>validate->errors()];
        }
        $admin=Admin::where('email',$request->email)->first();
        if($admin){
            $token=$admin->createToken($admin->email)->plainTextToken;
            Session::put("auth",$admin->id);
            Session::put("token",$token);
            Mail::to($admin->email)->send(new ResetPasswordMail(
                $token,
                $name=$admin->name,
                $email=$admin->email,
                $origin = $request->headers->get('origin')
            ));
            return response()->json(['ok' => true,'token'=>$token]);
        }
        return ['ok' => false,'error'=>'Invalid credentials'];
    }

    public function resetPassword(Request $request)
    {
        $validate=$request->validate([
            'email'=>'required|email',
            'password'=>'required',
        ]);
        if(!$validate){
            return ['ok' => false,'error'=>validate->errors()];
        }
        $token=$request->token;
        // $checkToken=Session::get('token');
        // if(!$checkToken){
        //     return ['ok' => false,'error'=>'Invalid token'];
        // }
        $admin=Admin::where('email',$request->email)->first();
        $admin->email_verified=1;
        if($admin){
            
            $admin->password=bcrypt($request->password);
            $admin->save();
            $token=$admin->createToken($admin->email)->plainTextToken;
            Session::put("auth",$admin->id);
            Session::put("token",$token);
            return ['ok' => true,'token'=>$token];

        }
        return ['ok' => false,'error'=>'Invalid credentials'];
    }

    public function logout(Request $request)
    {
        Session::flush();
        return response()->json(['ok' => true]);
    }
    
}
