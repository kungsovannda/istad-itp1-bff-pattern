package co.istad.bffproductservice.domain;

import co.istad.bffproductservice.enums.Category;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String uuid;

    private String name;

    private Double price;

    private String image;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;
}
