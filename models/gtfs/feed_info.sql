CREATE TABLE feed_info(
	"feed_publisher_name"
		text
		NOT NULL,
	"feed_publisher_url"
		text
		NOT NULL,
		-- SIMILAR TO (url),
	"feed_lang"
		text
		NOT NULL,
	"feed_start_date"
		date,
	"feed_end_date"
		date,
	"feed_version"
		text
);
