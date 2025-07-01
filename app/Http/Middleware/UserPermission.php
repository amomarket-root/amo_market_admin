<?php

namespace App\Http\Middleware;

use App\Exceptions\CustomException;
use App\Models\Privilege;
use App\Models\PrivilegeRole;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPermission
{
    /**
     * Handle an incoming request.
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $controller = class_basename($request->route()->getAction()['controller']);

        // Retrieve the authenticated user
        $user   = Auth::user();
        $userId = $user ? $user->id : null;

        if (! $userId) {
            return response()->json([
                'status'  => false,
                'message' => 'User not authenticated.',
            ], 401);
        }

        $user = User::where('id', $userId)->first();

        if (! $user) {
            return response()->json([
                'status'  => false,
                'message' => 'User not found.',
            ], 404);
        }

        if (! $this->isUserHavePrivilege($user, $controller)) {
            return response()->json([
                'status'  => false,
                'message' => 'You do not have permission to perform this action.',
            ], 403);
        }

        return $next($request);
    }

    /**
     * Check if the user has the required privilege for the given controller action.
     */
    private function isUserHavePrivilege(User $user, string $controller): bool
    {
        $userRole = $user->role;

        if (! $userRole) {
            throw new CustomException('User does not have a role assigned');
        }

        $privilege = Privilege::where('description', $controller)->first();

        if (! $privilege) {
            throw new CustomException("Controller method '{$controller}' is not registered in permissions");
        }

        return PrivilegeRole::where('role_id', $userRole->id)
            ->where('privilege_id', $privilege->id)
            ->exists();
    }
}
