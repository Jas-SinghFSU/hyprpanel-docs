# FAQ

## How do I install HyprPanel?
Refer to the [Installation Guide](../getting_started/installation.md) for instructions on how to install HyprPanel.

## How can I start HyprPanel once installed?
HyprPanel can be started by running the following command:
```bash
ags
```
## How can I automatically start HyprPanel on boot?
To start HyprPanel on boot, you can add the following line to your `~/.config/hypr/hyprland.conf` file:

```bash
exec-once = ags
```

## Why is my HyprPanel is not launching?
Make sure that you have ALL of the required dependencies installed. If using Arch, BOTH **pacman** and **yay** commands should be ran to install all dependencies.

Additionally, HyprPanel is only compatible with Hyprland and will not work on any other Desktop Environment or Window Manager.

## How can I update HyprPanel?
Go to the directory where you git cloned HyprPanel and run the following command:
```bash
git pull
```
If you have made some changes to the code, you may need to resolve conflicts if there are any.

Or you can stash your changes and then pull the latest changes with the command above. To stash your changes, run the following command:
```bash
git stash
```

Then restart HyprPanel for the changes to take effect.

## My panel is too large or too small. How can I resize it?
The size of the panel automatically scales with the **font size** in the settings dialog under `Configuration > General`. You can adjust the font size to resize the panel.

If you want to resize specific elements of the panel, you can adjust the scale of the elements in the settings dialog in `Configuration > General` under the **Scaling** section.

## I want to hide the top bar on specific monitors. How can I do that?
To hide the top bar on specific monitors, refer to the following section in the [Configuration Guide](../configuration/panel.md#hiding-the-bar-on-specific-monitors).

## I want to save my configuration, how can I do that?
You can save you configuration by exporting it in the settings dialog under `Configuration > General` by clicking the **Export** button. You can then import the configuration by clicking the **Import** button.

NOTE: Your configuration also contains your API keys. Make sure to keep it safe. This may change in the future.

## I want to save my theme, how can I do that?
You can save your theme by exporting it in the settings dialog under `Theming > General Settings` by clicking the **Export** button. You can then import the theme by clicking the **Import** button.

## Does HyprPanel come with any themes?
Yes, HyprPanel comes with themes that can be imported in the settings dialog under `Theming > General Settings` by clicking the **Import** button. These themes can be found in the HyprPanel directory under `themes`.

You can also preview the themes on the [Themes Page](../configuration/themes.md).

## Help! Why are some of my icons missing or showing up as squares?
Most symbols in HyprPanel are sourced from nerd-fonts. Some, such as the battery and network symbols, are system-based.

If you are seeing squares instead of the intended icons, it's likely that the necessary fonts are not installed. Follow the nerd-fonts installation instructions in the [Installation Guide](../getting_started/installation.md#installing-nerdfonts) to rectify this.

However, if some symbols are still absent, your current system icon theme may not include them. To resolve this, install a theme that includes the necessary symbols.

## Why are my icons misaligned?
HyprPanel relies heavily on nerd-fonts for its icons. If your icons are misaligned, then make sure that you have the right font installed that is needed for HyprPanel.

Instructions for installing the required fonts can be found in the [Installation Guide](../getting_started/installation.md#installing-nerdfonts).

## I don't want notifications for specific applications. How can I disable them?
To disable notifications for specific applications, refer to the following section in the [Notifications Guide](../configuration/notifications.md#ignored-applications).

## I don't want certain applications to show up in the system tray. How can I disable them?
To disable certain applications from showing up in the system tray, refer to the **System Tray** section in the [Panel Configuration](../configuration/panel.md#system-tray).

## My changes are not taking effect. How can I fix this?
Changes to the configuration are not automatically applied. You must press **enter** in the text box for the changes to take effect. Any unsaved changes are indicated by a yellow warning icon.

## My weather is not displaying any information or is showing the wrong information. What is going on?
For the weather to work, you must provide a valid API key for the [Weather API](https://www.weatherapi.com/). You can get a free API key by signing up on their website.

Once you have the API key, you can input it in the `Weather API Key` field in the settings dialog under `Configuration > Clock Menu`.

If your weather information is inaccurate, make sure that the location is set correctly in the `Location` field under `Configuration > Clock Menu`.

## My bar is covering the content of some applications. How can I fix this?
If the bar is covering the content of elements such as menus for certain applications, you can change the **Layer** of the bar in the settings dialog under `Configuration > Bar`.

**top** - The bar will be above most windows such as tooltips, dropdowns, context menus, etc.

**bottom** - The bar will be behind your typical windows.

**overlay** - The bar will be above all other elements on the screen.

**background** - The bar will be behind all other elements on the screen.

## Why is my Calendar not updating when the date changes?
The built in GTK Calendar is quite awful in many regards and has extremely limited functionality. HyprPanel will soon have its own calendar that will be more reliable and have more features. Hang tight!

## Can I use keybinds to perform certain actions in the panel?
Yes, you can use the commands found in the [CLI Page](../configuration/cli.md) to open specific menus in the panel.

## I need help with something else. Where can I go?
Feel free to hop into the HyprPanel [discord server](https://discord.gg/MNpg7Z2b3a) and ask for help in the `#help` channel.

## HyprPanel seems to disable the Tearing I have enabled in my Hyprland. How can I fix this?
Hyprland states that in order for Tearing to be enabled, the full screen application must be the only thing visible on the screen.

HyprPanel has Notifications, OSDs and if configured, the Bar as an overlay which means that it's given priority over the full screen application.

In order to fix this, you can enable the `Tearing Compatible` options under `Configuration > General` in the settings dialog. This will demote all of the overlays to one layer down which satisfies Hyprland's requirements for Tearing to be enabled.
