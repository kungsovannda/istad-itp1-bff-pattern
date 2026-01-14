package co.istad.bffproductservice.features.product.dto;

import co.istad.bffproductservice.enums.Category;

public record ProductRequest(
        String name,
        Double price,
        String image,
        String description,
        Category category
) {
}
