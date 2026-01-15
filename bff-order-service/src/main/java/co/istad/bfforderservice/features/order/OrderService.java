package co.istad.bfforderservice.features.order;

import co.istad.bfforderservice.features.order.dto.*;

import java.util.List;

public interface OrderService {

    OrderResponse create(String username, OrderRequest request);

    OrderResponse findByUuid(String uuid);

    List<OrderResponse> findMyOrders(String username);

    OrderResponse updateStatus(String uuid, UpdateOrderStatusRequest request);

    void delete(String uuid);
}
