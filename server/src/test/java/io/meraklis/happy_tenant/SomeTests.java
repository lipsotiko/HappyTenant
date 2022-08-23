package io.meraklis.happy_tenant;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigDecimal;
import java.math.RoundingMode;
import org.junit.jupiter.api.Test;

public class SomeTests {

    @Test
    public void test_double() {
        int unitAmountInCents = (int) Math.ceil(1234.56 * 100);
        assertEquals(123456, unitAmountInCents);
    }

    @Test
    public void test_prorated_rent() {
        var rent = 1234.56;
        var annualRent = rent * 12;
        double dailyRent = annualRent / 365d;
        BigDecimal bigDecimal = BigDecimal.valueOf(dailyRent * 2);
        double proratedFirstMonthsRent = bigDecimal.setScale(2, RoundingMode.HALF_UP).doubleValue();
        assertEquals(81.18, proratedFirstMonthsRent);
    }

    @Test
    public void fileFilter() {
        String path = "/properties/create/123345";
        int i = path.lastIndexOf("/");
        String id = path.substring(i + 1);
        String replace = path.replace(id, "[id].html");
        System.out.println(replace);
    }

}
