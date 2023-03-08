import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno({
      attributifyPseudo: true,
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'color': 'inherit',
        // Avoid crushing of icons in crowded situations
        'min-width': '1.2em',
      },
    }),
    presetTypography(),
    // presetWebFonts({
    //   provider: 'none',
    //   fonts: {
    //     script: 'Homemade Apple',
    //   },
    // }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    fontSize: {
      8: '8px',
      9: '9px',
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
    },
  },
  rules: [
    // scrollbar-hide
    [/^scrollbar-hide$/, (_, { constructCSS }) => {
      let res = constructCSS({ 'scrollbar-width': 'none' })
      res += `\n${res.replace('{scrollbar-width:none;}', '::-webkit-scrollbar{display: none;}')}`
      return res
    }],
    ['box-shadow-outline', { 'box-shadow': '0 0 0 1px var(--c-primary)' }],
  ],
})
