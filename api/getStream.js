import ytdl from "@distube/ytdl-core";

export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Missing ?url=" });

    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, {
      quality: "highest",
      filter: "audioandvideo"
    });

    res.status(200).json({ streamUrl: format.url });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
