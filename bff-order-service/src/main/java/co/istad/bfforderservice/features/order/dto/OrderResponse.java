package co.istad.bfforderservice.features.order.dto;

import co.istad.bfforderservice.enums.OrderStatus;

import java.time.Instant;
import java.util.List;

public record OrderResponse(
        String uuid,
        Instant orderDate,
        String username,
        OrderStatus status,
        List<OrderItemResponse> items
) {
}
