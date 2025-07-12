<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\GalleryImageController;
use App\Http\Controllers\CommitteeController;
use App\Http\Controllers\IncubationEmailController;
use App\Http\Controllers\ApplicantStatusEmailController;
use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AdminProfileController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function () {
  // admin profile update 
  Route::post('/signup', [AdminController::class, 'register'])->name('api.signup');
// Route::get('/profile', [AdminProfileController::class, 'show'])->name('api.profile');
// Route::post('/profileData/{id}', [AdminProfileController::class, 'update'])->name('api.profile.update');
// Route::put('/profile-image', [AdminProfileController::class, 'changeImage'])->name('api.change-email');
// Route::post('/change-password', [AdminProfileController::class, 'changePassword'])->name('api.change-password');
    // Route::get('/dashboard', [AdminController::class, 'index'])->name('api.dashboard');
    // News CRUD API routes
Route::post('/news', [NewsController::class, 'store'])->name('api.news');
Route::put('/news/{id}', [NewsController::class, 'update'])->name('api.news.update');
Route::delete('/news/{id}', [NewsController::class, 'destroy'])->name('api.news.destroy');
// Route::get('/news/{id}', [NewsController::class, 'show'])->name('api.news.show');
  //Notice CRUD API routes
Route::post('/notice', [NoticeController::class, 'store'])->name('api.notice');
Route::put('/notice/{id}', [NoticeController::class, 'update'])->name('api.notice');
Route::delete('/notice/{id}', [NoticeController::class, 'destroy'])->name('api.notice.destroy');
 //Application CRUD API routes of applicants
Route::get('/application/{id}', [ApplicationController::class, 'view'])->name('api.application.view');
Route::post('/application', [ApplicationController::class, 'store'])->name('api.application');
Route::put('/application/{id}', [ApplicationController::class, 'update'])->name('api.application');
Route::delete('/application/{id}', [ApplicationController::class, 'destroy'])->name('api.application.destroy');

// // Applicant CRUD API routes of committee
// Route::post('/applicant', [ApplicantController::class, 'store'])->name('api.applicant');
Route::put('/applicant', [ApplicantController::class, 'update'])->name('api.applicant');
Route::delete('/applicant/{id}', [ApplicantController::class, 'destroy'])->name('api.applicant.destroy');
// Committees CRUD API routes
Route::post('/committee', [CommitteeController::class, 'store'])->name('api.committee');
Route::put('/committee/{id}', [CommitteeController::class, 'update'])->name('api.committee.update');
Route::delete('/committee/{id}', [CommitteeController::class, 'destroy'])->name('api.committee.destroy');
// Gallery CRUD API routes
Route::post('/gallery', [GalleryImageController::class, 'store'])->name('api.gallery');
Route::put('/gallery/{id}', [GalleryImageController::class, 'update'])->name('api.gallery.update');
Route::delete('/gallery/{id}', [GalleryImageController::class, 'destroy'])->name('api.gallery.destroy');
//contact API routes
Route::delete('/contact/{id}', [ContactController::class, 'deleteData'])->name('api.contact');
 // validate admin 
 Route::get('/profile', [AdminProfileController::class, 'show'])->name('api.profile');
Route::post('/profileData/{id}', [AdminProfileController::class, 'update'])->name('api.profile.update');
Route::post('/profileImage/{id}', [AdminProfileController::class, 'changeImage'])->name('api.changeImage');
Route::post('/changePassword/{id}', [AdminProfileController::class, 'changePassword'])->name('api.changePassword');

});

// Admin login API (returns JSON)
Route::post('/login', [AdminController::class, 'login'])->name('api.login');
Route::post('/logout', [AdminController::class, 'logout'])->name('api.logout');
// Check token API
Route::post('/checktoken', [AdminController::class, 'checkToken'])->name('api.checktoken');
Route::post('/forget-password', [AdminController::class, 'forgetPassword'])->name('api.forget-password');
Route::post('/reset-password', [AdminController::class, 'resetPassword'])->name('api.reset-password');
// News CRUD API routes
Route::get('/news', [NewsController::class, 'index'])->name('api.news');
// Route::post('/news', [NewsController::class, 'store'])->name('api.news');
// Route::put('/news/{id}', [NewsController::class, 'update'])->name('api.news.update');
// Route::delete('/news/{id}', [NewsController::class, 'destroy'])->name('api.news.destroy');
Route::get('/news/{id}', [NewsController::class, 'show'])->name('api.news.show');

//Notice CRUD API routes
Route::get('/notice', [NoticeController::class, 'index'])->name('api.notice');
// Route::post('/notice', [NoticeController::class, 'store'])->name('api.notice');
// Route::put('/notice/{id}', [NoticeController::class, 'update'])->name('api.notice.update');
// Route::delete('/notice/{id}', [NoticeController::class, 'destroy'])->name('api.notice.destroy');
//Route::get('/notice/show/{id}', [NoticeController::class, 'show'])->name('api.notice.show');

//Application CRUD API routes of applicants
Route::get('/application', [ApplicationController::class, 'index'])->name('api.application');
// Route::get('/application/{id}', [ApplicationController::class, 'view'])->name('api.application.view');
// Route::post('/application', [ApplicationController::class, 'store'])->name('api.application');
// Route::put('/application/{id}', [ApplicationController::class, 'update'])->name('api.application');
// Route::delete('/application/{id}', [ApplicationController::class, 'destroy'])->name('api.application.destroy');

// Applicant CRUD API routes of committee
Route::get('/applicant', [ApplicantController::class, 'index'])->name('api.applicant');
Route::post('/applicant', [ApplicantController::class, 'store'])->name('api.applicant');
// Route::put('/applicant', [ApplicantController::class, 'update'])->name('api.applicant');
// Route::delete('/applicant/{id}', [ApplicantController::class, 'destroy'])->name('api.applicant.destroy');

//Committees CRUD API routes
Route::get('/committee', [CommitteeController::class, 'index'])->name('api.committee');
// Route::post('/committee', [CommitteeController::class, 'store'])->name('api.committee');
// Route::put('/committee/{id}', [CommitteeController::class, 'update'])->name('api.committee.update');
// Route::delete('/committee/{id}', [CommitteeController::class, 'destroy'])->name('api.committee.destroy');


//Gallery CRUD API routes
Route::get('/gallery', [GalleryImageController::class, 'index'])->name('api.gallery');
// Route::post('/gallery', [GalleryImageController::class, 'store'])->name('api.gallery');
// Route::put('/gallery/{id}', [GalleryImageController::class, 'update'])->name('api.gallery.update');
// Route::delete('/gallery/{id}', [GalleryImageController::class, 'destroy'])->name('api.gallery.destroy');

//Send email from frontend
// Route::post('/send-email', [AdminController::class, 'sendEmail'])->name('api.send-email');
Route::get("/send-email",[IncubationEmailController::class,'sendEmail']);
Route::post("/send-email",[IncubationEmailController::class,'onlyApplicant']);

Route::put('status-email', [ApplicantStatusEmailController::class, 'index'])->name('api.status-email');
// contact API routes
Route::post('/contact', [ContactController::class, 'store'])->name('api.contact');
Route::get('/contact', [ContactController::class, 'index'])->name('api.contact');

Route::get('/dashboard', [AdminController::class, 'index'])->name('api.dashboard');
// fetching a valide admin
Route::get('/admin', [AdminController::class, 'show'])->name('api.admin');
// fetching a valide admin
// Route::get('/profile', [AdminProfileController::class, 'show'])->name('api.profile');
// Route::post('/profileData/{id}', [AdminProfileController::class, 'update'])->name('api.profile.update');
// Route::post('/profileImage/{id}', [AdminProfileController::class, 'changeImage'])->name('api.changeImage');
// Route::post('/changePassword/{id}', [AdminProfileController::class, 'changePassword'])->name('api.changePassword');