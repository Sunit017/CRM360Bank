package wrapper;

import com.crm.customerservice.dto.CustomerDTO;
import lombok.Data;

import java.util.List;
@Data
public class CustomerDtoWrapper {

    private List<CustomerDTO> customerList;
}
