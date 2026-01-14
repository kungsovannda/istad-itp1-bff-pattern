package co.istad.bffproductservice.features.product;

import co.istad.bffproductservice.features.product.dto.ProductRequest;
import co.istad.bffproductservice.features.product.dto.ProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ProductResponse create(@RequestBody ProductRequest request) {
        return productService.create(request);
    }

    @GetMapping("/{uuid}")
    public ProductResponse findByUuid(@PathVariable String uuid) {
        return productService.findByUuid(uuid);
    }

    @GetMapping
    public List<ProductResponse> findAll() {
        return productService.findAll();
    }

    @PutMapping("/{uuid}")
    public ProductResponse update(
            @PathVariable String uuid,
            @RequestBody ProductRequest request
    ) {
        return productService.update(uuid, request);
    }

    @DeleteMapping("/{uuid}")
    public void delete(@PathVariable String uuid) {
        productService.delete(uuid);
    }
}
