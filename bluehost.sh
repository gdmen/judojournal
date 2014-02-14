yes | rm -rf ~/public_html/judojournal/static
yes | cp -rf static/ ~/public_html/judojournal/
yes | cp public_html/* ~/public_html/judojournal/
chmod 0755 ~/public_html/judojournal/index.fcgi
