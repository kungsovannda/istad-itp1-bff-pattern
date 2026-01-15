package co.istad.bfforderservice.features.order.dto;

public record OrderItemRequest(
        String productUuid,
        Double price,
        Integer quantity
) {
}
