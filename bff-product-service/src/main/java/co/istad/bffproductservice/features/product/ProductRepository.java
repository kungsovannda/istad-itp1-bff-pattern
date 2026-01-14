package co.istad.bffproductservice.features.product;

import co.istad.bffproductservice.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByUuid(String uuid);

    boolean existsByUuid(String uuid);
}
