# Installation

HyprPanel has a few dependencies that need to be installed before you can use it. You can find a list of these dependencies below:

## Dependencies

### Bun

Bun is used to transpile and bundle HyprPanel. You can install it using the following command:

```sh
curl -fsSL https://bun.sh/install | bash && \
  sudo ln -s $HOME/.bun/bin/bun /usr/local/bin/bun
```

### Panel Dependencies

#### Required

```sh
pipewire
libgtop
bluez
bluez-utils
grimblast
gpu-screen-recorder
hyprpicker
btop
networkmanager
matugen
wl-clipboard
swww
dart-sass
brightnessctl
gnome-bluetooth-3.0
```

::: warning
HyprPanel will not run without the required dependencies.
:::

#### Optional

```sh
## Used for Tracking GPU Usage in your Dashboard (NVidia only)
python
python-gpustat

## Only if a pywal hook from wallpaper changes applied through settings is desired
pywal

## To check for pacman updates in the default script used in the updates module
pacman-contrib
```

These dependencies can be installed on arch-based systems using **BOTH** of the following commands:

#### Pacman

```sh
sudo pacman -S pipewire bluez bluez-utils btop networkmanager dart-sass wl-clipboard brightnessctl swww python gnome-bluetooth-3.0 pacman-contrib
```

#### AUR

```sh
yay -S grimblast-git gpu-screen-recorder hyprpicker matugen-bin python-gpustat aylurs-gtk-shell-git
```

### NixOS & Home Manager

Alternatively, if you're using NixOS and/or Home-Manager, you can setup AGS using the provided Nix Flake. First, add the repository to your Flake's inputs, and enable the overlay.

#### flake.nix

```nix
{
  inputs.hyprpanel.url = "github:Jas-SinghFSU/HyprPanel";
  # ...

  outputs = { self, nixpkgs, ... }@inputs:
  let
    # ...
	system = "x86_64-linux"; # change to whatever your system should be.
    pkgs = import nixpkgs {
	  inherit system;
	  # ...
	  overlays = [
        inputs.hyprpanel.overlay.${system}
	  ];
	};
  in {
    # ...
  }
}
```

Once you've set up the overlay, you can reference HyprPanel with `pkgs.hyprpanel` as if it were any other Nix package. This means you can reference it as a NixOS system/user package, a Home-Manager user package, or as a direct reference in your Hyprland configuration (if your configuration is managed by Home-Manager). The first three methods will add it to your `$PATH` (first globally, second two user-only), however the final will not.

#### configuration.nix & home.nix

```nix
# configuration.nix

# install it as a system package
environment.systemPackages = with pkgs; [
  # ...
  hyprpanel
  # ...
];

# or install it as a user package
users.users.<username>.packages = with pkgs; [
  # ...
  hyprpanel
  # ...
];


# home.nix

# install it as a user package with home-manager
home.packages = with pkgs; [
  # ...
  hyprpanel
  # ...
];

# or reference it directly in your Hyprland configuration
wayland.windowManager.hyprland.settings.exec-once = [
  "${pkgs.hyprpanel}/bin/hyprpanel"
];

```

## Installing NerdFonts

HyprPanel uses [Nerdfonts](https://www.nerdfonts.com/) to display icons. You can install them using the following command from within the HyprPanel directory:

```sh
# Installs the JetBrainsMono NerdFonts used for icons
./install_fonts.sh
```

If you install the fonts after installing HyperPanel, you will need to restart HyperPanel for the changes to take effect.

## Running HyprPanel

Once you've installed the dependencies, you must put the contents of the `HyprPanel` repository in your `~/.config/ags` directory. The command to do this is provided below.

If you already have something in that directory, it is recommended that you back it up with the following command:

```sh
# Moves the current ~/.config/ags directory to ~/.config/ags.bkup
mv $HOME/.config/ags $HOME/.config/ags.bkup
```

You can then install HyprPanel with the following command:

```sh
# Installs HyprPanel to ~/.config/ags
git clone https://github.com/Jas-SinghFSU/HyprPanel.git && \
  ln -s $(pwd)/HyprPanel $HOME/.config/ags
```

### Launching the panel

Once you've installed HyprPanel, you can launch it using the following command:

```sh
ags
```

### Launching the panel on startup

To launch the panel on startup, you can add the following line to your `~/.config/hypr/hyprland.conf` file:

```sh
exec-once = ags
```

This will automatically launch HyprPanel on Hyprland startup.

::: warning
HyprPanel handles notifications through the AGS built-in notification service. If you're already using a notification daemon such as Dunst, Mako or SwayNC, you may have to stop them to prevent conflicts with HyprPanel.
:::
