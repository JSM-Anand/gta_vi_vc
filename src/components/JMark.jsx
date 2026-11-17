// Jarvis's "J" monogram: the J from ArtDeco Condensed Heavy, as outlines so it renders before the
// font loads. Drawn in font units (y up), hence the flip.
function JMark(props) {
  return (
    <svg viewBox="10 -700 402 712" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path
        transform="scale(1 -1)"
        d="M10 200V230L155 240V182Q155 153 169.5 135.5Q184 118 211 118Q238 118 252.5 135.5Q267 153 267 182V700H412V200Q412 98 360.5 43.0Q309 -12 211 -12Q113 -12 61.5 43.0Q10 98 10 200Z"
      />
    </svg>
  )
}

export default JMark
