package b_yousefi.bookshop.jpa;

import b_yousefi.bookshop.models.Order;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by: b.yousefi
 * Date: 5/14/2020
 */
public class OrderRepositoryTest extends DataTest {

    private Order order;

    @BeforeEach
    public void setUp() {
        order = createOrder();
    }

    @Test
    public void findAllByUser_username() {
        Pageable sortedByPlacedAt =
                PageRequest.of(0, 3, Sort.by("placedAt"));
        assertThat(getOrderRepository().findAllByUser_username(order.getUser().getUsername(), sortedByPlacedAt)).hasSize(1);
    }

    @Test
    public void findAllByUser_UsernameAndPlacedAt() {
        Pageable sortedByUser =
                PageRequest.of(0, 3, Sort.by("user_Id"));
        assertThat(getOrderRepository().findAllByUser_UsernameAndPlacedAt(order.getUser().getUsername(), order.getPlacedAt(), sortedByUser)).hasSize(1);
    }

    @Test
    void countByUser_Id() {
        assertThat(getOrderRepository().countByUser_Username(order.getUser().getUsername())).isEqualTo(1);
    }

}