<?php

namespace App\Services;

use App\Models\DeliveryPerson;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class DeliveryPersonService
{
    protected $fileHandlerService;

    public function __construct(FileHandlerService $fileHandlerService)
    {
        $this->fileHandlerService = $fileHandlerService;
    }

    public function getAll()
    {
        return DeliveryPerson::orderBy('id', 'asc')->get();
    }

    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'id';
        $sortOrder = $data['sort_order'] ?? 'asc';

        return DeliveryPerson::orderBy($sortBy, $sortOrder)->paginate($pageSize);
    }

    public function validateCreateDeliveryPersonData($data)
    {
        return Validator::make($data, [
            'name'                  => 'required|string',
            'number'                => 'required|string|unique:delivery_persons,number',
            'driving_license'       => 'nullable|string',
            'License_Document_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'PAN_Number'            => 'required|string',
            'PAN_Photo_file'        => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'delivery_mode'         => 'nullable|in:motorcycle,electric_vehicle,bicycle',
            'vehicle_number'        => 'required|string',
            'location'              => 'required|string',
            'latitude'              => 'required|string',
            'longitude'             => 'required|string',
            'online_status'         => 'required|numeric',
            'status'                => 'required|numeric',
        ]);
    }

    public function createDeliveryPerson($request)
    {
        $data = $request->all(); // Convert request to array

        // Handle file uploads
        $data['License_Document_file'] = $request->hasFile('License_Document_file')
            ? $this->saveFile($request->file('license_document'), 'license_document', $data['name'])
            : null;

        $data['PAN_Photo_file'] = $request->hasFile('PAN_Photo_file')
            ? $this->saveFile($request->file('PAN_Photo'), 'PAN_Photo', $data['name'])
            : null;

        // Create the delivery person
        return DeliveryPerson::create([
            'name'             => $data['name'],
            'number'           => $data['number'],
            'driving_license'  => $data['driving_license']       ?? null,
            'license_document' => $data['License_Document_file'] ?? null,
            'PAN_Number'       => $data['PAN_Number'],
            'PAN_Photo'        => $data['PAN_Photo_file'] ?? null,
            'delivery_mode'    => $data['delivery_mode']  ?? null,
            'vehicle_number'   => $data['vehicle_number'],
            'location'         => $data['location'],
            'latitude'         => $data['latitude'],
            'longitude'        => $data['longitude'],
            'online_status'    => $data['online_status'],
            'status'           => $data['status'],
        ]);
    }

    public function validateDeliveryPersonId($data)
    {
        return Validator::make($data, [
            'id' => 'required|string|exists:delivery_persons,id',
        ]);
    }

    public function getDeliveryPersonById($id)
    {
        return DeliveryPerson::findOrFail($id);
    }

    public function validateUpdateDeliveryPersonData($data)
    {
        return Validator::make($data, [
            'delivery_person_id'    => 'required|string|exists:delivery_persons,id',
            'name'                  => 'required|string',
            'number'                => 'required|string|unique:delivery_persons,number,'.$data['delivery_person_id'],
            'driving_license'       => 'nullable|string',
            'License_Document_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'PAN_Number'            => 'required|string',
            'PAN_Photo_file'        => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'delivery_mode'         => 'nullable|in:motorcycle,electric_vehicle,bicycle',
            'vehicle_number'        => 'required|string',
            'location'              => 'required|string',
            'latitude'              => 'required|string',
            'longitude'             => 'required|string',
            'online_status'         => 'required|numeric',
            'status'                => 'required|numeric',
        ]);
    }

    public function updateDeliveryPerson($request)
    {
        $data           = $request->all(); // Convert request data to an array
        $deliveryPerson = DeliveryPerson::findOrFail($data['delivery_person_id']);

        // Handle file uploads correctly
        if ($request->hasFile('License_Document_file')) {
            $data['License_Document_file'] = $this->saveFile($request->file('License_Document_file'), 'license_document', $data['name']);
        }

        if ($request->hasFile('PAN_Photo_file')) {
            $data['PAN_Photo_file'] = $this->saveFile($request->file('PAN_Photo_file'), 'PAN_Photo', $data['name']);
        }

        // Update only the fields that are provided
        $deliveryPerson->update([
            'name'             => $data['name'],
            'number'           => $data['number'],
            'driving_license'  => $data['driving_license']       ?? $deliveryPerson->driving_license,
            'license_document' => $data['License_Document_file'] ?? $deliveryPerson->license_document,
            'PAN_Number'       => $data['PAN_Number'],
            'PAN_Photo'        => $data['PAN_Photo_file'] ?? $deliveryPerson->PAN_Photo,
            'delivery_mode'    => $data['delivery_mode']  ?? $deliveryPerson->delivery_mode,
            'vehicle_number'   => $data['vehicle_number'],
            'location'         => $data['location'],
            'latitude'         => $data['latitude'],
            'longitude'        => $data['longitude'],
            'online_status'    => $data['online_status'],
            'status'           => $data['status'],
        ]);

        return $deliveryPerson;
    }

    public function deleteDeliveryPerson($id)
    {
        $deliveryPerson = DeliveryPerson::findOrFail($id);
        $deliveryPerson->delete();

        return $deliveryPerson;
    }

    private function saveFile($file, $folder, $name)
    {
        if ($file && $file instanceof UploadedFile) {
            $dirPath = "/delivery_person_document/{$name}/{$folder}";

            return $this->fileHandlerService->saveFileToStorage($file, $dirPath);
        }

        return null;
    }
}
