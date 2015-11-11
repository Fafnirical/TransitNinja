CREATE TABLE agency(
	"agency_id"
		text
		PRIMARY KEY,
	"agency_name"
		text
		NOT NULL,
	"agency_url"
		text
		NOT NULL,
		-- SIMILAR TO (url),
	"agency_timezone"
		text
		NOT NULL,
	"agency_lang"
		varchar(2),
	"agency_phone"
		text,
		-- SIMILAR TO (phone),
	"agency_fare_url"
		text
		-- SIMILAR TO (url)
);
