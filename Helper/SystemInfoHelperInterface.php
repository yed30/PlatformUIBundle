<?php

/**
 * File containing the SystemInfoHelperInterface interface.
 *
 * @copyright Copyright (C) eZ Systems AS. All rights reserved.
 * @license For full copyright and license information view LICENSE file distributed with this source code.
 */
namespace EzSystems\PlatformUIBundle\Helper;

interface SystemInfoHelperInterface
{
    /**
     * Returns information about the system running eZ Publish Platform.
     *
     * @return array
     */
    public function getSystemInfo();

    /**
     * Returns sorted list of bundles enabled.
     *
     * @return array
     */
    public function getBundles();

    /**
     * Returns sorted information about Composer packages.
     *
     * Key is package name, and each value consists of:
     * - version (version number, from package, typically `v6.0.2` or `dev-master`)
     * - time
     * - homepage
     * - reference (checksum, typically reflecting git sha1)
     *
     * @return array
     */
    public function getPackagesInfo();
}
