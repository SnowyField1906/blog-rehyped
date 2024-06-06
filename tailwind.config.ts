import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    daisyui: {
        themes: ['light'],
    },
    theme: {
        screens: {
            sm: '500px',
            md: [{ min: '668px', max: '767px' }, { min: '868px' }],
            lg: '790px',
            xl: '1200px',
        },
        fontFamily: {
            sans: ['Sarabun', 'sans-serif'],
            serif: ['Noto Serif JP', 'serif'],
            heading: ['Cormorant SC', 'serif'],
            display: ['Playfair Display', 'serif'],
            mono: ['Fira Code', 'monospace'],
        },
        fontSize: {
            '2xs': ['0.75rem', { lineHeight: '1.25rem' }],
            xs: ['0.8125rem', { lineHeight: '1.5rem' }],
            sm: ['0.875rem', { lineHeight: '1.5rem' }],
            base: ['1rem', { lineHeight: '1.75rem' }],
            lg: ['1.125rem', { lineHeight: '1.75rem' }],
            xl: ['1.25rem', { lineHeight: '1.75rem' }],
            '2xl': ['1.5rem', { lineHeight: '2rem' }],
            '3xl': ['1.75rem', { lineHeight: '2.25rem' }],
            '4xl': ['2rem', { lineHeight: '2.5rem' }],
            '5xl': ['2.75rem', { lineHeight: '3rem' }],
            '6xl': ['3.5rem', { lineHeight: '1' }],
            '7xl': ['4.25rem', { lineHeight: '1' }],
            '8xl': ['5.75rem', { lineHeight: '1' }],
            '9xl': ['7rem', { lineHeight: '1' }],
        },
        typography: ({ theme }) => ({
            DEFAULT: {
                css: {
                    '--tw-prose-body': theme('colors.zinc.700'),
                    '--tw-prose-headings': theme('colors.zinc.900'),
                    '--tw-prose-links': theme('colors.primary.600'),
                    '--tw-prose-links-hover': theme('colors.primary.800'),
                    '--tw-prose-links-underline': theme(
                        'colors.primary.800 / 0.3'
                    ),
                    '--tw-prose-bold': theme('colors.zinc.800'),
                    '--tw-prose-counters': theme('colors.zinc.500'),
                    '--tw-prose-bullets': theme('colors.zinc.300'),
                    '--tw-prose-hr': theme('colors.zinc.800 / 0.05'),
                    '--tw-prose-quotes': theme('colors.zinc.800'),
                    '--tw-prose-quote-borders': theme('colors.zinc.200'),
                    '--tw-prose-captions': theme('colors.zinc.500'),
                    '--tw-prose-th-borders': theme('colors.zinc.300'),
                    '--tw-prose-td-borders': theme('colors.zinc.200'),

                    // Base
                    color: 'var(--tw-prose-body)',
                    fontSize: theme('fontSize.base')[0],
                    lineHeight: theme('lineHeight.9'),
                    fontFamily: theme('fontFamily.serif').join(', '),

                    // Text
                    p: {
                        marginTop: theme('spacing.4'),
                        marginBottom: theme('spacing.4'),
                    },
                    '[class~="katex"]': {
                        fontSize: theme('fontSize.xl')[0],
                        color: 'var(--tw-prose-bold)',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        ...theme('fontSize.xl')[1],
                    },

                    // Lists
                    ol: {
                        listStyleType: 'decimal',
                        marginTop: theme('spacing.5'),
                        marginBottom: theme('spacing.5'),
                        paddingLeft: '1.625rem',
                    },
                    'ol[type="A"]': {
                        listStyleType: 'upper-alpha',
                    },
                    'ol[type="a"]': {
                        listStyleType: 'lower-alpha',
                    },
                    'ol[type="A" s]': {
                        listStyleType: 'upper-alpha',
                    },
                    'ol[type="a" s]': {
                        listStyleType: 'lower-alpha',
                    },
                    'ol[type="I"]': {
                        listStyleType: 'upper-roman',
                    },
                    'ol[type="i"]': {
                        listStyleType: 'lower-roman',
                    },
                    'ol[type="I" s]': {
                        listStyleType: 'upper-roman',
                    },
                    'ol[type="i" s]': {
                        listStyleType: 'lower-roman',
                    },
                    'ol[type="1"]': {
                        listStyleType: 'decimal',
                    },
                    ul: {
                        listStyleType: 'disc',
                        marginTop: theme('spacing.5'),
                        marginBottom: theme('spacing.5'),
                        paddingLeft: '1.625rem',
                    },
                    li: {
                        marginTop: theme('spacing.2'),
                        marginBottom: theme('spacing.2'),
                    },
                    ':is(ol, ul) > li': {
                        paddingLeft: theme('spacing[1.5]'),
                    },
                    'ol > li::marker': {
                        fontWeight: '400',
                        color: 'var(--tw-prose-counters)',
                    },
                    'ul > li::marker': {
                        color: 'var(--tw-prose-bullets)',
                    },
                    '> ul > li p': {
                        marginTop: theme('spacing.3'),
                        marginBottom: theme('spacing.3'),
                    },
                    '> ul > li > *:first-child': {
                        marginTop: theme('spacing.5'),
                    },
                    '> ul > li > *:last-child': {
                        marginBottom: theme('spacing.5'),
                    },
                    '> ol > li > *:first-child': {
                        marginTop: theme('spacing.5'),
                    },
                    '> ol > li > *:last-child': {
                        marginBottom: theme('spacing.5'),
                    },
                    'ul ul, ul ol, ol ul, ol ol': {
                        marginTop: theme('spacing.3'),
                        marginBottom: theme('spacing.3'),
                    },

                    // Horizontal rules
                    hr: {
                        borderColor: 'var(--tw-prose-hr)',
                        borderTopWidth: 1,
                        marginTop: theme('spacing.16'),
                        marginBottom: theme('spacing.16'),
                        maxWidth: 'none',
                        marginLeft: `calc(-1 * ${theme('spacing.4')})`,
                        marginRight: `calc(-1 * ${theme('spacing.4')})`,
                        '@screen sm': {
                            marginLeft: `calc(-1 * ${theme('spacing.6')})`,
                            marginRight: `calc(-1 * ${theme('spacing.6')})`,
                        },
                        '@screen lg': {
                            marginLeft: `calc(-1 * ${theme('spacing.8')})`,
                            marginRight: `calc(-1 * ${theme('spacing.8')})`,
                        },
                    },

                    // Quotes
                    blockquote: {
                        fontWeight: '500',
                        fontStyle: 'italic',
                        color: 'var(--tw-prose-quotes)',
                        borderLeftWidth: '0.25rem',
                        borderLeftColor: 'var(--tw-prose-quote-borders)',
                        quotes: '"\\201C""\\201D""\\2018""\\2019"',
                        marginTop: theme('spacing.8'),
                        marginBottom: theme('spacing.8'),
                        paddingLeft: theme('spacing.5'),
                    },
                    'blockquote p:first-of-type::before': {
                        content: 'open-quote',
                    },
                    'blockquote p:last-of-type::after': {
                        content: 'close-quote',
                    },

                    // Headings
                    h1: {
                        color: 'var(--tw-prose-headings)',
                        fontWeight: '700',
                        fontSize: theme('fontSize.5xl')[0],
                        ...theme('fontSize.5xl')[1],
                        marginBottom: theme('spacing.16'),
                    },
                    h2: {
                        color: 'var(--tw-prose-headings)',
                        fontWeight: '600',
                        fontSize: theme('fontSize.3xl')[0],
                        ...theme('fontSize.3xl')[1],
                        marginTop: theme('spacing.12'),
                        marginBottom: theme('spacing.8'),
                    },
                    h3: {
                        color: 'var(--tw-prose-headings)',
                        fontSize: theme('fontSize.2xl')[0],
                        ...theme('fontSize.2xl')[1],
                        fontWeight: '600',
                        marginTop: theme('spacing.10'),
                        marginBottom: theme('spacing.6'),
                    },
                    h4: {
                        color: 'var(--tw-prose-headings)',
                        fontSize: theme('fontSize.xl')[0],
                        ...theme('fontSize.xl')[1],
                        fontWeight: '600',
                        marginTop: theme('spacing.8'),
                        marginBottom: theme('spacing.4'),
                    },
                    h5: {
                        color: 'var(--tw-prose-headings)',
                        fontSize: theme('fontSize.lg')[0],
                        ...theme('fontSize.lg')[1],
                        fontWeight: '600',
                        marginTop: theme('spacing.8'),
                        marginBottom: theme('spacing.4'),
                    },

                    figcaption: {
                        color: 'var(--tw-prose-captions)',
                        fontSize: theme('fontSize.base')[0],
                        letterSpacing: '0.01em',
                        textAlign: 'center',
                        fontFamily: theme('fontFamily.sans').join(', '),
                        ...theme('fontSize.base')[1],
                        marginTop: theme('spacing.2'),
                    },

                    // Media
                    'img, video, figure': {
                        marginTop: theme('spacing.8'),
                        marginBottom: theme('spacing.8'),
                    },
                    'figure > *': {
                        marginTop: '0',
                        marginBottom: '0',
                    },
                    '[class~="math-display"]': {
                        textAlign: 'center',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        width: '100%',
                    },
                    '[class~="tag"]': {
                        paddingLeft: '10px',
                        paddingRight: '2px',
                    },

                    // Tables
                    table: {
                        width: '100%',
                        tableLayout: 'auto',
                        textAlign: 'left',
                        marginTop: theme('spacing.8'),
                        marginBottom: theme('spacing.8'),
                        lineHeight: theme('lineHeight.6'),
                    },
                    thead: {
                        borderBottomWidth: '1px',
                        borderBottomColor: 'var(--tw-prose-th-borders)',
                    },
                    'thead th': {
                        color: 'var(--tw-prose-headings)',
                        fontWeight: '600',
                        verticalAlign: 'bottom',
                        paddingRight: theme('spacing.2'),
                        paddingBottom: theme('spacing.2'),
                        paddingLeft: theme('spacing.2'),
                    },
                    'thead th:first-child': {
                        paddingLeft: '0',
                    },
                    'thead th:last-child': {
                        paddingRight: '0',
                    },
                    'tbody tr': {
                        borderBottomWidth: '1px',
                        borderBottomColor: 'var(--tw-prose-td-borders)',
                    },
                    'tbody tr:last-child': {
                        borderBottomWidth: '0',
                    },
                    'tbody td': {
                        verticalAlign: 'baseline',
                    },
                    tfoot: {
                        borderTopWidth: '1px',
                        borderTopColor: 'var(--tw-prose-th-borders)',
                    },
                    'tfoot td': {
                        verticalAlign: 'top',
                    },
                    ':is(tbody, tfoot) td': {
                        paddingTop: theme('spacing.2'),
                        paddingRight: theme('spacing.2'),
                        paddingBottom: theme('spacing.2'),
                        paddingLeft: theme('spacing.2'),
                    },
                    ':is(tbody, tfoot) td:first-child': {
                        paddingLeft: '0',
                    },
                    ':is(tbody, tfoot) td:last-child': {
                        paddingRight: '0',
                    },

                    // Inline elements
                    a: {
                        color: 'var(--tw-prose-links)',
                        textDecoration: 'underline transparent',
                        fontWeight: '500',
                        transitionProperty: 'color, text-display-color',
                        transitionDuration: theme('transitionDuration.DEFAULT'),
                        transitionTimingFunction: theme(
                            'transitionTimingFunction.DEFAULT'
                        ),
                        '&:hover': {
                            color: 'var(--tw-prose-links-hover)',
                            textDecorationColor:
                                'var(--tw-prose-links-underline)',
                            textUnderlineOffset: '0.2em',
                        },
                    },
                    ':is(h1, h2, h3) a': {
                        fontWeight: 'inherit',
                    },
                    strong: {
                        color: 'var(--tw-prose-bold)',
                        fontWeight: '600',
                    },
                    ':is(a, blockquote, thead th) strong': {
                        color: 'inherit',
                    },
                    code: {
                        color: 'var(--tw-prose-code)',
                        borderRadius: theme('borderRadius.lg'),
                        paddingTop: theme('padding.1'),
                        paddingRight: theme('padding[1.5]'),
                        paddingBottom: theme('padding.1'),
                        paddingLeft: theme('padding[1.5]'),
                        boxShadow: 'inset 0 0 0 1px var(--tw-prose-code-ring)',
                        backgroundColor: 'var(--tw-prose-code-bg)',
                        fontSize: theme('fontSize.2xs'),
                    },

                    ':is(a, h1, h2, h3, blockquote, thead th) code': {
                        color: 'inherit',
                    },
                    'h2 code': {
                        fontSize: theme('fontSize.base')[0],
                        fontWeight: 'inherit',
                    },
                    'h3 code': {
                        fontSize: theme('fontSize.sm')[0],
                        fontWeight: 'inherit',
                    },

                    // Overrides
                    ':is(h1, h2, h3) + *': {
                        marginTop: '0',
                    },
                    '> :first-child': {
                        marginTop: '0 !important',
                    },
                    '> :last-child': {
                        marginBottom: '0 !important',
                    },
                },
            },
            mobile: {
                css: {
                    fontSize: theme('fontSize.sm')[0],

                    p: {
                        marginTop: theme('spacing.3'),
                        marginBottom: theme('spacing.3'),
                    },

                    h1: {
                        fontSize: theme('fontSize.4xl')[0],
                        ...theme('fontSize.4xl')[1],
                    },
                    h2: {
                        fontSize: theme('fontSize.2xl')[0],
                        ...theme('fontSize.2xl')[1],
                    },
                    h3: {
                        fontSize: theme('fontSize.xl')[0],
                        ...theme('fontSize.xl')[1],
                    },
                    h4: {
                        fontSize: theme('fontSize.lg')[0],
                        ...theme('fontSize.lg')[1],
                    },
                },
            },
        }),
    },
    plugins: [
        require('daisyui'),
        require('tailwindcss/nesting'),
        require('postcss-nesting'),
        require('@tailwindcss/typography'),
    ],
}
export default config
