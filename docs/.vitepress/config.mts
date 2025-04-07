import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "HyprPanel",
    description: "The ultimate configurable panel for Hyprland",
    head: [
        [
            "link",
            {
                rel: "icon",
                type: "image/png",
                sizes: "16x16",
                href: "/favicon-16x16.png",
            },
        ],
        [
            "link",
            {
                rel: "icon",
                type: "image/png",
                sizes: "32x32",
                href: "/favicon-32x32.png",
            },
        ],
        ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        [
            "link",
            {
                rel: "apple-touch-icon",
                sizes: "180x180",
                href: "/apple-touch-icon.png",
            },
        ],
        [
            "link",
            {
                rel: "icon",
                type: "image/png",
                sizes: "192x192",
                href: "/android-chrome-192x192.png",
            },
        ],
        [
            "link",
            {
                rel: "icon",
                type: "image/png",
                sizes: "512x512",
                href: "/android-chrome-512x512.png",
            },
        ],
        ["link", { rel: "manifest", href: "/site.webmanifest" }],
    ],
    themeConfig: {
        logo: "/HyprPanel.jpeg",
        outline: "deep",
        search: {
            provider: "local",
        },
        nav: [
            { text: "Home", link: "/" },
            { text: "Getting Started", link: "/getting_started/hyprpanel" },
        ],

        sidebar: [
            {
                text: "Getting Started",
                items: [
                    { text: "HyprPanel", link: "/getting_started/hyprpanel" },
                    { text: "Installation", link: "/getting_started/installation" },
                    { text: "Migrating to Astal/AGSv2", link: "/getting_started/astal" },
                ],
            },
            {
                text: "Configuration",
                items: [
                    { text: "Settings", link: "/configuration/settings.md" },
                    { text: "Bar Modules", link: "/configuration/modules.md" },
                    { text: "Custom Modules", link: "/configuration/custom_modules.md" },
                    { text: "Panel Configuration", link: "/configuration/panel.md" },
                    { text: "Notifications", link: "/configuration/notifications.md" },
                    { text: "OSD", link: "/configuration/osd.md" },
                    { text: "Themes", link: "/configuration/themes.md" },
                    { text: "Creating Themes", link: "/configuration/theming.md" },
                    { text: "CLI Commands", link: "/configuration/cli.md" },
                ],
            },
            {
                text: "Help",
                items: [{ text: "FAQ", link: "/help/faq" }],
            },
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/Jas-SinghFSU/HyprPanel" },
            { icon: "discord", link: "https://discord.gg/MNpg7Z2b3a" },
        ],
    },
});
