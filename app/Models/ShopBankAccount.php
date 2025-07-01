<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShopBankAccount extends ActiveModel
{
    use HasUuids;
    use SoftDeletes;

    protected $table = 'shop_bank_accounts';

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'shop_id',
        'account_holder_name',
        'account_number',
        'bank_name',
        'branch_name',
        'ifsc_code',
        'account_type',
        'upi_id',
        'is_verified',
        'name_match_score',
        'verification_response',
    ];

    protected $casts = [
        'is_verified'           => 'boolean',
        'verification_response' => 'json',
    ];

    /**
     * Get the shop that owns the bank account.
     */
    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class, 'shop_id', 'id');
    }

    /**
     * Get the masked account number for display.
     */
    public function getMaskedAccountNumberAttribute(): string
    {
        return 'XXXXXX'.substr($this->account_number, -4);
    }

    /**
     * Scope a query to only include verified accounts.
     */
    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }
}
