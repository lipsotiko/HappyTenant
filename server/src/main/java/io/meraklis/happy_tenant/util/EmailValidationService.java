package io.meraklis.happy_tenant.util;

import java.net.IDN;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.validator.routines.DomainValidator;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.stereotype.Service;


@Service
public class EmailValidationService {

    private static final Map<String, String> typoDomains;

    static {
        HashMap<String, String> m = new HashMap<>() {{
            // gmail.com
            put("35gmai.com", "gmail.com");
            put("636gmail.com", "gmail.com");
            put("gamil.com", "gmail.com");
            put("gmail.comu", "gmail.com");
            put("gmial.com", "gmail.com");
            put("gmil.com", "gmail.com");
            put("yahoogmail.com", "gmail.com");
            // outlook.com
            put("putlook.com", "outlook.com");
        }};

        typoDomains = Collections.unmodifiableMap(m);
    }

    public String cleanAddress(String address) {
        String domain = null;
        if (!EmailValidator.getInstance().isValid(address)) {
            throw new IllegalArgumentException("The email address " + address + " is not valid.");
        }

        int domainIndex = address.lastIndexOf('@') + 1;
        if (domainIndex > 0 && domainIndex < address.length()) {
            domain = address.substring(domainIndex);
        }

        if (!DomainValidator.getInstance().isValid(domain)) {
            throw new IllegalArgumentException("The email domain " + domain + " is not valid.");
        }

        address = address.trim().toLowerCase();
        String localPart = address.substring(0, domainIndex - 1);
        domain = cleanDomain(domain);

        int stopChar;
        if (domain.equals("yahoo.com")) {
            stopChar = '-';
        } else {
            stopChar = '+';
        }

        int stopCharIndex = localPart.indexOf(stopChar);
        if (stopCharIndex > 0) {
            localPart = localPart.substring(0, stopCharIndex);
        }

        if (domain.equals("gmail.com")) {
            localPart = localPart.replaceAll("\\.", "");
        }

        return localPart + "@" + domain;
    }

    private String cleanDomain(String domain) {
        if (domain == null) {
            return null;
        }

        domain = domain.trim();

        if (domain.endsWith(".")) {
            domain = domain.substring(0, domain.length() - 1);
        }

        domain = IDN.toASCII(domain);

        if (typoDomains.containsKey(domain)) {
            domain = typoDomains.get(domain);
        }

        return domain;
    }

}
