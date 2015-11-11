CREATE TABLE stop_times(
	"trip_id"
		text
		NOT NULL
		REFERENCES trips(trip_id),
	"arrival_time"
		text
		NOT NULL,
		-- (time)
	"departure_time"
		text
		NOT NULL,
		-- (time)
	"stop_id"
		text
		NOT NULL
		REFERENCES stops(stop_id),
	"stop_sequence"
		integer
		NOT NULL
		CHECK (stop_sequence >= 0),
	"stop_headsign"
		text,
	"pickup_type"
		integer
		DEFAULT 0
		CHECK (pickup_type >= 0 AND pickup_type <= 3),
	"drop_off_type"
		integer
		DEFAULT 0
		CHECK (drop_off_type >= 0 AND drop_off_type <= 3),
	"shape_dist_traveled"
		real,
	"timepoint"
		boolean
		DEFAULT 1
);
