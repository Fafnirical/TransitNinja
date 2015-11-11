CREATE TABLE trips(
	"route_id"
		text
		NOT NULL
		REFERENCES routes(route_id),
	"service_id"
		text
		NOT NULL
		REFERENCES calendar(service_id),
	"trip_id"
		integer
		NOT NULL
		PRIMARY KEY,
	"trip_headsign"
		text,
	"trip_short_name"
		text,
	"direction_id"
		integer
		CHECK (direction_id >= 0 AND direction_id <= 1),
	"block_id"
		text,
	"shape_id"
		text
		REFERENCES shapes(shape_id),
	"wheelchair_accessible"
		integer
		DEFAULT 0
		CHECK (wheelchair_accessible >= 0 AND wheelchair_accessible <= 2),
	"bikes_allowed"
		integer
		DEFAULT 0
		CHECK (bikes_allowed >= 0 AND bikes_allowed <= 2)
);
