<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Committee;
use App\Models\CommitteeMember;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CommitteeController extends Controller
{
    //
  public function store(Request $request)
{
    // Validate the request
    $request->validate([
        'committeeName' => 'required|string|max:255',
        // 'hierarchy' => 'required|string|max:255', // Assuming hierarchy is a string
        'committeeDescription' => 'nullable|string|max:1000',
        'teamMembers' => 'required|json', // Ensure teamMembers is a valid JSON
        'memberPhoto_*' => 'nullable|image|max:2048', // Validate each member photo
    ]);


    $committee = new Committee();
    $committee->name = $request->input("committeeName");
    $committee->hierarchy = $request->input("hierarchy"); // Assuming hierarchy is a string
    $committee->description = $request->input("committeeDescription");

    // Decode the teamMembers JSON
    $teamMembers = json_decode($request->input("teamMembers"), true);

    // Loop and attach photos
    foreach ($teamMembers as $index => &$member) {
        if ($request->hasFile("memberPhoto_$index")) {
            $photo = $request->file("memberPhoto_$index");
            $photo->store('committees', 'public');
            $member['photo'] = $photo->hashName();
        } else {
            $member['photo'] = null;
        }
    }

    // Store final members array
    $committee->committee_members = json_encode($teamMembers);
    $committee->save();

    return [
        'message' => 'Committee created successfully',
        'committee_name' => $committee->name,
        'description' => $committee->description,
        'committee_members' => $teamMembers
    ];
}

    public function index(Request $request)
    { 
        $search=$request->query('search');
        $application = Committee::latest()->when($search,function($query,$search){
         return $query->where('name','like','%'.$search.'%')->orWhere('description','like','%'.$search.'%');
        })->paginate(10);
        // $application = Committee::paginate(10);
        $application = Committee::latest()->paginate(10);
        // $application->load("applications");
        // $application->load("application");
        return $application;
    }

 public function update(Request $request, $id)
    {
        // --- 1. Validation (Highly Recommended) ---
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'committee_members' => 'required|json',
            // Validate that member_photos is an array of files if it exists
            'member_photos' => 'nullable|array',
            'member_photos.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            // Validate that indexes is an array if it exists
            'member_photo_indexes' => 'nullable|array',
            'member_photo_indexes.*' => 'integer',
        ]);
        
        // --- 2. Find the committee or fail ---
        $committee = Committee::findOrFail($id);

        // --- 3. Get old photo paths for later cleanup ---
        $oldMembersData = json_decode($committee->committee_members, true) ?? [];
        $oldPhotoPaths = array_filter(array_column($oldMembersData, 'photo'));

        // --- 4. Update basic committee fields ---
        $committee->name = $validated['name'];
        $committee->description = $validated['description'];
        // Note: 'hierarchy' seems to be a per-member property based on your frontend,
        // so it should be updated within the 'committee_members' JSON, not here.

        // --- 5. Prepare the final member data from the request ---
        // This is the "source of truth" for the final state of the members list.
        $finalMembersData = json_decode($validated['committee_members'], true);

        // --- 6. Process new photo uploads, if they exist ---
        if ($request->hasFile('member_photos')) {
            $newPhotos = $request->file('member_photos');
            $photoIndexes = $request->input('member_photo_indexes');

            // Create a map of [index => UploadedFile] for easy lookup
            if (count($newPhotos) === count($photoIndexes)) {
                $photoMap = array_combine($photoIndexes, $newPhotos);

                foreach ($photoMap as $index => $photoFile) {
                    // Check if the index is valid and the file is good
                    if (isset($finalMembersData[$index]) && $photoFile->isValid()) {
                        // Store new photo and get its unique name
                        $newPhotoName = $photoFile->hashName();
                        $photoFile->store('committees', 'public');

                        // Update the photo property for the correct member in our final data array
                        $finalMembersData[$index]['photo'] = $newPhotoName;
                    }
                }
            } else {
                 // Optional: Log an error if counts don't match, as it indicates a frontend issue.
                 Log::warning('Mismatched count between member_photos and member_photo_indexes for committee ' . $id);
            }
        }

        // --- 7. Clean up unused photos ---
        // Get all photo paths that are in the final list
        $finalPhotoPaths = array_filter(array_column($finalMembersData, 'photo'));

        // Find which of the old photos are NOT in the final list
        $photosToDelete = array_diff($oldPhotoPaths, $finalPhotoPaths);

        foreach ($photosToDelete as $photo) {
            // Make sure we don't try to delete a non-existent file
            if ($photo) {
                Storage::disk('public')->delete('committees/' . $photo);
            }
        }

        // --- 8. Save the updated committee_members JSON ---
        $committee->committee_members = json_encode($finalMembersData);

        // --- 9. Save the committee model and return a response ---
        $committee->save();

        return response()->json([
            'message' => 'Committee updated successfully!',
            'committee' => $committee,
        ], 200);
    }


    public function destroy(Request $request, $id)

    { 
        $application= Committee::findOrFail($id);
   
         $member = json_decode($application->committee_members,true);
         $arrayImage=array_column($member,'photo');
         for($i=0;$i<count($arrayImage);$i++){
              Storage::disk('public')->delete('committees/'.$arrayImage[$i]);
        }
     
    
        $news = Committee::destroy($id);
        return [
            'message' => 'Application deleted successfully',
            'id' => $id,
            'request' => $arrayImage
        ];
    }
    public function show($id)
    {
        return 'Application show';
    }
    public function create()
    {
        return 'Application create';
    }
    public function edit($id)
    {
        return 'Application edit';
    }
    public function view($id)
    {
        return 'Application view';
    }
}
