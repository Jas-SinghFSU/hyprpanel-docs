# Notifications
![Notifications](/configuration/notifications.png)
## Notification Settings
HyprPanel comes with a built-in notification system that can be configured to your liking. Notifications can be disabled for specific applications by passing the application name in the `Ignored Applications` field.

Notifications can also be configured to show only on one specified monitor or you can have them follow the active monitor.

You can also configure the position of the notifications on the screen along with the duration they are displayed.

These configuration settings can be found in the settings dialog under `Configuration > Notifications`. This settings panel also allows you to configure the behavior of your notifications menu.

### Ignored Applications
The ignored applications field allows you to specify which applications you do not want to receive notifications from. This field is an array of strings that should contain the names of the applications you want to ignore.

For example, if you want to ignore notifications from Discord and Slack, you would enter the following into the `Ignored Applications` field:
```bash
["discord", "slack"]
```

The names of applications that are input into this field are **case-insensitive** but they must match the `class` name of the application. You can find the class name of an application by running the following command:
```bash
hyprctl clients | grep -E "class:|initialTitle:|monitor:" | awk '{$1=""; print $0}' | paste - - - | awk '{class=($2 ? $2 : "-"); title=($4 ? $4 : "-"); monitor=($1 ? $1 : "-"); printf "%-25s %-20.20s %-7s\n", class, title, monitor}' | awk 'BEGIN {print "CLASS                     INITIAL TITLE         MONITOR"; print "------------------------- -------------------- -------"} {print}'
```
This command will show you a list of all the applications running on your system along with their class name. You can then use this class name to ignore the application in the `Ignored Applications` field.

Here is an example of the output of the above command:
```bash
CLASS                     INITIAL TITLE         MONITOR
------------------------- -------------------- -------
Spotify                   Premium              2      
kitty                     -                    -      
discord                   Discord              2      
kitty                     -                    -      
zen-alpha                 Zen                  1      
```
In this example, the class name for Discord is `discord` and Spotify is `Spotify`. You can input these class names into the `Ignored Applications` field to ignore notifications from these applications.

Remember that these are **case-insensitive**, so `Discord` and `discord` will both work.

### Position
Notifications can be positioned in 8 different locations on the screen. These locations in respect to the screen are as follows:
```text
+--------------------------------------------------------------+
| TOP LEFT                    TOP                    TOP RIGHT |
|                                                              |
|                                                              |
|                                                              |
| LEFT                                                   RIGHT |
|                                                              |
|                                                              |
|                                                              |
| BOTTOM LEFT             BOTTOM                  BOTTOM RIGHT |
+--------------------------------------------------------------+
```

### Monitor
Notifications can be configured to show on the active monitor or on a specific monitor. If you choose to show notifications on a specific monitor, you can input the id of the monitor you want the notifications to show on.

If you enable the `Follow Cursor` option, the notifications will follow the active monitor.

### Timeout
The **timeout** field allows you to specify the duration in **milliseconds** that the notification will be displayed on the screen. If you set this to `0`, the notification will not be displayed.

### Preserve Actions
This options allows you to **preserve** the actions of the notifications. This makes it so the actions (buttons that perform an action) of the notifications will not be removed when the session ends. This is useful for notifications that have actions that you want to persist across sessions.

## Notification Menu Settings
This section allows you to configure the behavior of the notifications menu. The notifications menu is the menu that appears when you click on the notification icon in the top bar. In this section you can configure how many notifications are displayed in the menu and the height of the menu itself. Additionally you can enable/disable the pagination of the notifications menu.

### Displayed Total
This not only has effect on the notifications menu, but also on the notifications themselves. This field allows you to specify the total number of notifications that will be displayed in the notifications menu. If the number of notifications exceeds this value, the older notifications will be moved to the next page if pagination is enabled.
