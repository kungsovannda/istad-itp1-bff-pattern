package co.istad.bfforderservice.features.order.dto;

import co.istad.bfforderservice.enums.OrderStatus;

public record UpdateOrderStatusRequest(
        OrderStatus status
) {
}
