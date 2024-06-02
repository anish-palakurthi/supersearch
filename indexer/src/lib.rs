#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn sum(a: i32, b: i32) -> i32 {
  a + b
}

#[napi]
pub fn generate_list(input: String) -> Vec<String> {
    let mut results = Vec::new();
    results.push(format!("Result 1 for {}", input));
    results.push(format!("Result 2 for {}", input));
    results.push(format!("Result 3 for {}", input));
    results
}

