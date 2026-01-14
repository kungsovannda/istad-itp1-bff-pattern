package co.istad.bffproductservice.features.product.dto;

public record ProductResponse(
        String uuid,
        String name,
        Double price,
        String image,
        String description,
        String category
) {
}
