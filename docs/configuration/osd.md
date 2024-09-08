# OSD (On-Screen Display)
![OSD](/configuration/osd.png)

HyprPanel comes with a built-in On-Screen Display (OSD) that can displays information about the volume, brightness, and microphone status.

The OSD can be configured to show on the active monitor or on a specific monitor. You can also configure the position of the OSD on the screen along with the orientation - vertical or horizontal.

Similary to the notifications, the OSD can be configured to show only on one specified monitor or you can have it follow the active monitor. Additionally, you can configure the position of the OSD in respect to the screen.

The OSD currently supports displaying the following information:
1. Volume
2. Microphone
3. Screen Brightness
4. Keyboard Brightness

## Orientation
The OSD can be displayed in either a horizontal or vertical orientation. The horizontal orientation will display the OSD horizontally, from left to right. The vertical orientation will display the OSD vertically, from bottom to top.

## Position
Similar to notifications, the OSD can be positioned in 8 different locations on the screen. These locations in respect to the screen are as follows:
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

## Monitor
The OSD can be configured to show on the active monitor or on a specific monitor. If you choose to show the OSD on a specific monitor, you can input the id of the monitor you want the OSD to display on.

If you enable the `Follow Cursor` option, the OSD will follow the active monitor.

## Mute Volume as Zero
This options will display the volume as zero when the volume is muted. If this option is disabled, the OSD will display the volume as it was before it was muted.
