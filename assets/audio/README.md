# BGM audio files

The BGM player (`assets/js/wa2.js`) currently streams via NetEase Music's
outer-link API (only versions that allow hotlinking):

1. 届かない恋（冬马和纱 Ver.）— vocal
2. 届かない恋 (Piano Cover)

The official recordings (上原れな original, 小木曽雪菜 Live at Campus Fes,
and any 雪菜×かずさ duet mix) forbid hotlinking. To play one of those:
drop your own `todokanai-koi.mp3` into this folder and commit it. The
player probes for this file on load and, when present, adds it to the top
of the playlist — no code change needed.

To add more tracks, append entries to the `playlist` array in
`assets/js/wa2.js`.
