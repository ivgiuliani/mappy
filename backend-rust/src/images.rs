use exif::{Tag, Value};

#[derive(Debug)]
pub struct Location {
    lat: f64,
    lat_ref: char,
    lon: f64,
    lon_ref: char,
    precision: f64,
}

impl Location {
    pub fn to_string(&self) -> String {
        return format!(
            "lat:{}{} lon:{}{} (prec:{})",
            self.lat, self.lat_ref, self.lon, self.lon_ref, self.precision
        );
    }
}

/// Prints on stdout all the exif tags for the given image
#[allow(dead_code)]
pub fn print_all_exif(path: &str) {
    let file = std::fs::File::open(path).unwrap();
    let reader = exif::Reader::new(&mut std::io::BufReader::new(&file)).unwrap();

    for f in reader.fields() {
        println!("tag: '{}' => '{}'", f.tag, f.value.display_as(f.tag))
    }
}

fn exif_lat_lon_ref(v: &exif::Value) -> char {
    match *v {
        Value::Ascii(ref v)
            if (v.len() == 1 && v[0].len() == 1 && ((v[0][0] as char).is_uppercase())) =>
        {
            v[0][0] as char
        }
        _ => panic!("Not a valid latitude/longitude reference"),
    }
}

fn exif_lat_lon_to_decimal_degrees(value: &exif::Value, direction_reference: char) -> f64 {
    // EXIF stores GPS coords as rational64u which is a list of six unsigned
    // whole numbers in the following order:
    //
    // [
    //     degreesNumerator, degreesDenominator,
    //     minutesNumerator, minutesDenominator,
    //     secondsNumerator, secondsDenominator
    // ]
    //
    // (Value::Rational will automatically extract the numerator and the
    // denominator into a single value)
    //
    // To convert to degrees we must first convert the individual items
    // (degrees, minutes and seconds) to their rational representation.
    match *value {
        Value::Rational(ref v) if v.len() >= 3 => {
            let gps_degree = v[0].to_f64();
            let gps_minutes = v[1].to_f64();
            let gps_seconds = v[2].to_f64();

            // Then we can convert the rational value to the corresponding decimal by
            // doing the equivalent of Degrees + Minutes/60 + Seconds/3600:
            let degrees = gps_degree + (gps_minutes / 60.0) + (gps_seconds / 3600.0);

            return match direction_reference {
                'N' => degrees,
                'E' => degrees,
                'W' => -degrees,
                'S' => -degrees,
                _ => panic!(),
            };
        }
        _ => panic!("Not a valid latitude/longitude value"),
    }
}

fn has_tags(reader: &exif::Reader, tags: Vec<exif::Tag>) -> bool {
    tags.iter()
        .all(|tag| reader.get_field(*tag, false).is_some())
}

fn extr_gps_exif_by_tag(
    tag: exif::Tag,
    ref_tag: exif::Tag,
    reader: &exif::Reader,
) -> Option<(f64, char)> {
    match reader.get_field(ref_tag, false) {
        None => return None,
        Some(field) => {
            let ref_value = exif_lat_lon_ref(&field.value);

            let ll_field: &exif::Field = reader
                .get_field(tag, false)
                .expect("missing latitude/longitude");
            let ll_value = exif_lat_lon_to_decimal_degrees(&ll_field.value, ref_value);

            return Some((ll_value, ref_value));
        }
    };
}

fn extr_gps_dop_exif(reader: &exif::Reader) -> Option<f64> {
    let dop_field = reader.get_field(Tag::GPSDOP, false).unwrap();

    match dop_field.value {
        Value::Rational(ref v) if v.len() == 1 => Some(v[0].to_f64()),
        _ => None,
    }
}

pub fn extract_gps_exif(path: &str) -> Option<Location> {
    let file = std::fs::File::open(path).unwrap();
    let reader = exif::Reader::new(&mut std::io::BufReader::new(&file)).unwrap();

    if !has_tags(
        &reader,
        vec![
            Tag::GPSLatitude,
            Tag::GPSLatitudeRef,
            Tag::GPSLongitude,
            Tag::GPSLongitudeRef,
        ],
    ) {
        return None;
    }

    let lat = extr_gps_exif_by_tag(Tag::GPSLatitude, Tag::GPSLatitudeRef, &reader).unwrap();
    let lon = extr_gps_exif_by_tag(Tag::GPSLongitude, Tag::GPSLongitudeRef, &reader).unwrap();

    let precision = extr_gps_dop_exif(&reader).unwrap_or(0.0);

    return Some(Location {
        lat: lat.0,
        lat_ref: lat.1,
        lon: lon.0,
        lon_ref: lon.1,
        precision: precision,
    });
}
