use std::env;

mod images;

fn help(sysname: &str) {
    println!("{} filename .. filename", sysname);
    println!("  returns the exif data for the given filename");
}

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() <= 1 {
        help(&args[0]);
        return;
    }

    for i in 1..args.len() {
        let path = &args[i];
        let coords = images::extract_gps_exif(path).unwrap();
        println!("{} {}", path, coords.to_string());
    }
}
