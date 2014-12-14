# CiteGen
CiteGen is an extension for browsers (currently only Chrome and Firefox) that generates a Wikipedia citation for the current page, using [Reflinks](https://en.wikipedia.org/wiki/User:Zhaofeng_Li/Reflinks) as the backend. Metadata parsing is done server-side, unlike [Cite4Wiki](https://en.wikipedia.org/wiki/Wikipedia:Cite4Wiki) which parses the metadata in the browser itself. As a result, CiteGen is able to parse more metadata fields than Cite4Wiki, and the capability can be extended without the user updating the add-on.

## Building
Warning: The following instructions are only tested on Linux which properly supports symlinks.
### Firefox
Make sure you have the [Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation) installed and activated. Navigate to the `firefox` directory of the repo, and run `cfx xpi` to package the extension.

### Chrome/Chromium
#### GUI
Open `chrome://extensions/` (i.e. the "Extensions" menu in Settings) and select "Developer mode". Next, click "Pack extension" and point "Extension root directory" to the `chrome` directory of the repo (and the private key if you have one).
#### CLI
Use the following command to build the extension:
```
/path/to/chrome --pack-extension=/path/to/citegen/chrome --pack-extension-key=/path/to/key
```

## Project structure
The `common` directory holds files shared between two versions (The main popup page, core scripts and styling, etc), while `chrome` and `firefox` hold browser-specific code and other resources. Common resources in browser-specific directorues are symbolic links to the actual files in `common`. As such, you may run into problems trying to build the extensions on Windows. See [this StackOverflow question](http://stackoverflow.com/questions/5917249/git-symlinks-in-windows) for an (untested) workaround.

## Installing on Chrome
Open `chrome://extensions/` and drag the `.crx` file from the file browser to Chrome.

## Contributing
Patches are welcome! You may also want to take a look at [the Reflinks repo](https://github.com/zhaofengli/reflinks) which holds the backend of this extension.

## Reporting bugs
Please report bugs on [Wikipedia](https://en.wikipedia.org/wiki/User_talk:Zhaofeng_Li/CiteGen) or create an issue on GitHub.

## Licensing
This program is licensed under the BSD 2-Clause license. See `LICENSE` for details.

This program incorporates code [jQuery](https://jquery.com), licensed under the MIT License. See the header of `common/jquery.js` for details.
