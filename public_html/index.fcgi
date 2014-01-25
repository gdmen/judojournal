#!/home5/garymene/python27/bin/python
try:
    import pymysql
    pymysql.install_as_MySQLdb()
except ImportError:
    pass
import sys, os

# add custom python path
sys.path.insert(13, "/home5/garymene/git/judojournal")

os.environ["DJANGO_SETTINGS_MODULE"] = "judojournal.settings"
from django.core.servers.fastcgi import runfastcgi
runfastcgi(method="threaded", daemonize="false")
