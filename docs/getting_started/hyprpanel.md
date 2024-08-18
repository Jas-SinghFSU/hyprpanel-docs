# HyprPanel
## What is it?
HyprPanel as the name implies is a panel built specifically for [Hyprland](https://hyprland.org/). It's an extremely customizable panel that provides useful widgets out of the box to display information about your system (volume, network status, bluetooth, battery, calendar, notifications, OSDs, etc.). Additionally, it provides quick access to context menus that allow you to control your system settings without having to rely on external tools.

## What does it do differently?
HyprPanel was built because popular solutions out there for bars were, simply as the name implies, only bars. For everything outside of displaying information, they relies on custom scripts and third party tools such as:
- PulseAudio Volume Control - To control volume and switch audio devices
- NMApplet - To manage network connections
- Blueman - To configure bluetooth connections
- Dunst - For notifications
- SwayOSD - For on screen displays

The list goes on and as you can imagine, these tools don't integrate nicely with your theme as they're their own standalone applications. Bars like Waybar and Polybar (x11) are amazing for what they do and are extremely light-weight but if you want more than just a bar, there aren't many options. 

This is where HyprPanel comes in as it provides all of this functionality out of the box with each of these components fully themable.

![HyprPanel](/images/getting_started/hyprpanel.png)
