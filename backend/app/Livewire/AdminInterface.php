<?php

namespace App\Livewire;

use App\Models\Message;
use App\Events\MessageProcessed;
use Livewire\Component;
use Livewire\WithPagination;
use Illuminate\Support\Facades\Event;

class AdminInterface extends Component
{
    use WithPagination;

    protected $listeners = ['refreshMessages' => '$refresh'];

    public function render()
    {
        return view('livewire.admin-interface', [
            'messages' => Message::with('user')->orderBy('created_at', 'desc')->paginate(10),
        ]);
    }

    public function markAsProcessed($messageId)
    {
        $message = Message::findOrFail($messageId);
        $message->processed = true;
        $message->processed_at = now();
        $message->save();

        Event::dispatch(new MessageProcessed(
            $message->user->id,
            $message->id,
            $message->processed
        ));

        session()->flash('message', 'Message marked as processed successfully.');
    }
}
