CREATE TABLE shapes(
	"shape_id"
		text
		NOT NULL
		PRIMARY KEY,
	"shape_pt_lat"
		real
		NOT NULL
		CHECK (shape_pt_lat >= -90 AND shape_pt_lat <= 90),
	"shape_pt_lon"
		real
		NOT NULL
		CHECK (shape_pt_lon >= -180 AND shape_pt_lon <= 180),
	"shape_pt_sequence"
		integer
		NOT NULL
		CHECK (shape_pt_sequence >= 0),
	"shape_dist_traveled"
		real
		CHECK (shape_dist_traveled >= 0)
);
