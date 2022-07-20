package io.meraklis.happy_tenant;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class SomeTests {

    @Test
    public void test_double() {
        int unitAmountInCents = (int) Math.ceil(1234.56 * 100);
        assertEquals(123456, unitAmountInCents);
    }

}
