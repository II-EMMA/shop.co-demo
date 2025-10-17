"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { ProductCards } from "@/mocks/Products";

const FilterLocalContext = createContext();

export function FilterLocalProvider({ children }) {
  const [filters, setFilters] = useState({
    styles: [],
    styleTags: [],
    colors: [],
    sizes: [],
    price: { min: null, max: null },
  });

  const [filteredProducts, setFilteredProducts] = useState(ProductCards);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const applyFilters = useCallback(() => {
    const { styles, styleTags, colors, sizes, price } = filters;

    const noFiltersSelected =
      styles.length === 0 &&
      styleTags.length === 0 &&
      colors.length === 0 &&
      sizes.length === 0 &&
      !price.min &&
      !price.max;

    if (noFiltersSelected) {
      setFilteredProducts(ProductCards);
      return;
    }

    let results = [...ProductCards];

    // Normalize title for keyword matching
    const normalizeText = (text) =>
      text
        .toLowerCase()
        .replace(/s\b/, "")
        .replace(/[^a-z0-9]/gi, "");

    // Filter by styles
    if (styles.length > 0) {
      results = results.filter((product) => {
        const title = normalizeText(product.title);
        return styles.some((style) => title.includes(normalizeText(style)));
      });
    }

    // Filter by styleTags
    if (styleTags.length > 0) {
      results = results.filter((product) => {
        const title = normalizeText(product.title);
        return styleTags.some((tag) => title.includes(normalizeText(tag)));
      });
    }

    // Filter by price (supports discountPrice fallback)
    if (price.min !== null && price.max !== null) {
      results = results.filter((product) => {
        const rawPrice =
          product.discountPrice?.replace("$", "") ??
          product.price?.replace("$", "") ??
          "0";
        const numericPrice = parseFloat(rawPrice);
        return numericPrice >= price.min && numericPrice <= price.max;
      });
    }

    // Filter by colors
    if (colors.length > 0) {
      results = results.filter((product) =>
        product.colors?.some((c) => colors.includes(c))
      );
    }

    // Filter by sizes
    if (sizes.length > 0) {
      results = results.filter((product) =>
        product.sizes?.some((s) => sizes.includes(s))
      );
    }

    setFilteredProducts(results);
  }, [filters]);

  return (
    <FilterLocalContext.Provider
      value={{ filters, updateFilter, applyFilters, filteredProducts }}
    >
      {children}
    </FilterLocalContext.Provider>
  );
}

export function useFilterLocalContext() {
  return useContext(FilterLocalContext);
}
