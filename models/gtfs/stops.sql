CREATE TABLE stops(
	"stop_id"
		text
		NOT NULL
		PRIMARY KEY,
	"stop_code"
		text,
	"stop_name"
		text
		NOT NULL,
	"stop_desc"
		text,
	"stop_lat"
		real
		NOT NULL
		CHECK (shape_pt_lat >= -90 AND shape_pt_lat <= 90),
	"stop_lon"
		real
		NOT NULL
		CHECK (shape_pt_lon >= -180 AND shape_pt_lon <= 180),
	"zone_id"
		text,
	"stop_url"
		text,
		-- SIMILAR TO (url),
	"location_type"
		integer
		DEFAULT 0
		CHECK (location_type >= 0 AND location_type <= 1),
	"parent_station"
		integer
		CHECK (parent_station >= 0 AND parent_station <= 1),
	"stop_timezone"
		text,
	"wheelchair_boarding"
		integer
		DEFAULT 0
		CHECK (wheelchair_boarding >= 0 AND wheelchair_boarding <= 2)
);
