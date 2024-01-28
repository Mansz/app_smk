<?php

/**
 * League.Uri (https://uri.thephpleague.com)
 *
 * (c) Ignace Nyamagana Butera <nyamsprod@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
declare (strict_types=1);
namespace GFPDF_Vendor\League\Uri\Exceptions;

use GFPDF_Vendor\League\Uri\Idna\IdnaInfo;
final class IdnaConversionFailed extends \GFPDF_Vendor\League\Uri\Exceptions\SyntaxError
{
    /** @var IdnaInfo|null  */
    private $idnaInfo;
    private function __construct(string $message, \GFPDF_Vendor\League\Uri\Idna\IdnaInfo $idnaInfo = null)
    {
        parent::__construct($message);
        $this->idnaInfo = $idnaInfo;
    }
    public static function dueToIDNAError(string $domain, \GFPDF_Vendor\League\Uri\Idna\IdnaInfo $idnaInfo) : self
    {
        return new self('The host `' . $domain . '` is invalid : ' . \implode(', ', $idnaInfo->errorList()) . ' .', $idnaInfo);
    }
    public static function dueToInvalidHost(string $domain) : self
    {
        return new self('The host `' . $domain . '` is not a valid IDN host');
    }
    public function idnaInfo() : ?\GFPDF_Vendor\League\Uri\Idna\IdnaInfo
    {
        return $this->idnaInfo;
    }
}
