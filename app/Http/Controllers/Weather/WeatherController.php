<?php

namespace App\Http\Controllers\Weather;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class WeatherController extends Controller
{
    public function weather(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), [
                'latitude'  => 'required|numeric',
                'longitude' => 'required|numeric',
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'validation error',
                    'errors'  => $validateUser->errors(),
                ], 401);
            }
            $apiKey      = config('services.openweathermap.api_key');
            $latitude    = $request->latitude;
            $longitude   = $request->longitude;
            $response    = Http::get("https://api.openweathermap.org/data/2.5/weather?lat=$latitude&lon=$longitude&appid=$apiKey");
            $weatherdata = $response->json();

            if (! $weatherdata) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Weather Data Not Found For Provided Coordinates',
                ], 404);
            }

            return response()->json([
                'status'  => true,
                'message' => 'Weather Data Found Sucessfully.',
                'data'    => $weatherdata,
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
