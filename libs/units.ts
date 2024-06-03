export const remToPx = (rem: any) => {
    const rootFontSize =
        typeof window === 'undefined'
            ? 16
            : parseFloat(
                  window.getComputedStyle(document.documentElement).fontSize
              )

    return parseFloat(rem) * rootFontSize
}
