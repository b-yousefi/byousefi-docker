package b_yousefi.bookshop.data;

import b_yousefi.bookshop.models.Author;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by: b.yousefi
 * Date: 5/10/2020
 */
public interface AuthorRepository extends CrudRepository<Author, Long> {
}
