<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class RegisterTest extends DuskTestCase
{
    /**
     * Test the "Sign In" link on register page
     */
    public function test_sign_in_link()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/register')
                ->waitUntilMissing('.loader-container', 10)
                ->clickLink('Sign In')
                ->assertPathIs('/login');
        });
    }

    /**
     * Test duplicate email registration fails
     */
    public function test_register_with_duplicate_email_fails()
    {
        $this->browse(function (Browser $browser) {
            $email = 'duplicate@example.com';

            // First registration
            $browser->visit('/register')
                ->waitUntilMissing('.loader-container', 10)
                ->pause(1000)
                ->type('name', 'OriginalUser')
                ->type('email', $email)
                ->type('password', 'Password@123')
                ->type('password_confirmation', 'Password@123')
                ->waitFor('button[type="submit"]:not([disabled])')
                ->press('button[type="submit"]')
                ->waitForText('Registration successful') // adjust this if needed
                ->whenAvailable('.swal2-confirm', function ($button) {
                    $button->click();
                })
                ->waitForLocation('/login')
                ->assertPathIs('/login');

            // Second registration attempt with same email
            $browser->visit('/register')
                ->waitUntilMissing('.loader-container', 10)
                ->pause(1000)
                ->type('name', 'DuplicateUser')
                ->type('email', $email)
                ->type('password', 'Password@123')
                ->type('password_confirmation', 'Password@123')
                ->waitFor('button[type="submit"]:not([disabled])')
                ->press('button[type="submit"]')
                ->waitForText('The email has already been taken');
        });
    }

    /**
     * Test register page functionality with valid data
     */
    public function test_register_functionality_with_valid_data()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/register')
                ->waitUntilMissing('.loader-container', 10)
                ->pause(1000) // add 1s pause to ensure React has fully rendered
                ->type('name', 'TestUser')
                ->type('email', 'testuser@example.com')
                ->type('password', 'Password@123')
                ->type('password_confirmation', 'Password@123')
                ->press('button[type="submit"]');
        });
    }

    /**
     * Test register page validation errors
     */
    public function test_register_validation_errors()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/register')
                ->waitUntilMissing('.loader-container', 10)
                ->press('button[type="submit"]') // Submit without filling fields
                ->waitForText('The name field is required')
                ->waitForText('The email field is required')
                ->waitForText('The password field is required');
        });
    }

    /**
     * Test password confirmation mismatch
     */
    public function test_password_mismatch_error()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/register')
                ->waitUntilMissing('.loader-container', 10)
                ->typeSlowly('input[name="password"]', 'Password@123')
                ->typeSlowly('input[name="password_confirmation"]', 'Different@123')
                ->press('button[type="submit"]')
                ->waitForText('The password field confirmation does not match');
        });
    }
}
