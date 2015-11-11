CREATE TABLE frequencies(
	"trip_id"
		text
		NOT NULL
		REFERENCES trips(trip_id),
	"start_time"
		text
		NOT NULL,
		-- (time)
	"end_time"
		text
		NOT NULL,
		-- (time)
	"headway_secs"
		integer
		NOT NULL,
	"exact_times"
		boolean
);
