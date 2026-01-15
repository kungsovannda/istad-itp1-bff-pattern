package co.istad.bfforderservice.features.order.dto;

public record OrderItemResponse(
        Long id,
        String productUuid,
        Double price,
        Integer quantity
) {
}
