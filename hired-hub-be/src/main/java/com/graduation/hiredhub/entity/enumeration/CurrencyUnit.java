package com.graduation.hiredhub.entity.enumeration;

import lombok.Getter;

@Getter
public enum CurrencyUnit {
    VND("VNĐ"), USD("USD");

    private final String symbol;

    CurrencyUnit(String symbol) {
        this.symbol = symbol;
    }
}
