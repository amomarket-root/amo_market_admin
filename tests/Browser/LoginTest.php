<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class LoginTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     */
    public function test_forgot_password_link()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                ->waitUntilMissing('.loader-container', 10)
                ->clickLink('Forgot Password?')
                ->assertPathIs('/forgotPassword');
        });
    }

    public function test_sign_up_link()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                ->waitUntilMissing('.loader-container', 10)
                ->clickLink('Sign Up')
                ->assertPathIs('/register');
        });
    }

    public function test_login_page_functionality_correctly(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                // Wait for loader to disappear (adjust class as needed)
                ->waitUntilMissing('.loader-container', 10)

                // Wait for any visible input (more reliable)
                ->waitFor('input')

                // Fill form (using placeholder selector)
                ->typeSlowly('input[placeholder="Enter Email"]', 'superadmin@gmail.com')
                ->typeSlowly('input[placeholder="Enter Password"]', 'Sameer@0505')

                // Submit form
                ->press('button[type="submit"]')

                // Wait for navigation
                ->waitForLocation('/dashboard')
                ->assertPathIs('/dashboard');
        });
    }
}
