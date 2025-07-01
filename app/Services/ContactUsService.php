<?php

namespace App\Services;

use App\Models\ContactUs;
use Illuminate\Support\Facades\Validator;

class ContactUsService
{
    public function getPaginate($data)
    {
        $pageSize  = $data['per_page']   ?? 10;
        $sortBy    = $data['sort_by']    ?? 'created_at';
        $sortOrder = $data['sort_order'] ?? 'desc';

        return ContactUs::orderBy($sortBy, $sortOrder)
            ->paginate($pageSize);
    }

    public function validateCreateContactUsData($data)
    {
        return Validator::make($data, [
            'company_name'           => 'required|string|max:255',
            'address_line1'          => 'required|string|max:255',
            'address_line2'          => 'nullable|string|max:255',
            'city'                   => 'required|string|max:100',
            'state'                  => 'required|string|max:100',
            'postal_code'            => 'required|string|max:20',
            'phone_numbers'          => 'required|string|max:255',
            'email'                  => 'required|email|max:255',
            'social_media'           => 'required|array',
            'social_media.facebook'  => 'nullable|string|max:255',
            'social_media.instagram' => 'nullable|string|max:255',
            'social_media.youtube'   => 'nullable|string|max:255',
            'social_media.linkedin'  => 'nullable|string|max:255',
        ]);
    }

    public function createContactUs($request)
    {
        $data = $request->all();

        // Convert social_media array to JSON
        $data['social_media'] = json_encode($data['social_media']);

        return ContactUs::create([
            'company_name'  => $data['company_name'],
            'address_line1' => $data['address_line1'],
            'address_line2' => $data['address_line2'] ?? null,
            'city'          => $data['city'],
            'state'         => $data['state'],
            'postal_code'   => $data['postal_code'],
            'phone_numbers' => $data['phone_numbers'],
            'email'         => $data['email'],
            'social_media'  => $data['social_media'],
        ]);
    }

    public function validateContactUsId($data)
    {
        return Validator::make($data, [
            'id' => 'required|uuid|exists:contact_us,id',
        ]);
    }

    public function getContactUsById($id)
    {
        return ContactUs::findOrFail($id);
    }

    public function validateUpdateContactUsData($data)
    {
        return Validator::make($data, [
            'id'                     => 'required|uuid|exists:contact_us,id',
            'company_name'           => 'required|string|max:255',
            'address_line1'          => 'required|string|max:255',
            'address_line2'          => 'nullable|string|max:255',
            'city'                   => 'required|string|max:100',
            'state'                  => 'required|string|max:100',
            'postal_code'            => 'required|string|max:20',
            'phone_numbers'          => 'required|string|max:255',
            'email'                  => 'required|email|max:255',
            'social_media'           => 'required|array',
            'social_media.facebook'  => 'nullable|string|max:255',
            'social_media.instagram' => 'nullable|string|max:255',
            'social_media.youtube'   => 'nullable|string|max:255',
            'social_media.linkedin'  => 'nullable|string|max:255',
        ]);
    }

    public function updateContactUs($request)
    {
        $data      = $request->all();
        $contactUs = ContactUs::findOrFail($data['id']);

        // Convert social_media array to JSON
        $data['social_media'] = json_encode($data['social_media']);

        $contactUs->update([
            'company_name'  => $data['company_name'],
            'address_line1' => $data['address_line1'],
            'address_line2' => $data['address_line2'] ?? $contactUs->address_line2,
            'city'          => $data['city'],
            'state'         => $data['state'],
            'postal_code'   => $data['postal_code'],
            'phone_numbers' => $data['phone_numbers'],
            'email'         => $data['email'],
            'social_media'  => $data['social_media'],
        ]);

        return $contactUs;
    }

    public function deleteContactUs($id)
    {
        $contactUs = ContactUs::findOrFail($id);
        $contactUs->delete();

        return $contactUs;
    }
}
