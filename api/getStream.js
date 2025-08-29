import ytdl from "@distube/ytdl-core"; // yt-dlp clone for Node

export default async function handler(req, res) {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: "Missing ?url=" });
    }

    const info = await ytdl.getInfo(url);
    // Pick best MP4 format
    const format = ytdl.chooseFormat(info.formats, { quality: "highest", filter: "audioandvideo" });

    res.status(200).json({
      streamUrl: format.url
    });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
