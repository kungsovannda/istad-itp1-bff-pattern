package co.istad.bfforderservice.features.order;

import co.istad.bfforderservice.domain.Order;
import co.istad.bfforderservice.domain.OrderItem;
import co.istad.bfforderservice.enums.OrderStatus;
import co.istad.bfforderservice.features.order.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    public OrderResponse create(String username, OrderRequest request) {

        Order order = Order.builder()
                .uuid(UUID.randomUUID().toString())
                .orderDate(Instant.now())
                .username(username)
                .status(OrderStatus.CREATED)
                .build();

        List<OrderItem> items = request.items().stream()
                .map(item -> OrderItem.builder()
                        .productUuid(item.productUuid())
                        .price(item.price())
                        .quantity(item.quantity())
                        .order(order)
                        .build())
                .toList();

        order.setOrderItems(items);

        orderRepository.save(order);
        return toResponse(order);
    }

    @Override
    public OrderResponse findByUuid(String uuid) {
        Order order = orderRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return toResponse(order);
    }

    @Override
    public List<OrderResponse> findMyOrders(String username) {
        return orderRepository.findAllByUsername(username)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public OrderResponse updateStatus(String uuid, UpdateOrderStatusRequest request) {

        Order order = orderRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(request.status());
        orderRepository.save(order);

        return toResponse(order);
    }

    @Override
    public void delete(String uuid) {
        Order order = orderRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        orderRepository.delete(order);
    }

    private OrderResponse toResponse(Order order) {
        return new OrderResponse(
                order.getUuid(),
                order.getOrderDate(),
                order.getUsername(),
                order.getStatus(),
                order.getOrderItems().stream()
                        .map(item -> new OrderItemResponse(
                                item.getId(),
                                item.getProductUuid(),
                                item.getPrice(),
                                item.getQuantity()
                        ))
                        .toList()
        );
    }
}
