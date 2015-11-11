CREATE TABLE routes(
	"route_id"
		text
		NOT NULL
		PRIMARY KEY,
	"agency_id"
		text
		REFERENCES agency(agency_id),
	"route_short_name"
		text
		NOT NULL,
	"route_long_name"
		text
		NOT NULL,
	"route_desc"
		text,
	"route_type"
		integer
		NOT NULL
		CHECK (route_type >= 0)
		CHECK (route_type <= 7),
	"route_url"
		text,
		-- SIMILAR TO (url),
	"route_color"
		text
		DEFAULT "#ffffff",
		-- SIMILAR TO (colorhex),
	"route_text_color"
		text
		DEFAULT "#000000"
		-- SIMILAR TO (colorhex)
);
