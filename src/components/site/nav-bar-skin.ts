/**
 * The phone navbar has two states on one curve: flush against the top of the
 * page, then drawn in from the sides and dropped a little as the reader moves
 * down, turning to glass over whatever is passing beneath it.
 *
 * Border width stays at 1px in both states — only the colour changes — so the
 * bar cannot shift its contents by a pixel as it crosses over. The vertical
 * move is a transform rather than a margin, so it never reflows the page.
 *
 * Shared by both shells: the homepage navbar floating over the hero and the
 * interior header. Above xl every one of these is reset and the desktop
 * treatment takes over untouched.
 */
export const BAR_MOTION =
  "transition-[margin,transform,border-radius,border-color,background-color,box-shadow] duration-500 ease-lux motion-reduce:transition-none";

export const BAR_AT_TOP =
  "border border-x-transparent border-t-transparent border-b-ink/10 bg-ivory/85 backdrop-blur-md";

export const BAR_FLOATING =
  "mx-3 translate-y-2 rounded-2xl border-ink/10 bg-ivory/55 shadow-[0_10px_40px_-12px_rgba(27,24,21,0.28)] backdrop-blur-xl";

/** Undo the whole phone treatment from xl up. */
export const BAR_DESKTOP_RESET =
  "xl:mx-0 xl:translate-y-0 xl:rounded-none xl:border-0 xl:bg-transparent xl:shadow-none xl:backdrop-blur-none";
