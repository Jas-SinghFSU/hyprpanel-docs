import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "HyprPanel",
    description: "The ultimate configurable panel for Hyprland",
    themeConfig: {
        outline: "deep",
        search: {
            provider: 'local',
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Getting Started', link: '/getting_started/hyprpanel' }
        ],

        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'HyprPanel', link: '/getting_started/hyprpanel' },
                    { text: 'Installation', link: '/getting_started/installation' }
                ]
            },
            {
                text: 'Configuration',
                items: [
                    { text: 'Settings', link: '/configuration/settings.md' },
                    { text: 'Panel Configuration', link: '/configuration/panel.md' },
                    { text: 'Themes', link: '/configuration/themes.md' },
                    { text: 'Creating Themes', link: '/configuration/theming.md' },
                ]
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/Jas-SinghFSU/HyprPanel' }
        ]
    }
})
