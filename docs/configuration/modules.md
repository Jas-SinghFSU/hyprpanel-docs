# Modules
Modules are the buttons that appear in the bar that display information or provide functionality. They can be added, removed, and customized to your liking. Modules are the core of the bar and are what make it useful. 

These modules can be added on any side of the bar (left, middle, right) in any order. Each module can be configured and themed in the settings dialog.

To assign a module to a section of the bar, follow the instructions in the [Layouts](./panel.md#layouts) section.

## Available Modules

There are two types of modules: **Standard** and **Custom**.

These modules can be configured in the **Custom Modules** section of the **Configuration** pane in the **settings dialog**.

Modules can also be themed in the **Custom Modules** section of the **Theming** pane in the **settings dialog**.

[![Modules](/configuration/modules.png)](/configuration/modules.png)

### Standard  Modules

**Standard Modules** are modules with predefined behavior and settings. These modules usually have a drop-down menu associated with them and can be configured to some extent.

```Text
battery
dashboard
workspaces
windowtitle
media
notifications
volume
network
bluetooth
clock
systray
```

### Custom Modules

**Custom Modules** are lightweight modules that have no drop-down menu associated with them. Usually, these modules provide some type of information, either about your system or general information.

Almost all of the custom modules can have their mouse actions configured in the settings dialog. This includes `left-click`, `right-click`, `middle-click`, `scroll-up`, and `scroll-down`.

Typically, mouse actions are configured by assigning a specific Bash command to them. This assignment is done in the text box associated with the action, located within the settings dialog.

Additionally, they can spawn any drop-down menu by having the `menu:menu_name` command assigned to them in any of the mouse actions.

```Text
ram
cpu
storage
netstat
kbinput
updates
weather
power
```
### Spawning Drop-Down Menus

In order to spawn a drop-down menu you can assign the `menu:menu_name` command to any of the mouse actions. For example, to spawn the `dashboard` menu on left-click you would assign the `menu:dashboard` command to the left-click action of a module.

Here is a list of how to spawn each menu:
```Text
menu:audio
menu:network
menu:bluetooth
menu:media
menu:notifications
menu:calendar
menu:energy
menu:dashboard
menu:powerdropdown
```
