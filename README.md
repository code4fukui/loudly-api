# loudly-api

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

An API service and web interface for generating music using the [Loudly Music API](https://www.loudly.com/developers).

This project provides two simple web interfaces:
1.  **Music Generator**: An interface to generate new music by selecting a genre, sub-genre, and BPM. You can play and download the generated track.
2.  **House Music Player**: A minimalist player for 10 pre-generated House music tracks included in the repository.

## Features
- Generate original music by specifying parameters like genre, BPM, key, and more.
- A web-based UI to experiment with music generation, play, and download tracks.
- Includes a set of 10 pre-generated House music tracks.
- Built with the [Deno](https://deno.land/) runtime.

## Requirements
- [Deno](https://deno.land/)
- A Loudly API key, which can be obtained from the [Loudly for Developers](https://www.loudly.com/developers) website.

## Usage
1. Clone the repository.
2. Create a `.env` file in the root directory and add your Loudly API key:
   ```
   APIKEY=your_api_key_here
   ```
3. Run the server:
   ```sh
   deno run -A --watch server.js
   ```
4. Access the web interfaces in your browser:
   - **Music Generator**: http://localhost:8080/
   - **House Music Player**: http://localhost:8080/player.html

## Data / API
This project uses the [Loudly Music API](https://www.loudly.com/developers) to generate music.

## License
MIT License