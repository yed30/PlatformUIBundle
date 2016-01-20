<?php

/**
 * File containing the SystemInfoHelper class.
 *
 * @copyright Copyright (C) eZ Systems AS. All rights reserved.
 * @license For full copyright and license information view LICENSE file distributed with this source code.
 */
namespace EzSystems\PlatformUIBundle\Helper;

use Doctrine\DBAL\Connection;
use ezcSystemInfo;

class SystemInfoHelper implements SystemInfoHelperInterface
{
    /**
     * An array containing the active bundles (keys) and the corresponding
     * namespace.
     *
     * @var array
     */
    private $bundles;

    /**
     * The database connection, only used to retrieve some information on the
     * database itself.
     *
     * @var \Doctrine\DBAL\Connection
     */
    private $connection;

    /**
     * @var string
     */
    private $installDir;

    /**
     * @param Connection $db
     * @param array $bundles
     * @param string $installDir
     */
    public function __construct(Connection $db, array $bundles, $installDir)
    {
        $this->bundles = $bundles;
        $this->connection = $db;
        $this->installDir = $installDir;
    }

    /**
     * Returns the system information:
     *  - cpu information
     *  - memory size
     *  - php version
     *  - php accelerator info
     *  - database related info.
     *
     * @return array
     */
    public function getSystemInfo()
    {
        $info = ezcSystemInfo::getInstance();
        $accelerator = false;
        if ($info->phpAccelerator) {
            $accelerator = [
                'name' => $info->phpAccelerator->name,
                'url' => $info->phpAccelerator->url,
                'enabled' => $info->phpAccelerator->isEnabled,
                'versionString' => $info->phpAccelerator->versionString,
            ];
        }

        return [
            'cpuType' => $info->cpuType,
            'cpuSpeed' => $info->cpuSpeed,
            'cpuCount' => $info->cpuCount,
            'memorySize' => $info->memorySize,
            'phpVersion' => phpversion(),
            'phpAccelerator' => $accelerator,
            'database' => [
                'type' => $this->connection->getDatabasePlatform()->getName(),
                'name' => $this->connection->getDatabase(),
                'host' => $this->connection->getHost(),
                'username' => $this->connection->getUsername(),
            ],
        ];
    }

    /**
     *  Returns sorted list of bundles enabled.
     *
     * @return array
     */
    public function getBundles()
    {
        $bundles = $this->bundles;
        ksort($bundles, SORT_FLAG_CASE | SORT_STRING);

        return $bundles;
    }

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
    public function getPackagesInfo()
    {
        if (!file_exists($this->installDir . 'composer.lock')) {
            return array();
        }

        $packages = [];
        $lockData = json_decode(file_get_contents($this->installDir . 'composer.lock'), true);
        foreach ($lockData['packages'] as $packageData) {
            $packages[$packageData['name']] = [
                'version' => $packageData['version'],
                'time' => $packageData['time'],
                'homepage' => $packageData['homepage'],
                'reference' => $packageData['source']['reference'],

            ];
        }

        ksort($packages, SORT_FLAG_CASE | SORT_STRING);

        return $packages;
    }
}
