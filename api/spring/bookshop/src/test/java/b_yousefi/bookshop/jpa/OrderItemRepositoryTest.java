package b_yousefi.bookshop.jpa;

import b_yousefi.bookshop.models.OrderItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by: b.yousefi
 * Date: 5/14/2020
 */
public class OrderItemRepositoryTest extends DataTest {

    private OrderItem orderItem;

    @BeforeEach
    public void setUp() {
        orderItem = createOrderItem();
    }

    @Test
    void findAllByOrder_Id() {
        assertThat(getOrderItemRepository().findAllByOrder_Id(orderItem.getOrder().getId())).hasSize(1);
    }

    @Test
    void countByBook_Id() {
        assertThat(getOrderItemRepository().countByBook_Id(orderItem.getBook().getId())).isEqualTo(1);
    }

    @Test
    void countByOrder_Id() {
        assertThat(getOrderItemRepository().countByOrder_Id(orderItem.getOrder().getId())).isEqualTo(1);
    }
}