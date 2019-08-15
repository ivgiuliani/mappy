use std::env;

mod images;

fn help(sysname: &str) {
    println!("{} filename", sysname);
    println!("  returns the exif data for the given filename");
}

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() <= 1 {
        help(&args[0]);
        return;
    }

    let path = &args[1];
    images::extract_gps_exif(path);
}
