use exif::{Tag, Value};

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

pub fn extract_gps_exif(path: &str) {
    let file = std::fs::File::open(path).unwrap();
    let reader = exif::Reader::new(&mut std::io::BufReader::new(&file)).unwrap();

    for f in reader.fields() {
        match f.tag {
            Tag::GPSVersionID => {
                println!("version={}", f.value.display_as(f.tag));
            }
            Tag::GPSLongitude => {
                let lon_ref_field: &exif::Field = reader
                    .get_field(Tag::GPSLongitudeRef, false)
                    .expect("missing longitude reference");
                let lon_ref = exif_lat_lon_ref(&lon_ref_field.value);

                println!(
                    "lon={} {}",
                    exif_lat_lon_to_decimal_degrees(&f.value, lon_ref),
                    lon_ref
                );
            }
            Tag::GPSLatitude => {
                let lat_ref_field: &exif::Field = reader
                    .get_field(Tag::GPSLatitudeRef, false)
                    .expect("missing latitude reference");
                let lat_ref = exif_lat_lon_ref(&lat_ref_field.value);

                println!(
                    "lat={} {}",
                    exif_lat_lon_to_decimal_degrees(&f.value, lat_ref),
                    lat_ref
                );
            }
            _ => {}
        }
    }
}
