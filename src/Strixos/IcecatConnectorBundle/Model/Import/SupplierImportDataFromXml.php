<?php
namespace Strixos\IcecatConnectorBundle\Model\Import;

use \XMLReader as XMLReader;

use Strixos\IcecatConnectorBundle\Entity\Supplier;

/**
 * Import supplier data from an icecat XML file
 *
 * @author    Romain Monceau <romain@akeneo.com>
 * @copyright Copyright (c) 2012 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 *
 */
class SupplierImportDataFromXml extends DataImport
{
    /**
     * (non-PHPdoc)
     * @see \Strixos\IcecatConnectorBundle\Model\Import\DataImport::process()
     */
    public function process($xmlFile)
    {
        $batchSize = 2500;
        $i = 0;
        
        // read xml document and parse to suppliers entities
        $xml = new XMLReader();
        $xml->open($xmlFile);
        
        while ($xml->read()) {
            if ($xml->nodeType === XMLREADER::ELEMENT && $xml->name === 'SupplierMapping') {
                $supplier = new Supplier();
                $supplier->setIcecatId($xml->getAttribute('supplier_id'));
                $supplier->setName($xml->getAttribute('name'));
                $this->entityManager->persist($supplier);

                // Insert by groups
                if (++$i % $batchSize === 0) {
                    $this->entityManager->flush();
                    $this->entityManager->clear();
                }
            } else if ($xml->nodeType === XMLREADER::ELEMENT && $xml->name === 'SupplierMappings') {
                $date = $xml->getAttribute('Generated');
            }
        }
        
        $this->entityManager->flush();
    }
}