CREATE TABLE calendar_dates(
	"service_id"
		text
		NOT NULL
		REFERENCES calendar(service_id),
	"date"
		date
		NOT NULL,
	"exception_type"
		integer
		NOT NULL
		CHECK (exception_type >= 1 AND exception_type <= 2)
);
