#[cfg_attr(mobile, tauri::mobile_entry_point)]
#[tokio::main]
pub async fn run() -> Result<(), Box<dyn std::error::Error>> {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fetch_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}

#[tauri::command]
async fn fetch_data() -> Result<String, String> {
    match reqwest::get("https://api.api-ninjas.com/v1/loremipsum?paragraphs=2").await {
        Ok(response) => {
            match response.text().await {
                Ok(text) => Ok(text),
                Err(_) => Err("Failed to parse the response".into()),
            }
        }
        Err(_) => Err("Failed to fetch data from the API".into()),
    }
}
