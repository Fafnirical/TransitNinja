CREATE TABLE fare_attributes(
	"fare_id"
		text
		NOT NULL
		PRIMARY KEY,
	"price"
		money
		NOT NULL,
	"currency_type"
		varchar(3)
		NOT NULL,
	"payment_method"
		integer
		NOT NULL,
	"transfers"
		integer
		NOT NULL,
	"transfer_duration"
		integer
);
