export function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  // Bare 11-char id
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = url.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const parts = url.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "embed" || p === "shorts" || p === "live" || p === "v");
      if (idx >= 0 && parts[idx + 1] && /^[a-zA-Z0-9_-]{11}$/.test(parts[idx + 1])) return parts[idx + 1];
    }
  } catch {
    return null;
  }
  return null;
}

export type ThumbnailQuality = {
  label: string;
  size: string;
  url: string;
  filename: string;
};

export function getThumbnails(id: string): ThumbnailQuality[] {
  return [
    { label: "Max Resolution", size: "1280×720", url: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, filename: `${id}-maxres.jpg` },
    { label: "Standard Definition", size: "640×480", url: `https://i.ytimg.com/vi/${id}/sddefault.jpg`, filename: `${id}-sd.jpg` },
    { label: "High Quality", size: "480×360", url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, filename: `${id}-hq.jpg` },
    { label: "Medium Quality", size: "320×180", url: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`, filename: `${id}-mq.jpg` },
    { label: "Default", size: "120×90", url: `https://i.ytimg.com/vi/${id}/default.jpg`, filename: `${id}-default.jpg` },
  ];
}

export function formatTimestamp(h: number, m: number, s: number): number {
  return Math.max(0, Math.floor(h) * 3600 + Math.floor(m) * 60 + Math.floor(s));
}
