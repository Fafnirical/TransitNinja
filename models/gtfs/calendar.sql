CREATE TABLE calendar(
	"service_id"
		text
		NOT NULL
		PRIMARY KEY,
	"monday"
		boolean
		NOT NULL,
	"tuesday"
		boolean
		NOT NULL,
	"wednesday"
		boolean
		NOT NULL,
	"thursday"
		boolean
		NOT NULL,
	"friday"
		boolean
		NOT NULL,
	"saturday"
		boolean
		NOT NULL,
	"sunday"
		boolean
		NOT NULL,
	"start_date"
		date
		NOT NULL,
	"end_date"
		date
		NOT NULL
);
