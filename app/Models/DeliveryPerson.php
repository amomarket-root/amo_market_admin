<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

class DeliveryPerson extends ActiveModel
{
    use HasUuids;
    use Notifiable;

    protected $table = 'delivery_persons';

    protected $primaryKey = 'id';

    public $incrementing = false; // Since 'id' is a UUID

    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'name',
        'number',
        'driving_license',
        'license_document',
        'PAN_Number',
        'PAN_Photo',
        'delivery_mode',
        'vehicle_number',
        'location',
        'latitude',
        'longitude',
        'rating',
        'online_status',
        'status',
    ];

    /**
     * Relationship with User
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function orderFeedbacks()
    {
        return $this->hasMany(OrderFeedback::class);
    }

    public function updateRating()
    {
        $this->rating = $this->orderFeedbacks()->avg('delivery_rating');
        $this->save();
    }

    /**
     * Get all bank accounts for the delivery person.
     */
    public function bankAccounts(): HasMany
    {
        return $this->hasMany(DeliveryPersonBankAccount::class, 'delivery_person_id', 'id');
    }
}
