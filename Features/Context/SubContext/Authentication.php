<?php

/**
 * File containing the Common Functions for context class PlatformUI.
 *
 * @copyright Copyright (C) eZ Systems AS. All rights reserved.
 * @license For full copyright and license information view LICENSE file distributed with this source code.
 * @version //autogentag//
 */

namespace EzSystems\PlatformUIBundle\Features\Context\SubContext;

use EzSystems\PlatformUIBundle\Features\Helper\JavaScript as JsHelper;
use PHPUnit_Framework_Assert as Assertion;

trait Authentication
{
    /**
     * Control variable to check if logged in
     *
     * @var boolean
     */
    protected $shouldBeLoggedIn;

    /**
     * @Given I go to PlatformUI app
     */
    public function goToPlatformUi()
    {
        $this->visit( $this->platformUiUri );
    }

    /**
     * @Given I go to PlatformUI app with username :user and password :password
     */
    public function goToPlatformUiAndLogIn( $username, $password )
    {
        $this->goToPlatformUi();
        $this->waitForInitialApplicationLoading();
        $this->waitForApplicationPageLoading();
        $this->fillFieldWithValue( 'Username', $username );
        $this->fillFieldWithValue( 'Password', $password );
        $this->iClickAtButton( 'Login' );
        $this->waitForApplicationPageLoading();
        $this->iShouldBeLoggedIn();
    }

    /**
     * Waits for the initial application loading. When the app is ready, the app
     * container gets the class ez-platformui-app-ready
     */
    protected function waitForInitialApplicationLoading()
    {
        $page = $this->getSession()->getPage();

        while ( !$page->has( 'css', '.ez-platformui-app-ready' ) )
        {
            // TODO don't that for ever, throw an exception after some
            // iterations. Also see http://docs.behat.org/en/v2.5/cookbook/using_spin_functions.html
            // for a much better way to implement that and
            // waitForApplicationPageLoading
            usleep( 100 * 1000 );
        }
    }

    /**
     * Waits for the application "page" to load. The "page" is considered to be
     * loading when the app container has either the class is-app-loading or
     * yui3-app-transitioning.
     *
     * @AfterStep
     */
    public function waitForApplicationPageLoading()
    {
        $page = $this->getSession()->getPage();

        while ( $page->has( 'css', '.is-app-loading, .yui3-app-transitioning' ) )
        {
            // TODO don't that for ever
            usleep( 100 * 1000 );
        }
    }

    /**
     * @Given I am logged in as admin on PlatformUI
     */
    public function loggedAsAdminPlatformUi()
    {
        $this->goToPlatformUiAndLogIn( "admin", "publish" );
    }

    /**
     * @Given I logout
     */
    public function iLogout()
    {
        $this->shouldBeLoggedIn = false;
        $this->iClickAtLink( "Logout" );
    }

    /**
     * @Then I should be logged in
     */
    public function iShouldBeLoggedIn()
    {
        $this->shouldBeLoggedIn = true;

        Assertion::assertFalse(
            $this->getSession()->getPage()->has( 'css', '.ez-loginform' ),
            "The login form should not be visible"
        );
    }

    /**
     * Checks if the user is still logged in
     *
     * @AfterStep
     */
    public function runAfterStep()
    {
        if ( $this->shouldBeLoggedIn )
        {
            $this->iShouldBeLoggedIn();
        }
    }

    /**
     * Checks if the user is still logged in
     *
     * @AfterScenario
     */
    public function loggOutAfterScenario()
    {
        $this->iLogout();
    }
}
