set SRC_FILE=www\imgLarge\cat2.png
set DEST_DIR=www\res\icon\android

copy %SRC_FILE% %DEST_DIR%\drawable-hdpi-icon.png
magick mogrify -resize 72x72 %DEST_DIR%\drawable-hdpi-icon.png

copy %SRC_FILE% %DEST_DIR%\drawable-mdpi-icon.png
magick mogrify -resize 48x48 %DEST_DIR%\drawable-mdpi-icon.png

copy %SRC_FILE% %DEST_DIR%\drawable-xhdpi-icon.png
gmagick mogrify -resize 96x96 %DEST_DIR%\drawable-xhdpi-icon.png

copy %SRC_FILE% %DEST_DIR%\drawable-xxhdpi-icon.png
magick mogrify -resize 144x144 %DEST_DIR%\drawable-xxhdpi-icon.png

copy %SRC_FILE% %DEST_DIR%\drawable-xxxhdpi-icon.png
magick mogrify -resize 192x192 %DEST_DIR%\drawable-xxxhdpi-icon.png

