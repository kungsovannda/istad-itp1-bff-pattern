package co.istad.bffproductservice.features.product;

import co.istad.bffproductservice.features.product.dto.ProductRequest;
import co.istad.bffproductservice.features.product.dto.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse create(ProductRequest request);

    ProductResponse findByUuid(String uuid);

    List<ProductResponse> findAll();

    ProductResponse update(String uuid, ProductRequest request);

    void delete(String uuid);
}
