package co.istad.bfforderservice.features.order.dto;

import java.util.List;

public record OrderRequest(
        List<OrderItemRequest> items
) {
}
