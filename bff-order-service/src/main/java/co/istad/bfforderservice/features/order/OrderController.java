package co.istad.bfforderservice.features.order;

import co.istad.bfforderservice.features.order.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public OrderResponse create(@RequestHeader(name = "User") String user,@RequestBody OrderRequest request) {
        return orderService.create(user, request);
    }

    @GetMapping
    public List<OrderResponse> myOrders(@RequestHeader(name = "User") String user) {
        return orderService.findMyOrders(user);
    }

    @GetMapping("/{uuid}")
    public OrderResponse findByUuid(@PathVariable String uuid) {
        return orderService.findByUuid(uuid);
    }

    @PatchMapping("/{uuid}/status")
    public OrderResponse updateStatus(
            @PathVariable String uuid,
            @RequestBody UpdateOrderStatusRequest request
    ) {
        return orderService.updateStatus(uuid, request);
    }

    @DeleteMapping("/{uuid}")
    public void delete(@PathVariable String uuid) {
        orderService.delete(uuid);
    }
}
