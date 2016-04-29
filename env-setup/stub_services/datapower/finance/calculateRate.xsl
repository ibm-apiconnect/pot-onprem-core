<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:dp="http://www.datapower.com/extensions"
                xmlns:dpconfig="http://www.datapower.com/param/config"
                xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                xmlns:ser="http://services.think.ibm"
                xmlns:math="http://exslt.org/math"
                exclude-result-prefixes="dp dpconfig math"
                extension-element-prefixes="dp"
                version="1.0">

    <xsl:output method="xml" indent="yes" omit-xml-declaration="yes" />

    <xsl:template match="/">

        <!-- get the input variables -->
        <xsl:variable name="amount" select="./soapenv:Envelope/soapenv:Body/ser:financingRequest/ser:amount" />
        <xsl:variable name="duration" select="./soapenv:Envelope/soapenv:Body/ser:financingRequest/ser:duration" />
        <xsl:variable name="rate" select="./soapenv:Envelope/soapenv:Body/ser:financingRequest/ser:rate" />

        <!-- calculate payment -->
        <xsl:variable name="P" select="$amount"/>
        <xsl:variable name="N" select="$duration"/>
        <xsl:variable name="J" select="($rate div 100) div 12"/>
        <xsl:variable name="K" select="1 div (math:power(1 + $J, $N))"/>
        <xsl:variable name="quote" select="$P * ($J div (1 - $K))"/>
        <xsl:variable name="paymentAmount" select="round($quote * 100) div 100"/>

        <!-- set response headers -->
        <dp:set-http-request-header name="'content-type'" value="'application/xml'" />
        <dp:set-http-response-header name="'content-type'" value="'application/xml'" />
        <dp:set-http-request-header name="'accept'" value="'application/xml'" />
        <dp:set-http-response-header name="'accept'" value="'application/xml'" />

        <!-- format response -->
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                          xmlns:ser="http://services.think.ibm">
            <soapenv:Body>
                <ser:financingResult>
                    <ser:paymentAmount>
                        <xsl:value-of select="$paymentAmount"/>
                    </ser:paymentAmount>
                </ser:financingResult>
            </soapenv:Body>
        </soapenv:Envelope>

    </xsl:template>

</xsl:stylesheet>