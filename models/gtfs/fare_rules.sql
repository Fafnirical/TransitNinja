CREATE TABLE fare_rules(
	"fare_id"
		text
		NOT NULL
		REFERENCES fare_attributes(fare_id),
	"route_id"
		text
		REFERENCES routes(route_id),
	"origin_id"
		text
		REFERENCES stops(zone_id),
	"destination_id"
		text
		REFERENCES stops(zone_id),
	"contains_id"
		text
		REFERENCES stops(zone_id)
);
