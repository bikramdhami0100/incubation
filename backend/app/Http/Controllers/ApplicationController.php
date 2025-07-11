<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Applicant;

class ApplicationController extends Controller
{
    //
    public function store(Request $request)
    {
        $validate=$request->validate([
            'title'=>'required',
            'description'=>'required',
            'end_date'=>'required|date',
        ]);
        if(!$validate){
            return redirect()->back()->with('error','Please fill all the fields');

        }

        $application=new Application();
        $application->title=$request->title;
        $application->description=$request->description;
        $application->end_date=$request->end_date;
        $application->status=$request->status ?? 'open'; // Default status is 'open
        $application->save();

    return [
        // 'application' => $application,  
        'message' => 'Application created successfully'
    ];
    }
    public function index()
    {
        //latest 10 applications
        // $application = Application::latest()->paginate(10);
        // $application = Application::with('applications')->paginate(10);
        $application = Application::latest()->paginate(10);
        // $application->load("applications");
        // $application->load("application");
        return $application;
    }
    public function update(Request $request)
    {
         
        $validate=$request->validate([
            'title'=>'required',
            'description'=>'required',
            'end_date'=>'required|date',
        ]);
        if(!$validate){
            return redirect()->back()->with('error','Please fill all the fields');
        }
        $application = Application::find($request->id);
        // Check if the application exists
         // If not found, return a 404 response
         // If found, update the application
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }
        $application->title = $request->title;
        $application->description = $request->description;
        $application->end_date = $request->end_date;
        $application->status = $request->status ?? 'open'; // Default status is 'open'
        $application->save();
        
        return [
            'message' => 'Application updated successfully',
            "response" => $request->all()
        ];
    }
    public function destroy($id)
    {
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }
        $application->delete();
        return response()->json(['message' => 'Application deleted successfully']);
    }
   

    public function edit($id)
    { 

        return 'Application edit';
    }
    public function view($id)
    {
         // Assuming you want to return a specific application by ID
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found' ,], 404);
        }
        return [
            'message' => 'Application show',
            'id' => $id,
            'application' => $application
        ];
    }

}
