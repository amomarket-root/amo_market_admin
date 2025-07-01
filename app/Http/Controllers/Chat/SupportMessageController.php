<?php

namespace App\Http\Controllers\Chat;

use App\Events\SupportMessageSent;
use App\Http\Controllers\Controller;
use App\Models\SupportMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SupportMessageController extends Controller
{
    // Send a message for support admin
    public function supportSendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|uuid',
            'message'     => 'required|string',
            'type'        => 'required|string',
        ]);

        $message = SupportMessage::create([
            'sender_id'   => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'message'     => $request->message,
            'type'        => $request->type,
        ]);

        // Broadcast the message
        broadcast(new SupportMessageSent($message))->toOthers();

        return response()->json(['message' => 'Message sent successfully', 'data' => $message], 201);
    }

    // Get messages for the authenticated support admin
    public function supportGetMessages(Request $request)
    {
        $userId     = Auth::id();
        $customerId = $request->query('customer_id');

        $messages = SupportMessage::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->with(['sender', 'receiver'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json(['messages' => $messages], 200);
    }

    public function getCustomers(Request $request)
    {
        $adminId = Auth::id();

        // Get unique customer IDs from messages where the admin is the receiver
        $customerIds = SupportMessage::where('receiver_id', $adminId)
            ->distinct()
            ->pluck('sender_id');

        // Fetch customer details
        $customers = User::with('avatar')->whereIn('id', $customerIds)->get();

        return response()->json(['customers' => $customers], 200);
    }
}
