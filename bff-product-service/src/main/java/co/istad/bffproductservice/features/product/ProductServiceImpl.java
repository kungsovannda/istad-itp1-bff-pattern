package co.istad.bffproductservice.features.product;

import co.istad.bffproductservice.domain.Product;
import co.istad.bffproductservice.features.product.dto.ProductRequest;
import co.istad.bffproductservice.features.product.dto.ProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public ProductResponse create(ProductRequest request) {

        Product product = Product.builder()
                .uuid(UUID.randomUUID().toString())
                .name(request.name())
                .price(request.price())
                .image(request.image())
                .description(request.description())
                .category(request.category())
                .build();

        productRepository.save(product);
        return toResponse(product);
    }

    @Override
    public ProductResponse findByUuid(String uuid) {
        Product product = productRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return toResponse(product);
    }

    @Override
    public List<ProductResponse> findAll() {
        return productRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public ProductResponse update(String uuid, ProductRequest request) {

        Product product = productRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(request.name());
        product.setPrice(request.price());
        product.setImage(request.image());
        product.setDescription(request.description());
        product.setCategory(request.category());

        productRepository.save(product);
        return toResponse(product);
    }

    @Override
    public void delete(String uuid) {
        Product product = productRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        productRepository.delete(product);
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getUuid(),
                product.getName(),
                product.getPrice(),
                product.getImage(),
                product.getDescription(),
                product.getCategory().getValue()
        );
    }
}
