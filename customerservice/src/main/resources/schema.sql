CREATE TABLE IF NOT EXISTS `customer` (
  `customer_id` bigint NOT NULL,
  `ekyc_arn_number` varchar(255) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `client_birth_date` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `home_phone_number` varchar(255) DEFAULT NULL,
  `mobile_number_2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
);
CREATE TABLE IF NOT EXISTS KYCHighRisk (
    id BIGINT  NOT NULL,
    customer_id BIGINT NOT NULL UNIQUE,
    source_of_wealth VARCHAR(255),
    proof_of_sow VARCHAR(255),
    customer_linked_company_names VARCHAR(255),
    banks_with_customers_account VARCHAR(255),
    proof_of_address VARCHAR(255),
    PRIMARY KEY(id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);
