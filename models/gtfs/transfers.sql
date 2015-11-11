CREATE TABLE transfers(
	"from_stop_id"
		text
		NOT NULL
		REFERENCES stops(stop_id),
	"to_stop_id"
		text
		NOT NULL
		REFERENCES stops(stop_id),
	"transfer_type"
		integer
		NOT NULL
		DEFAULT 0
		CHECK (transfer_type >= 0 AND transfer_type <= 3),
	"min_transfer_time"
		integer
		CHECK (min_transfer_time >= 0)
);
