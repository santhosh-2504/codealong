function getYouTubeEmbedUrl(videoUrl) {
    try {
      const url = new URL(videoUrl);
      const hostname = url.hostname;
      let videoId = "";
  
      // Handle regular YouTube URLs
      if (hostname.includes("youtube.com")) {
        videoId = url.searchParams.get("v");
        if (!videoId && url.pathname.includes("/embed/")) {
          // Already in embed form
          return videoUrl;
        }
      }
  
      // Handle youtu.be short URLs
      else if (hostname.includes("youtu.be")) {
        videoId = url.pathname.slice(1);
      }
  
      if (!videoId) return null;
  
      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return null;
    }
  }
  
  export default function VideoPlayer({ videoUrl }) {
    const embedUrl = getYouTubeEmbedUrl(videoUrl);
  
    if (!embedUrl) {
      return (
        <div className="w-full h-full flex items-center justify-center text-center text-red-500 bg-gray-100 rounded">
          Invalid or unsupported YouTube URL.
        </div>
      );
    }
  
    return (
      <div className="w-full h-full">
        <iframe
          className="w-full h-full rounded shadow"
          src={embedUrl}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  