INSERT IGNORE INTO account (account_number,account_holder_name, account_type, account_state, account_opening_date, account_close_date, current_balance, available_balance, accrued_interest, customer_id)
VALUES
('ACC1001','James k brown', 'Savings', 'Active', '2024-01-15', NULL, 1500.75, 1500.75, 25.50, '1000000002'),
('ACC1002', 'Richel Saxena','Checking', 'Active', '2024-02-20', NULL, 3200.00, 3200.00, 30.00, '1000000003'),
('ACC1003','Richel Saxena', 'Savings', 'Closed', '2023-06-10', '2024-01-10', 0.00, 0.00, 0.00, '1000000006'),
('ACC1004', 'Polls Adam','Business', 'Active', '2024-03-05', NULL, 7500.25, 7500.25, 50.00, '1000000004'),
('ACC1005','Eve Da Thui', 'Checking', 'Active', '2024-04-01', NULL, 2100.50, 2100.50, 15.00, '1000000007'),
('ACC1006', 'Vinod Kumar','Savings', 'Active', '2024-05-15', NULL, 980.00, 980.00, 12.75, '1000000002'),
('ACC1007', 'Rahul Abhishek','Business', 'Active', '2024-06-10', NULL, 5000.00, 5000.00, 40.00, '1000000004'),
('ACC1008', 'Rudra Pratap SIngh','Checking', 'Inactive', '2023-12-01', NULL, 150.00, 150.00, 5.00, '1000000005'),
('ACC1009', 'Brigade','Savings', 'Active', '2024-07-22', NULL, 2200.00, 2200.00, 22.00, '1000000004'),
('ACC1010', 'Maveric Poll','Business', 'Closed', '2023-11-15', '2024-03-15', 300.00, 300.00, 10.00, '1000000003');
