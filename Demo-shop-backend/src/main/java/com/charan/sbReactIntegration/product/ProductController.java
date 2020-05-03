package com.charan.sbReactIntegration.product;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class ProductController {

	@Autowired
	private ProductService productService;

	@GetMapping("/demoshop/products")
	public List<Product> getAllProducts() {
		return productService.findAll();
	}

	@GetMapping("/demoshop/products/{id}")
	public Product getProduct(@PathVariable long id) {
		return productService.findById(id);
	}

	@DeleteMapping("/demoshop/products/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable long id) {

		Product product = productService.deleteById(id);

		if (product != null) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}

	@PutMapping("/demoshop/products/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable long id, @RequestBody Product product) {

		Product productUpdated = productService.save(product);

		return new ResponseEntity<>(product, HttpStatus.OK);
	}

	@PostMapping("/demoshop/products")
	public ResponseEntity<Void> createProduct(@RequestBody Product product) {

		Product createdProduct = productService.save(product);

		// Location
		// Get current resource url
		/// {id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdProduct.getId())
				.toUri();

		return ResponseEntity.created(uri).build();
	}
}
