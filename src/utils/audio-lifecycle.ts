export function createAudioLifecycleManager(options: {
  getExistingAudioContext: () => AudioContext | null;
  onPlayError: (key: string, err: any) => void;
}) {
  const tracks = new Map<string, {
    isPlaying: () => boolean;
    pause: () => void;
    resume: () => Promise<void> | void;
  }>();

  let isAttached = false;
  let wasPlayingOnHide = new Set<string>();

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      wasPlayingOnHide.clear();
      tracks.forEach((track, key) => {
        if (track.isPlaying()) {
          wasPlayingOnHide.add(key);
          track.pause();
        }
      });
      const ctx = options.getExistingAudioContext();
      if (ctx && ctx.state === 'running') {
        ctx.suspend().catch(e => console.warn('AudioContext suspend failed:', e));
      }
    } else if (document.visibilityState === 'visible') {
      const ctx = options.getExistingAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(e => console.warn('AudioContext resume failed:', e));
      }
      wasPlayingOnHide.forEach((key) => {
        const track = tracks.get(key);
        if (track) {
          try {
            const p = track.resume();
            if (p instanceof Promise) {
              p.catch(err => options.onPlayError(key, err));
            }
          } catch (err) {
            options.onPlayError(key, err);
          }
        }
      });
      wasPlayingOnHide.clear();
    }
  };

  return {
    trackMedia(key: string, getAudioObj: () => HTMLMediaElement | null) {
      tracks.set(key, {
        isPlaying: () => {
          const el = getAudioObj();
          return el ? (!el.paused && !el.ended) : false;
        },
        pause: () => {
          const el = getAudioObj();
          if (el) el.pause();
        },
        resume: () => {
          const el = getAudioObj();
          if (el) return el.play();
        }
      });
      return this;
    },
    trackCustom(key: string, custom: { isPlaying: () => boolean; pause: () => void; resume: () => Promise<void> | void }) {
      tracks.set(key, custom);
      return this;
    },
    attach() {
      if (isAttached) return;
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('pagehide', handleVisibilityChange);
      isAttached = true;
      return this;
    },
    detach() {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handleVisibilityChange);
      isAttached = false;
      return this;
    }
  };
}