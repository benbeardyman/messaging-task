<?php

use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Route;
use \App\Events\MessageProcessed;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('home');
});

/**
 * Auth routes
 * 
 * exluding CSRF token verification for development
 */
Route::withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::get('/broadcast', function () {
    broadcast(new MessageProcessed(1, 1, true));
});
