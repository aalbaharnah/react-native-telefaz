// hls.ts
import Hls from 'hls.js';

export function attachHls(videoElement: HTMLVideoElement, src: string) {
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoElement);

        hls.on(Hls.Events.ERROR, function (event, data) {
            console.error('HLS.js error:', data);
        });

        return hls;
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari (or any browser with native HLS support)
        videoElement.src = src;
    } else {
        console.warn('HLS is not supported in this browser.');
    }

    return null;
}
