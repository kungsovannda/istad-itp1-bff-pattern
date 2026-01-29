package co.istad.bfforderservice.features.order;

import co.istad.bfforderservice.features.order.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public OrderResponse create(@AuthenticationPrincipal Jwt jwt, @RequestBody OrderRequest request) {
        log.info("OIDC USER: {}", jwt);
        log.info("REQUEST: {}", request);
        return orderService.create(jwt.getSubject(), request);
    }

    @GetMapping
    public List<OrderResponse> myOrders(@AuthenticationPrincipal Jwt jwt) {
        return orderService.findMyOrders(jwt.getSubject());
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
