package co.istad.bffproductservice.init;

import co.istad.bffproductservice.domain.Product;
import co.istad.bffproductservice.enums.Category;
import co.istad.bffproductservice.features.product.ProductRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class InitProduct {

    private final ProductRepository productRepository;

    @PostConstruct
    public void init() {

        if (productRepository.count() > 0) {
            return;
        }

        List<Product> products = List.of(
                Product.builder()
                        .uuid(UUID.randomUUID().toString())
                        .name("iPhone 15 Pro")
                        .price(1199.0)
                        .image("https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop")
                        .description("Apple iPhone 15 Pro with A17 chip")
                        .category(Category.SMARTPHONES)
                        .build(),

                Product.builder()
                        .uuid(UUID.randomUUID().toString())
                        .name("Samsung Galaxy S24")
                        .price(999.0)
                        .image("https://images.unsplash.com/photo-1706111054700-0e1363628317?q=80&w=1000&auto=format&fit=crop")
                        .description("Samsung flagship Android smartphone")
                        .category(Category.SMARTPHONES)
                        .build(),

                Product.builder()
                        .uuid(UUID.randomUUID().toString())
                        .name("MacBook Pro 14-inch")
                        .price(1999.0)
                        .image("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop")
                        .description("Apple MacBook Pro with M-series chip")
                        .category(Category.LAPTOPS)
                        .build(),

                Product.builder()
                        .uuid(UUID.randomUUID().toString())
                        .name("Modern Sofa")
                        .price(650.0)
                        .image("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop")
                        .description("Comfortable modern living room sofa")
                        .category(Category.FURNITURE)
                        .build(),

                Product.builder()
                        .uuid(UUID.randomUUID().toString())
                        .name("Wooden Dining Table")
                        .price(820.0)
                        .image("https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1000&auto=format&fit=crop")
                        .description("Solid wood dining table")
                        .category(Category.FURNITURE)
                        .build(),

                Product.builder()
                        .uuid(UUID.randomUUID().toString())
                        .name("Nike Running Shoes")
                        .price(120.0)
                        .image("https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop")
                        .description("Lightweight running shoes")
                        .category(Category.MENS_SHOES)
                        .build(),

                Product.builder()
                        .uuid(UUID.randomUUID().toString())
                        .name("Men Casual Shirt")
                        .price(45.0)
                        .image("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop")
                        .description("Cotton casual shirt for men")
                        .category(Category.MENS_SHIRTS)
                        .build(),

                Product.builder()
                        .uuid(UUID.randomUUID().toString())
                        .name("Women Handbag")
                        .price(180.0)
                        .image("https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop")
                        .description("Stylish leather handbag")
                        .category(Category.WOMENS_BAGS)
                        .build(),

                Product.builder()
                        .uuid(UUID.randomUUID().toString())
                        .name("Luxury Watch")
                        .price(450.0)
                        .image("https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop")
                        .description("Elegant wrist watch")
                        .category(Category.MENS_WATCHES)
                        .build(),

                Product.builder()
                        .uuid(UUID.randomUUID().toString())
                        .name("Skin Care Set")
                        .price(75.0)
                        .image("https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop")
                        .description("Daily skincare essentials")
                        .category(Category.SKIN_CARE)
                        .build()
        );

        productRepository.saveAll(products);
    }
}