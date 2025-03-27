<?php

namespace App\Http\Controllers;

use App\Events\MessageReceived;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;

class MessageController extends Controller
{
    /**
     * Store a new message
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

        $message = Message::create($request->all());

        // Broadcast message received event with the full message
        Event::dispatch(new MessageReceived($message));

        return response()->json($message, 200);
    }

    /**
     * Get all messages
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $messages = Message::all();
        return response()->json($messages);
    }
}
