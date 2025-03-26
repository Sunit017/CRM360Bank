INSERT IGNORE INTO customer (customer_id, first_name, middle_name, last_name, mobile_number, email_address, ekyc_arn_number,
                            client_birth_date, gender, creation_date, branch,home_phone_number, mobile_number_2) VALUES
  ('1000000002', 'Jane', 'B.', 'Smith', '2345678901', 'jane.smith@example.com', '2345678901', '1990-01-15', 'F', '2024-09-09', 'Main Branch', '2345678000', '9876543210'),
  ('1000000003', 'Alice', 'C.', 'Johnson', '3456789012', 'alice.johnson@example.com', '3456789012', '1985-05-22', 'F', '2024-09-09', 'North Branch', '3456788000', '8765432109'),
  ('1000000004', 'Bob', 'D.', 'Brown', '4567890123', 'bob.brown@example.com', '4567890123', '1992-03-10', 'M', '2024-09-09', 'East Branch', '4567898000', '7654321098'),
  ('1000000005', 'Charlie', 'E.', 'Davis', '5678901234', 'charlie.davis@example.com', '5678901234', '1988-07-08', 'M', '2024-09-09', 'West Branch', '5678908000', '6543210987'),
  ('1000000006', 'David', 'F.', 'Wilson', '6789012345', 'david.wilson@example.com', '6789012345', '1995-11-30', 'M', '2024-09-09', 'South Branch', '6789018000', '5432109876'),
  ('1000000007', 'Emma', 'G.', 'Moore', '7890123456', 'emma.moore@example.com', '7890123456', '1993-09-25', 'F', '2024-09-09', 'Main Branch', '7890128000', '4321098765'),
  ('1000000008', 'Frank', 'H.', 'Taylor', '8901234567', 'frank.taylor@example.com', '8901234567', '1987-12-14', 'M', '2024-09-09', 'North Branch', '8901238000', '3210987654'),
  ('1000000009', 'Grace', 'I.', 'Anderson', '9012345678', 'grace.anderson@example.com', '9012345678', '1991-06-20', 'F', '2024-09-09', 'East Branch', '9012348000', '2109876543'),
  ('1000000010', 'Henry', 'J.', 'Thomas', '0123456789', 'henry.thomas@example.com', '0123456789', '1989-04-17', 'M', '2024-09-09', 'West Branch', '0123458000', '1098765432'),
  ('1000000011', 'Maveric', 'Mav', 'Rock', '5012346704', 'maveric.mav@example.com', '3214569860', '1983-08-12', 'M', '2024-09-09', 'South Branch', '5012348000', '1987654321');

  INSERT IGNORE INTO KYCHighRisk (id,customer_id, source_of_wealth, proof_of_sow, customer_linked_company_names, banks_with_customers_account, proof_of_address)
  VALUES
  (1,1000000002, 'Business Income', 'Proof Document 1', 'Company A, Company B', 'Bank A, Bank B', 'Proof Address 1'),
  (2,1000000003, 'Salary', 'Proof Document 2', 'Company C', 'Bank C', 'Proof Address 2'),
  (3,1000000004, 'Investment Income', 'Proof Document 3', 'Company D, Company E', 'Bank D', 'Proof Address 3'),
  (4,1000000005, 'Rental Income', 'Proof Document 4', 'Company F', 'Bank E', 'Proof Address 4'),
  (5,1000000006, 'Business Income', 'Proof Document 5', 'Company G, Company H', 'Bank F, Bank G', 'Proof Address 5'),
  (6,1000000007, 'Freelance Income', 'Proof Document 6', 'Company I', 'Bank H', 'Proof Address 6'),
  (7,1000000008, 'Investment Income', 'Proof Document 7', 'Company J', 'Bank I', 'Proof Address 7'),
  (8,1000000009, 'Business Income', 'Proof Document 8', 'Company K, Company L', 'Bank J', 'Proof Address 8'),
  (9,1000000010, 'Salary', 'Proof Document 9', 'Company M', 'Bank K', 'Proof Address 9'),
  (10,1000000011, 'Business Income', 'Proof Document 10', 'Company N, Company O', 'Bank L', 'Proof Address 10');


  INSERT IGNORE INTO address (address_id, address_type, barangay, city, country, country_code, number_or_street, region, state_or_province, zip_code) VALUES
  (1,'Permanent', 'Example Barangay', 'Bengaluru', 'India', 'IN', '123 Main St', 'South', 'Karnataka', '560001'),
  (2,'Permanent', 'Example Barangay', 'Bengaluru', 'India', 'IN', '123 Main St', 'South', 'Karnataka', '560001'),
  (3,'Employment', 'Example Barangay', 'Bengaluru', 'India', 'IN', '123 Main St', 'South', 'Karnataka', '560001'),
  (4,'Employment', 'Example Barangay', 'Bengaluru', 'India', 'IN', '123 Main St', 'South', 'Karnataka', '560001'),
  (5,'Permanent', 'Example Barangay', 'Bengaluru', 'India', 'IN', '123 Main St', 'South', 'Karnataka', '560001'),
  (6,'Business', 'Example Barangay', 'Bengaluru', 'India', 'IN', '123 Main St', 'South', 'Karnataka', '560001'),
  (7,'Employment', 'Example Barangay', 'Bengaluru', 'India', 'IN', '123 Main St', 'South', 'Karnataka', '560001'),
  (8,'Employment', 'Example Barangay', 'Bengaluru', 'India', 'IN', '123 Main St', 'South', 'Karnataka', '560001'),
  (9,'Permanent', 'Example Barangay', 'Bengaluru', 'India', 'IN', '123 Main St', 'South', 'Karnataka', '560001'),
  (10,'Employment', 'Example Barangay', 'Bengaluru', 'India', 'IN', '123 Main St', 'South', 'Karnataka', '560001'),
  (11,'Business', 'Example Barangay', 'Bengaluru', 'India', 'IN', '123 Main St', 'South', 'Karnataka', '560001'),
  (12,'Business', 'Example Barangay', 'Bengaluru', 'India', 'IN', '123 Main St', 'South', 'Karnataka', '560001'),
  (13,'Business', 'Example Barangay', 'Bengaluru', 'India', 'IN', '123 Main St', 'South', 'Karnataka', '560001');


INSERT IGNORE INTO nominee (nominee_id,address_type,barangay,city,country,country_code,dob,name,number_or_street,region,relationship,state_or_province,
    zip_code,address_id) VALUES
(1,'Home','Barangay 123','CityName','CountryName','CC','1990-01-01','John Doe','123 Street','RegionName','Friend','StateName','12345',1),
(2,'Employment','Barangay 121','London','UK','CC','1990-01-01','Helen','123 Street','RegionName','Spouse','StateName','12345',2);


INSERT IGNORE INTO customer_address_nominee(customer_id,nominee_id,address_id)
 VALUES ('1000000002', '1','1'),
 ('1000000002', '2','2');


INSERT IGNORE INTO business_details ( id, nature_of_business,business_name,business_industry_type,office_phone_number,years_of_operating,months_operating,business_email,customer_id)
VALUES
(1,'Financial Consulting', 'Finance Group LLC', 'Finance', '987-654-3210', 15, 2, 'contact@financegroup.com', 1000000003),
(2,'Retail Store', 'SuperMart', 'Retail', '234-567-8901', 5, 8, 'support@supermart.com', 1000000004);


INSERT IGNORE INTO personaldetails
(id, customer_id, salutation, suffix, civil_status, place_of_birth, nationality, years_in_residence, preferred_mailing_address,
number_of_dependents, job, marketing_consent, date_time_field, nominee_counter, customer_id_type, card_issuance_status,
job_code, data_privacy_agreement, record_edit_by_customer, fatcaw9id_type, term_conditions, client_type,
fatca_certification_status, designation, idm_Arn_number, arn_number,fatcaw9id_number )
VALUES
(1, 1000000002, 'MR', 'JR', 'SINGLE', 'New York', 'USA', 5, '123 Park Ave', 2, 'EMPLOYED', 'YES', '2024-09-16 12:00:00', 3, 'PASSPORT', 'ISSUED', 'EMPLOYED',
 'ACCEPTED', 1, 'DRIVER_LICENSE', 'Agreed', 'INDIVIDUAL', 'Non-US', 'MANAGER', 'ARN123456789', 'ARN987654321', 'DL123456789'),
(2, 1000000003, 'MRS', 'NONE', 'MARRIED', 'London', 'UK', 10, '456 Baker St', 4, 'SELF_EMPLOYED', 'NO', '2024-08-12 09:30:00', 1, 'DRIVER_LICENSE', 'PENDING', 'SELF_EMPLOYED',
 'DECLINED', 0, 'PASSPORT', 'Not Agreed', 'CORPORATE', 'US', 'ENGINEER', 'ARN456789123', 'ARN321654987', 'P123456789'),
(3, 1000000004, 'MS', 'III', 'DIVORCED', 'Berlin', 'Germany', 3, '789 Hauptstrasse', 1, 'UNEMPLOYED', 'YES', '2024-07-20 14:45:00', 0, 'NATIONAL_ID', 'CANCELLED', 'EMPLOYED',
 'ACCEPTED', 1, 'NATIONAL_ID', 'Agreed', 'INDIVIDUAL', 'Non-US', 'EXECUTIVE', 'ARN654321987', 'ARN987123654', 'NI123456789'),
(4, 1000000005, 'MR', 'II', 'SINGLE', 'Paris', 'France', 2, '12 Rue de Paris', 0, 'EMPLOYED', 'NO', '2024-07-05 10:00:00', 2, 'PASSPORT', 'ISSUED', 'EMPLOYED',
 'ACCEPTED', 1, 'DRIVER_LICENSE', 'Agreed', 'INDIVIDUAL', 'Non-US', 'DIRECTOR', 'ARN987123456', 'ARN654987321', 'DL654987321'),
(5, 1000000006, 'DR', 'NONE', 'MARRIED', 'Tokyo', 'Japan', 8, '789 Shibuya', 3, 'SELF_EMPLOYED', 'YES', '2024-05-10 08:30:00', 1, 'PASSPORT', 'ISSUED', 'SELF_EMPLOYED',
 'ACCEPTED', 1, 'NATIONAL_ID', 'Agreed', 'INDIVIDUAL', 'Non-US', 'CEO', 'ARN321654987', 'ARN123789654', 'P987654321'),
(6, 1000000007, 'MR', 'NONE', 'DIVORCED', 'Sydney', 'Australia', 7, '123 Sydney St', 1, 'EMPLOYED', 'YES', '2024-02-22 13:45:00', 0, 'DRIVER_LICENSE', 'CANCELLED', 'EMPLOYED',
 'DECLINED', 0, 'PASSPORT', 'Not Agreed', 'INDIVIDUAL', 'US', 'MANAGER', 'ARN654789123', 'ARN321987654', 'DL654321987'),
(7, 1000000008, 'MRS', 'IV', 'SINGLE', 'Dubai', 'UAE', 9, '12 Emirates Rd', 0, 'EMPLOYED', 'YES', '2024-03-14 11:00:00', 2, 'PASSPORT', 'PENDING', 'EMPLOYED',
 'ACCEPTED', 1, 'NATIONAL_ID', 'Agreed', 'CORPORATE', 'Non-US', 'ENGINEER', 'ARN123456987', 'ARN789456123', 'P123654987'),
(8, 1000000009, 'MR', 'NONE', 'MARRIED', 'Rome', 'Italy', 4, '456 Rome Blvd', 3, 'SELF_EMPLOYED', 'NO', '2024-06-25 15:00:00', 1, 'DRIVER_LICENSE', 'ISSUED', 'SELF_EMPLOYED',
 'DECLINED', 0, 'NATIONAL_ID', 'Not Agreed', 'INDIVIDUAL', 'Non-US', 'DIRECTOR', 'ARN456123789', 'ARN987321456', 'NI654321789'),
(9, 1000000010, 'DR', 'II', 'SINGLE', 'Madrid', 'Spain', 1, '789 Madrid St', 0, 'EMPLOYED', 'YES', '2024-01-05 09:30:00', 2, 'PASSPORT', 'CANCELLED', 'EMPLOYED',
 'ACCEPTED', 1, 'DRIVER_LICENSE', 'Agreed', 'CORPORATE', 'US', 'CEO', 'ARN321654123', 'ARN987654321', 'DL789654321'),
(10, 1000000011, 'MS', 'III', 'DIVORCED', 'Toronto', 'Canada', 6, '123 Toronto St', 2, 'SELF_EMPLOYED', 'NO', '2024-04-12 16:00:00', 1, 'PASSPORT', 'PENDING', 'SELF_EMPLOYED',
 'DECLINED', 0, 'NATIONAL_ID', 'Not Agreed', 'INDIVIDUAL', 'Non-US', 'MANAGER', 'ARN654321789', 'ARN321456987', 'P654987321');

INSERT IGNORE INTO financialdetails
(id, customer_id, monthly_income, annual_income, source_of_funds, car_ownership, home_ownership_permanent, source_of_funds_code)
VALUES
(1, 1000000002, 50000.00, 600000.00, 'Salary', true, true, 'SF001'),
(2, 1000000003, 40000.00, 480000.00, 'Business Income', true, false, 'SF002'),
(3, 1000000004, 70000.00, 840000.00, 'Investments', false, true, 'SF003'),
(4, 1000000005, 30000.00, 360000.00, 'Freelancing', false, false, 'SF004'),
(5, 1000000006, 80000.00, 960000.00, 'Salary', true, true, 'SF001'),
(6, 1000000007, 25000.00, 300000.00, 'Business Income', true, false, 'SF002'),
(7, 1000000008, 60000.00, 720000.00, 'Salary', false, true, 'SF001'),
(8, 1000000009, 90000.00, 1080000.00, 'Investments', true, true, 'SF003'),
(9, 1000000010, 100000.00, 1200000.00, 'Business Income', false, false, 'SF002'),
(10, 1000000011, 45000.00, 540000.00, 'Freelancing', true, true, 'SF004');



