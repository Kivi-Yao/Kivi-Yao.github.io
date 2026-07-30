# BGM audio files

The BGM player (`assets/js/wa2.js`) currently streams a piano cover of
届かない恋 via NetEase Music's outer-link API (the original recording
forbids hotlinking).

To also get the original song (上原れな ver.): drop your own
`todokanai-koi.mp3` into this folder and commit it. The player probes for
this file on load and, when present, adds it to the top of the playlist —
no code change needed.

To add more tracks, append entries to the `playlist` array in
`assets/js/wa2.js`.
