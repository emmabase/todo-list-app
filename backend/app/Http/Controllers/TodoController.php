<?php

namespace App\Http\Controllers;

use App\Models\Todo;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class TodoController extends Controller
{
    //
    public function index()
    {
        return Todo::select('id', 'name')
            ->orderBy('id', 'desc')
            ->get();
    }

    public function show(Todo $todo)
    {
        return $todo;
    }

    public function showSingleTodo($id)
    {
        return Todo::find($id);
    }

    public function store(Request $request)
    {
        $todo = Todo::create($request->all());

        return response()->json($todo, 201);
    }

    public function updateTodo(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        $todo->update($request->all());
        return $todo;
    }

    public function delete(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return 204;
    }
}
