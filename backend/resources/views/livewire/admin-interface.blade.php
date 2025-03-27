<div id="messages-container" class="container mx-auto py-6">
    <h1 class="text-2xl font-semibold mb-6">Admin Dashboard</h1>

    @if(session()->has('message'))
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span class="block sm:inline">{{ session('message') }}</span>
        </div>
    @endif

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
        @if(count($messages) > 0)
            @php
                $thClass = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
                $tdClass = "px-6 py-4 text-sm text-gray-500";
            @endphp
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="{{ $thClass }}">ID</th>
                        <th scope="col" class="{{ $thClass }}">User</th>
                        <th scope="col" class="{{ $thClass }}">Message</th>
                        <th scope="col" class="{{ $thClass }}">Created At</th>
                        <th scope="col" class="{{ $thClass }}">Status</th>
                        <th scope="col" class="{{ $thClass }}">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @foreach($messages as $message)
                        <tr>
                            <td class="{{ $tdClass }} whitespace-nowrap">{{ $message->id }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="ml-2">
                                        <div class="text-sm font-medium text-gray-900">
                                            {{ $message->user->name }}
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            {{ $message->user->email }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="{{ $tdClass }}">{{ Str::limit($message->data, 50) }}</td>
                            <td class="{{ $tdClass }} whitespace-nowrap">{{ $message->created_at?->format('M d, Y H:i') ?? '-' }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {{ $message->processed ? 'bg-green-100 text-green-800' : 'bg-orange-300 text-orange-800' }}">
                                    {{ $message->processed ? 'Processed' : 'Pending' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                @if(!$message->processed)
                                    <button wire:click="markAsProcessed({{ $message->id }})" class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Mark as Processed
                                    </button>
                                @else
                                    <p class="px-6 py-4 text-sm text-gray-500">
                                        -
                                    </p>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="px-6 py-3">
                {{ $messages->links() }}
            </div>
        @else
            <div class="px-6 py-4 text-center text-gray-500">
                No pending messages found.
            </div>
        @endif
    </div>
</div>