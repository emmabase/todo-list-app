<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Todo;
use App\Http\Controllers\TodoController;


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

Route::get('/todos', [TodoController::class, 'index']);
Route::get('/todo/{id}', [TodoController::class, 'showSingleTodo']);
Route::post('/todo', [TodoController::class, 'store']);
Route::put('/todo/{id}', [TodoController::class, 'updateTodo']);
Route::delete('/todo/{id}', [TodoController::class, 'delete']);
