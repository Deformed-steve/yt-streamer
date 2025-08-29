import ytdl from "ytdl-core";

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url || !ytdl.validateURL(url)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    // Get video info
    const info = await ytdl.getInfo(url);

    // Pick the best mp4 stream (you can change to audio only if you want)
    const format = ytdl.chooseFormat(info.formats, { quality: "18" });

    if (!format || !format.url) {
      return res.status(404).json({ error: "No stream found" });
    }

    return res.status(200).json({ streamUrl: format.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
