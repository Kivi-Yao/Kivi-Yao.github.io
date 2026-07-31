# BGM audio files

The BGM player (`assets/js/wa2.js`) streams via NetEase Music's outer-link
API (only versions that allow hotlinking):

1. 届かない恋（冬马和纱 Ver.）— vocal
2. 届かない恋 (Piano Cover)

The playlist is shuffled on every page load; all tracks (streamed and
local) share the same random pool with equal probability.

Local track slots — the player probes these files on load and adds each
one it finds to the pool (no code change needed):

- `todokanai-koi-setsuna.mp3` → 届かない恋 (小木曽雪菜 Ver., 米澤円)
- `todokanai-koi.mp3` → 届かない恋 (上原れな original)

These versions forbid hotlinking on every streaming platform, so they can
only play self-hosted. Drop the file(s) into this folder and commit.

To add more tracks, extend `LOCAL_TRACKS` or `playlist` in
`assets/js/wa2.js`.
